import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SensingNodeService } from 'app/entities/sensingnode/sensing-node/sensing-node.service';
import { ISensingNode, SensingNode } from 'app/shared/model/sensingnode/sensing-node.model';
import { SensingNodeType } from 'app/shared/model/enumerations/sensing-node-type.model';
import { SensingNodeStatus } from 'app/shared/model/enumerations/sensing-node-status.model';

describe('Service Tests', () => {
  describe('SensingNode Service', () => {
    let injector: TestBed;
    let service: SensingNodeService;
    let httpMock: HttpTestingController;
    let elemDefault: ISensingNode;
    let expectedResult: ISensingNode | ISensingNode[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SensingNodeService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new SensingNode(0, SensingNodeType.MAGNETOMETER, SensingNodeStatus.ONLINE, 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a SensingNode', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new SensingNode()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SensingNode', () => {
        const returnedFromService = Object.assign(
          {
            sensingNodeType: 'BBBBBB',
            status: 'BBBBBB',
            longitude: 1,
            latitude: 1,
            battery: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SensingNode', () => {
        const returnedFromService = Object.assign(
          {
            sensingNodeType: 'BBBBBB',
            status: 'BBBBBB',
            longitude: 1,
            latitude: 1,
            battery: 1,
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

      it('should delete a SensingNode', () => {
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
