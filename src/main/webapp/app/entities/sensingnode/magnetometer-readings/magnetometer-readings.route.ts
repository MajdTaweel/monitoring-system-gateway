import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMagnetometerReadings, MagnetometerReadings } from 'app/shared/model/sensingnode/magnetometer-readings.model';
import { MagnetometerReadingsService } from './magnetometer-readings.service';
import { MagnetometerReadingsComponent } from './magnetometer-readings.component';
import { MagnetometerReadingsDetailComponent } from './magnetometer-readings-detail.component';
import { MagnetometerReadingsUpdateComponent } from './magnetometer-readings-update.component';

@Injectable({ providedIn: 'root' })
export class MagnetometerReadingsResolve implements Resolve<IMagnetometerReadings> {
  constructor(private service: MagnetometerReadingsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMagnetometerReadings> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((magnetometerReadings: HttpResponse<MagnetometerReadings>) => {
          if (magnetometerReadings.body) {
            return of(magnetometerReadings.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MagnetometerReadings());
  }
}

export const magnetometerReadingsRoute: Routes = [
  {
    path: '',
    component: MagnetometerReadingsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.sensingnodeMagnetometerReadings.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MagnetometerReadingsDetailComponent,
    resolve: {
      magnetometerReadings: MagnetometerReadingsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.sensingnodeMagnetometerReadings.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MagnetometerReadingsUpdateComponent,
    resolve: {
      magnetometerReadings: MagnetometerReadingsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.sensingnodeMagnetometerReadings.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MagnetometerReadingsUpdateComponent,
    resolve: {
      magnetometerReadings: MagnetometerReadingsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.sensingnodeMagnetometerReadings.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
