import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISensingNode } from 'app/shared/model/sensingnode/sensing-node.model';
import { SensingNodeService } from './sensing-node.service';

@Component({
  templateUrl: './sensing-node-delete-dialog.component.html',
})
export class SensingNodeDeleteDialogComponent {
  sensingNode?: ISensingNode;

  constructor(
    protected sensingNodeService: SensingNodeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sensingNodeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sensingNodeListModification');
      this.activeModal.close();
    });
  }
}
