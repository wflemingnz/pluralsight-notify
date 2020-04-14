import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventResponse } from '../interfaces';
import { Subscription } from 'rxjs';
import { EventsService } from '../events.service';
import { NavController } from '@ionic/angular';
import { UpdaterService } from '../shared/updater.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  events: EventResponse[] = [];
  subscripton: Subscription;

  constructor(
    private eventsService: EventsService,
    private navController: NavController,
    private updaterService: UpdaterService
  ) {}

  ngOnInit() {
    this.updaterService.initialise();

    this.subscripton = this.eventsService
      .getAll()
      .subscribe((event) => this.events.push(event));
  }

  ngOnDestroy() {
    this.subscripton.unsubscribe();
  }

  getEvents(): EventResponse[] {
    return this.events.sort((a, b) =>
      a.event.created > b.event.created ? -1 : 1
    );
  }

  details(response: EventResponse) {
    this.navController.navigateForward(`/details/${response.event.id}`);
  }
}
