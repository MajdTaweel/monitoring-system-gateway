import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMagnetometerReadings } from 'app/shared/model/sensingnode/magnetometer-readings.model';

@Component({
  selector: 'jhi-magnetometer-readings-detail',
  templateUrl: './magnetometer-readings-detail.component.html',
})
export class MagnetometerReadingsDetailComponent implements OnInit {
  magnetometerReadings: IMagnetometerReadings | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ magnetometerReadings }) => (this.magnetometerReadings = magnetometerReadings));
  }

  previousState(): void {
    window.history.back();
  }
}
