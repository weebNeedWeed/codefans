import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isScrollingDown: boolean = false;

  private oldScrollY: number = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // If new Y > old Y: user is scrolling down
    this.isScrollingDown = window.scrollY > this.oldScrollY;

    this.oldScrollY = window.scrollY;
  }
}
