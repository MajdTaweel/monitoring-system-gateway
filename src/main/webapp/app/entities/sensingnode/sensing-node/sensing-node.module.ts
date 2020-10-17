import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SensingNodeComponent } from './sensing-node.component';
import { SensingNodeDetailComponent } from './sensing-node-detail.component';
import { SensingNodeUpdateComponent } from './sensing-node-update.component';
import { SensingNodeDeleteDialogComponent } from './sensing-node-delete-dialog.component';
import { sensingNodeRoute } from './sensing-node.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(sensingNodeRoute)],
  declarations: [SensingNodeComponent, SensingNodeDetailComponent, SensingNodeUpdateComponent, SensingNodeDeleteDialogComponent],
  entryComponents: [SensingNodeDeleteDialogComponent],
})
export class SensingnodeSensingNodeModule {}
