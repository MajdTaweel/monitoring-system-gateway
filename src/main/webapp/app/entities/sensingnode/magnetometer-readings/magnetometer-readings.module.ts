import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { MagnetometerReadingsComponent } from './magnetometer-readings.component';
import { MagnetometerReadingsDetailComponent } from './magnetometer-readings-detail.component';
import { MagnetometerReadingsUpdateComponent } from './magnetometer-readings-update.component';
import { MagnetometerReadingsDeleteDialogComponent } from './magnetometer-readings-delete-dialog.component';
import { magnetometerReadingsRoute } from './magnetometer-readings.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(magnetometerReadingsRoute)],
  declarations: [
    MagnetometerReadingsComponent,
    MagnetometerReadingsDetailComponent,
    MagnetometerReadingsUpdateComponent,
    MagnetometerReadingsDeleteDialogComponent,
  ],
  entryComponents: [MagnetometerReadingsDeleteDialogComponent],
})
export class SensingnodeMagnetometerReadingsModule {}
