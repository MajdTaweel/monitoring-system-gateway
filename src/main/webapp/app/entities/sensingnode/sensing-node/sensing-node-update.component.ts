import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISensingNode, SensingNode } from 'app/shared/model/sensingnode/sensing-node.model';
import { SensingNodeService } from './sensing-node.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-sensing-node-update',
  templateUrl: './sensing-node-update.component.html',
})
export class SensingNodeUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    sensingNodeType: [null, [Validators.required]],
    status: [null, [Validators.required]],
    longitude: [],
    latitude: [],
    battery: [],
    userId: [],
  });

  constructor(
    protected sensingNodeService: SensingNodeService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sensingNode }) => {
      this.updateForm(sensingNode);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(sensingNode: ISensingNode): void {
    this.editForm.patchValue({
      id: sensingNode.id,
      sensingNodeType: sensingNode.sensingNodeType,
      status: sensingNode.status,
      longitude: sensingNode.longitude,
      latitude: sensingNode.latitude,
      battery: sensingNode.battery,
      userId: sensingNode.userId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sensingNode = this.createFromForm();
    if (sensingNode.id !== undefined) {
      this.subscribeToSaveResponse(this.sensingNodeService.update(sensingNode));
    } else {
      this.subscribeToSaveResponse(this.sensingNodeService.create(sensingNode));
    }
  }

  private createFromForm(): ISensingNode {
    return {
      ...new SensingNode(),
      id: this.editForm.get(['id'])!.value,
      sensingNodeType: this.editForm.get(['sensingNodeType'])!.value,
      status: this.editForm.get(['status'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      battery: this.editForm.get(['battery'])!.value,
      userId: this.editForm.get(['userId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISensingNode>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
