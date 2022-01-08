import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent {
  show: boolean = false;
  onClick() {
    this.show = !this.show;
  }

  isScrollingDown: boolean = false;

  private oldScrollY: number = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // If new Y > old Y: user is scrolling down
    if (!this.show) {
      this.isScrollingDown = window.scrollY > this.oldScrollY;
    } else {
      this.isScrollingDown = false;
    }

    this.oldScrollY = window.scrollY;
  }
}
