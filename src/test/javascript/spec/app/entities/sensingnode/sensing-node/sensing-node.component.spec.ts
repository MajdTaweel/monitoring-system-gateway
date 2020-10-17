import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { SensingNodeComponent } from 'app/entities/sensingnode/sensing-node/sensing-node.component';
import { SensingNodeService } from 'app/entities/sensingnode/sensing-node/sensing-node.service';
import { SensingNode } from 'app/shared/model/sensingnode/sensing-node.model';

describe('Component Tests', () => {
  describe('SensingNode Management Component', () => {
    let comp: SensingNodeComponent;
    let fixture: ComponentFixture<SensingNodeComponent>;
    let service: SensingNodeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SensingNodeComponent],
      })
        .overrideTemplate(SensingNodeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SensingNodeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SensingNodeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SensingNode(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sensingNodes && comp.sensingNodes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
