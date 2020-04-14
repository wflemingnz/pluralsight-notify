import { OnDestroy, Injectable, ApplicationRef } from '@angular/core';
import { Subscription, interval, concat } from 'rxjs';
import {
  SwUpdate,
  UpdateAvailableEvent,
  UpdateActivatedEvent,
} from '@angular/service-worker';
import { ToastController, AlertController } from '@ionic/angular';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UpdaterService implements OnDestroy {
  subscription = new Subscription();

  constructor(
    private updater: SwUpdate,
    private toastController: ToastController,
    private alertController: AlertController,
    private appRef: ApplicationRef
  ) {}

  initialise() {
    this.setupUpdateActivated();
    this.setupImmediateUpdate();
    this.setupRecurringUpdateCheck();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private setupUpdateActivated() {
    this.subscription.add(
      this.updater.activated.subscribe((e) => this.onUpdateActivated(e))
    );
  }

  private setupImmediateUpdate() {
    this.subscription.add(
      this.updater.available.subscribe((e) => this.onUpdateAvailable(e))
    );
  }

  private setupRecurringUpdateCheck() {
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = this.appRef.isStable.pipe(
      first((isStable) => isStable === true)
    );
    //const everyMinute$ = interval(1 * 60 * 1000);
    const everyHour$ = interval(1 * 60 * 60 * 1000);
    const everyIntervalOnceAppIsStable$ = concat(appIsStable$, everyHour$);

    this.subscription.add(
      everyIntervalOnceAppIsStable$.subscribe(
        () => this.updater.isEnabled && this.updater.checkForUpdate()
      )
    );
  }

  private async onUpdateAvailable(e: UpdateAvailableEvent) {
    const updateMessageKey = 'updateMessage';
    const updateMessage = e.available.appData[updateMessageKey];
    const alert = await this.alertController.create({
      header: 'Update Available',
      message:
        `A new version of the application is available\n` +
        `Details: ${updateMessage}`,
      buttons: [
        {
          text: 'Not Now',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => await this.showToastMessage('Update deferred'),
        },
        {
          text: 'Update',
          handler: async () => {
            await this.updater.activateUpdate();
            window.location.reload();
          },
        },
      ],
    });

    await alert.present();
  }

  private async onUpdateActivated(e: UpdateActivatedEvent) {
    await this.showToastMessage('Application updating');
  }

  private async showToastMessage(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      buttons: [{ role: 'cancel', text: 'OK' }],
      position: 'top',
    });

    toast.present();
  }
}
