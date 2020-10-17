import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPollutionReadings } from 'app/shared/model/sensingnode/pollution-readings.model';

@Component({
  selector: 'jhi-pollution-readings-detail',
  templateUrl: './pollution-readings-detail.component.html',
})
export class PollutionReadingsDetailComponent implements OnInit {
  pollutionReadings: IPollutionReadings | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pollutionReadings }) => (this.pollutionReadings = pollutionReadings));
  }

  previousState(): void {
    window.history.back();
  }
}
