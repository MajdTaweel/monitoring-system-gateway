import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MagnetometerReadingsService } from 'app/entities/sensingnode/magnetometer-readings/magnetometer-readings.service';
import { IMagnetometerReadings, MagnetometerReadings } from 'app/shared/model/sensingnode/magnetometer-readings.model';

describe('Service Tests', () => {
  describe('MagnetometerReadings Service', () => {
    let injector: TestBed;
    let service: MagnetometerReadingsService;
    let httpMock: HttpTestingController;
    let elemDefault: IMagnetometerReadings;
    let expectedResult: IMagnetometerReadings | IMagnetometerReadings[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(MagnetometerReadingsService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new MagnetometerReadings(0, 0, 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a MagnetometerReadings', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MagnetometerReadings()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MagnetometerReadings', () => {
        const returnedFromService = Object.assign(
          {
            x: 1,
            y: 1,
            z: 1,
            rms: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MagnetometerReadings', () => {
        const returnedFromService = Object.assign(
          {
            x: 1,
            y: 1,
            z: 1,
            rms: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a MagnetometerReadings', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
