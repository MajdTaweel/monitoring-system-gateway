import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMagnetometerReadings } from 'app/shared/model/sensingnode/magnetometer-readings.model';

type EntityResponseType = HttpResponse<IMagnetometerReadings>;
type EntityArrayResponseType = HttpResponse<IMagnetometerReadings[]>;

@Injectable({ providedIn: 'root' })
export class MagnetometerReadingsService {
  public resourceUrl = SERVER_API_URL + 'services/sensingnode/api/magnetometer-readings';

  constructor(protected http: HttpClient) {}

  create(magnetometerReadings: IMagnetometerReadings): Observable<EntityResponseType> {
    return this.http.post<IMagnetometerReadings>(this.resourceUrl, magnetometerReadings, { observe: 'response' });
  }

  update(magnetometerReadings: IMagnetometerReadings): Observable<EntityResponseType> {
    return this.http.put<IMagnetometerReadings>(this.resourceUrl, magnetometerReadings, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMagnetometerReadings>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMagnetometerReadings[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
