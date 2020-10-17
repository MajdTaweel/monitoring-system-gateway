import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPollutionReadings } from 'app/shared/model/sensingnode/pollution-readings.model';

type EntityResponseType = HttpResponse<IPollutionReadings>;
type EntityArrayResponseType = HttpResponse<IPollutionReadings[]>;

@Injectable({ providedIn: 'root' })
export class PollutionReadingsService {
  public resourceUrl = SERVER_API_URL + 'services/sensingnode/api/pollution-readings';

  constructor(protected http: HttpClient) {}

  create(pollutionReadings: IPollutionReadings): Observable<EntityResponseType> {
    return this.http.post<IPollutionReadings>(this.resourceUrl, pollutionReadings, { observe: 'response' });
  }

  update(pollutionReadings: IPollutionReadings): Observable<EntityResponseType> {
    return this.http.put<IPollutionReadings>(this.resourceUrl, pollutionReadings, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPollutionReadings>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPollutionReadings[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
