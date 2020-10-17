import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISensingNode } from 'app/shared/model/sensingnode/sensing-node.model';

type EntityResponseType = HttpResponse<ISensingNode>;
type EntityArrayResponseType = HttpResponse<ISensingNode[]>;

@Injectable({ providedIn: 'root' })
export class SensingNodeService {
  public resourceUrl = SERVER_API_URL + 'services/sensingnode/api/sensing-nodes';

  constructor(protected http: HttpClient) {}

  create(sensingNode: ISensingNode): Observable<EntityResponseType> {
    return this.http.post<ISensingNode>(this.resourceUrl, sensingNode, { observe: 'response' });
  }

  update(sensingNode: ISensingNode): Observable<EntityResponseType> {
    return this.http.put<ISensingNode>(this.resourceUrl, sensingNode, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISensingNode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISensingNode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
