import { ContentService } from './../../services/content.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private listText: string[] = [];

  private index = 0;

  public writingText = '';

  public isStopping = false;

  private interval: any;

  @Input()
  public scrollTo!: HTMLElement;

  write() {
    const text = this.listText[this.index];

    for (let i = 0; i < text.length; ++i) {
      const sec = 1000 / text.length;

      setTimeout(() => {
        clearInterval(this.interval);
        this.isStopping = false;

        this.writingText = text.slice(0, i + 1);

        if (i === text.length - 1) {
          this.interval = setInterval(() => {
            this.isStopping = !this.isStopping;
          }, 200);
        }
      }, sec * (i + 1));
    }

    setTimeout(() => {
      for (let i = text.length - 1; i >= -1; --i) {
        const sec = 500 / text.length;

        setTimeout(() => {
          clearInterval(this.interval);
          this.isStopping = false;

          this.writingText = text.slice(0, i + 1);

          if (i === -1) {
            this.interval = setInterval(() => {
              this.isStopping = !this.isStopping;
            }, 200);
          }
        }, sec * (text.length - i));
      }
    }, 2000);

    setTimeout(() => {
      this.isStopping = false;
      this.index = this.index === this.listText.length - 1 ? 0 : this.index + 1;
    }, 3000);
  }

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getAllCategories().subscribe((data: any) => {
      this.listText = data.map((elm: any) => elm.name);

      this.write();
    });

    setInterval(() => {
      this.write();
    }, 4000);
  }

  onClick() {
    const offsetTop = this.scrollTo.offsetTop - 120;

    const smoothScroll = (top: number) => {
      if (top >= offsetTop) {
        return;
      } else {
        setTimeout(() => {
          window.scrollTo(0, top);
          smoothScroll(top + 6);
        }, 1);
      }
    };

    smoothScroll(1);
  }
}
