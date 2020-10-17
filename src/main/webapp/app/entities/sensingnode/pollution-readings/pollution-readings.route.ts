import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPollutionReadings, PollutionReadings } from 'app/shared/model/sensingnode/pollution-readings.model';
import { PollutionReadingsService } from './pollution-readings.service';
import { PollutionReadingsComponent } from './pollution-readings.component';
import { PollutionReadingsDetailComponent } from './pollution-readings-detail.component';
import { PollutionReadingsUpdateComponent } from './pollution-readings-update.component';

@Injectable({ providedIn: 'root' })
export class PollutionReadingsResolve implements Resolve<IPollutionReadings> {
  constructor(private service: PollutionReadingsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPollutionReadings> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pollutionReadings: HttpResponse<PollutionReadings>) => {
          if (pollutionReadings.body) {
            return of(pollutionReadings.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PollutionReadings());
  }
}

export const pollutionReadingsRoute: Routes = [
  {
    path: '',
    component: PollutionReadingsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.sensingnodePollutionReadings.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PollutionReadingsDetailComponent,
    resolve: {
      pollutionReadings: PollutionReadingsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.sensingnodePollutionReadings.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PollutionReadingsUpdateComponent,
    resolve: {
      pollutionReadings: PollutionReadingsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.sensingnodePollutionReadings.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PollutionReadingsUpdateComponent,
    resolve: {
      pollutionReadings: PollutionReadingsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.sensingnodePollutionReadings.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
