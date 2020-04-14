import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfflineIndicatorComponent } from './offline-indicator.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [OfflineIndicatorComponent],
  imports: [CommonModule, IonicModule],
  exports: [OfflineIndicatorComponent],
})
export class SharedModule {}
