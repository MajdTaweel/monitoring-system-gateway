import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISensingNode } from 'app/shared/model/sensingnode/sensing-node.model';
import { SensingNodeService } from './sensing-node.service';
import { SensingNodeDeleteDialogComponent } from './sensing-node-delete-dialog.component';

@Component({
  selector: 'jhi-sensing-node',
  templateUrl: './sensing-node.component.html',
})
export class SensingNodeComponent implements OnInit, OnDestroy {
  sensingNodes?: ISensingNode[];
  eventSubscriber?: Subscription;

  constructor(
    protected sensingNodeService: SensingNodeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.sensingNodeService.query().subscribe((res: HttpResponse<ISensingNode[]>) => (this.sensingNodes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSensingNodes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISensingNode): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSensingNodes(): void {
    this.eventSubscriber = this.eventManager.subscribe('sensingNodeListModification', () => this.loadAll());
  }

  delete(sensingNode: ISensingNode): void {
    const modalRef = this.modalService.open(SensingNodeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sensingNode = sensingNode;
  }
}
