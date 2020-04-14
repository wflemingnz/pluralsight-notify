import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfflineIndicatorComponent } from './offline-indicator.component';
import { IonicModule } from '@ionic/angular';
import { UpdaterService } from './updater.service';

@NgModule({
  declarations: [OfflineIndicatorComponent],
  providers: [UpdaterService],
  imports: [CommonModule, IonicModule],
  exports: [OfflineIndicatorComponent],
})
export class SharedModule {}
