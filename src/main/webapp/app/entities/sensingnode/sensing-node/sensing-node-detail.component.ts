import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISensingNode } from 'app/shared/model/sensingnode/sensing-node.model';

@Component({
  selector: 'jhi-sensing-node-detail',
  templateUrl: './sensing-node-detail.component.html',
})
export class SensingNodeDetailComponent implements OnInit {
  sensingNode: ISensingNode | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sensingNode }) => (this.sensingNode = sensingNode));
  }

  previousState(): void {
    window.history.back();
  }
}
