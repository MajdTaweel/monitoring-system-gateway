import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PollutionReadingsComponent } from './pollution-readings.component';
import { PollutionReadingsDetailComponent } from './pollution-readings-detail.component';
import { PollutionReadingsUpdateComponent } from './pollution-readings-update.component';
import { PollutionReadingsDeleteDialogComponent } from './pollution-readings-delete-dialog.component';
import { pollutionReadingsRoute } from './pollution-readings.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(pollutionReadingsRoute)],
  declarations: [
    PollutionReadingsComponent,
    PollutionReadingsDetailComponent,
    PollutionReadingsUpdateComponent,
    PollutionReadingsDeleteDialogComponent,
  ],
  entryComponents: [PollutionReadingsDeleteDialogComponent],
})
export class SensingnodePollutionReadingsModule {}
