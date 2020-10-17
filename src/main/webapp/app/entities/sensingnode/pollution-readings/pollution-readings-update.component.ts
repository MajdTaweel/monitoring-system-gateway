import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPollutionReadings, PollutionReadings } from 'app/shared/model/sensingnode/pollution-readings.model';
import { PollutionReadingsService } from './pollution-readings.service';
import { ISensingNode } from 'app/shared/model/sensingnode/sensing-node.model';
import { SensingNodeService } from 'app/entities/sensingnode/sensing-node/sensing-node.service';

@Component({
  selector: 'jhi-pollution-readings-update',
  templateUrl: './pollution-readings-update.component.html',
})
export class PollutionReadingsUpdateComponent implements OnInit {
  isSaving = false;
  sensingnodes: ISensingNode[] = [];

  editForm = this.fb.group({
    id: [],
    air: [null, [Validators.required]],
    sound: [null, [Validators.required]],
    sensingNodeId: [],
  });

  constructor(
    protected pollutionReadingsService: PollutionReadingsService,
    protected sensingNodeService: SensingNodeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pollutionReadings }) => {
      this.updateForm(pollutionReadings);

      this.sensingNodeService.query().subscribe((res: HttpResponse<ISensingNode[]>) => (this.sensingnodes = res.body || []));
    });
  }

  updateForm(pollutionReadings: IPollutionReadings): void {
    this.editForm.patchValue({
      id: pollutionReadings.id,
      air: pollutionReadings.air,
      sound: pollutionReadings.sound,
      sensingNodeId: pollutionReadings.sensingNodeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pollutionReadings = this.createFromForm();
    if (pollutionReadings.id !== undefined) {
      this.subscribeToSaveResponse(this.pollutionReadingsService.update(pollutionReadings));
    } else {
      this.subscribeToSaveResponse(this.pollutionReadingsService.create(pollutionReadings));
    }
  }

  private createFromForm(): IPollutionReadings {
    return {
      ...new PollutionReadings(),
      id: this.editForm.get(['id'])!.value,
      air: this.editForm.get(['air'])!.value,
      sound: this.editForm.get(['sound'])!.value,
      sensingNodeId: this.editForm.get(['sensingNodeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPollutionReadings>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ISensingNode): any {
    return item.id;
  }
}
