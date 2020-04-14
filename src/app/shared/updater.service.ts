import { OnDestroy, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  SwUpdate,
  UpdateAvailableEvent,
  UpdateActivatedEvent,
} from '@angular/service-worker';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UpdaterService implements OnDestroy {
  subscription = new Subscription();

  constructor(
    private updater: SwUpdate,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  initialise() {
    this.subscription.add(
      this.updater.available.subscribe((e) => this.onUpdateAvailable(e))
    );
    this.subscription.add(
      this.updater.activated.subscribe((e) => this.onUpdateActivated(e))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
