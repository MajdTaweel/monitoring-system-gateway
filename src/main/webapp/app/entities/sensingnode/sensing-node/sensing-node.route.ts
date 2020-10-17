import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISensingNode, SensingNode } from 'app/shared/model/sensingnode/sensing-node.model';
import { SensingNodeService } from './sensing-node.service';
import { SensingNodeComponent } from './sensing-node.component';
import { SensingNodeDetailComponent } from './sensing-node-detail.component';
import { SensingNodeUpdateComponent } from './sensing-node-update.component';

@Injectable({ providedIn: 'root' })
export class SensingNodeResolve implements Resolve<ISensingNode> {
  constructor(private service: SensingNodeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISensingNode> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sensingNode: HttpResponse<SensingNode>) => {
          if (sensingNode.body) {
            return of(sensingNode.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SensingNode());
  }
}

export const sensingNodeRoute: Routes = [
  {
    path: '',
    component: SensingNodeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.sensingnodeSensingNode.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SensingNodeDetailComponent,
    resolve: {
      sensingNode: SensingNodeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.sensingnodeSensingNode.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SensingNodeUpdateComponent,
    resolve: {
      sensingNode: SensingNodeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.sensingnodeSensingNode.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SensingNodeUpdateComponent,
    resolve: {
      sensingNode: SensingNodeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.sensingnodeSensingNode.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
