import { ProgressBarService } from './../../services/progress-bar-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  isShowing = false;

  constructor(private progressBarService: ProgressBarService) {}

  ngOnInit(): void {
    this.progressBarService.getStatus().subscribe((data: boolean) => {
      this.isShowing = data;
    });
  }
}
