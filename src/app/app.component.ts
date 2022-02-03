import { ProgressBarService } from './services/progress-bar-service.service';
import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  Event,
} from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isMobile: boolean = false;

  constructor(
    private router: Router,
    private progressBarService: ProgressBarService,
    private breakpointObserver: BreakpointObserver
  ) {}

  /**
   * * Handle router navigation event to make progress bar
   */
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.progressBarService.setStatus(true);
          return;
        }

        case event instanceof NavigationCancel:
        case event instanceof NavigationEnd:
        case event instanceof NavigationError: {
          // Scroll to y = 0 when navigate to new page
          window.scrollTo(0, 0);

          setTimeout(() => {
            this.progressBarService.setStatus(false);
          }, 2000);
          return;
        }
      }
    });

    this.breakpointObserver
      .observe(['(max-width: 860px)'])
      .subscribe((state: BreakpointState) => {
        // Not matched => PC => not mobile
        if (!state.matches) {
          this.isMobile = false;
          return;
        }

        // Matched => is Mobile
        this.isMobile = true;
      });
  }
}
