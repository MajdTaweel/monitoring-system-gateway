import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'sensing-node',
        loadChildren: () => import('./sensingnode/sensing-node/sensing-node.module').then(m => m.SensingnodeSensingNodeModule),
      },
      {
        path: 'magnetometer-readings',
        loadChildren: () =>
          import('./sensingnode/magnetometer-readings/magnetometer-readings.module').then(m => m.SensingnodeMagnetometerReadingsModule),
      },
      {
        path: 'pollution-readings',
        loadChildren: () =>
          import('./sensingnode/pollution-readings/pollution-readings.module').then(m => m.SensingnodePollutionReadingsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}
