import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMagnetometerReadings, MagnetometerReadings } from 'app/shared/model/sensingnode/magnetometer-readings.model';
import { MagnetometerReadingsService } from './magnetometer-readings.service';
import { ISensingNode } from 'app/shared/model/sensingnode/sensing-node.model';
import { SensingNodeService } from 'app/entities/sensingnode/sensing-node/sensing-node.service';

@Component({
  selector: 'jhi-magnetometer-readings-update',
  templateUrl: './magnetometer-readings-update.component.html',
})
export class MagnetometerReadingsUpdateComponent implements OnInit {
  isSaving = false;
  sensingnodes: ISensingNode[] = [];

  editForm = this.fb.group({
    id: [],
    x: [null, [Validators.required]],
    y: [null, [Validators.required]],
    z: [null, [Validators.required]],
    rms: [],
    sensingNodeId: [],
  });

  constructor(
    protected magnetometerReadingsService: MagnetometerReadingsService,
    protected sensingNodeService: SensingNodeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ magnetometerReadings }) => {
      this.updateForm(magnetometerReadings);

      this.sensingNodeService.query().subscribe((res: HttpResponse<ISensingNode[]>) => (this.sensingnodes = res.body || []));
    });
  }

  updateForm(magnetometerReadings: IMagnetometerReadings): void {
    this.editForm.patchValue({
      id: magnetometerReadings.id,
      x: magnetometerReadings.x,
      y: magnetometerReadings.y,
      z: magnetometerReadings.z,
      rms: magnetometerReadings.rms,
      sensingNodeId: magnetometerReadings.sensingNodeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const magnetometerReadings = this.createFromForm();
    if (magnetometerReadings.id !== undefined) {
      this.subscribeToSaveResponse(this.magnetometerReadingsService.update(magnetometerReadings));
    } else {
      this.subscribeToSaveResponse(this.magnetometerReadingsService.create(magnetometerReadings));
    }
  }

  private createFromForm(): IMagnetometerReadings {
    return {
      ...new MagnetometerReadings(),
      id: this.editForm.get(['id'])!.value,
      x: this.editForm.get(['x'])!.value,
      y: this.editForm.get(['y'])!.value,
      z: this.editForm.get(['z'])!.value,
      rms: this.editForm.get(['rms'])!.value,
      sensingNodeId: this.editForm.get(['sensingNodeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMagnetometerReadings>>): void {
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
