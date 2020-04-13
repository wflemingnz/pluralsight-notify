import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-item',
  template: `<ion-col
    size-xs="12"
    size-sm="6"
    size-md="4"
    size-lg="3"
    size-xl="2"
  >
    <ion-item>
      <ion-label position="floating">{{ label }}</ion-label>
      <ion-input readonly value="{{ value }}"></ion-input>
    </ion-item>
  </ion-col>`,
})
export class DetailsItemComponent {
  @Input()
  label: string;

  @Input()
  value: string;
}
