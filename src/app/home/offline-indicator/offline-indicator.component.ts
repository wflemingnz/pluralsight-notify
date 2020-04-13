import { Component } from '@angular/core';
import { fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-offline-indicator',
  template: `<ng-container *ngIf="online$ | async; else offline">
      <ion-chip color="success">
        <ion-label>Online</ion-label>
      </ion-chip>
    </ng-container>
    <ng-template #offline>
      <ion-chip color="warning">
        <ion-label>Offline</ion-label>
      </ion-chip>
    </ng-template>`,
})
export class OfflineIndicatorComponent {
  online$ = merge(
    of(navigator.onLine),
    fromEvent(window, 'online').pipe(mapTo(true)),
    fromEvent(window, 'offline').pipe(mapTo(false))
  );
}
