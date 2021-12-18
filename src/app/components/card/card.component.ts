import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input()
  title: string = '';

  @Input()
  slug: string = '';

  @Input()
  description: string = '';

  @Input()
  createdAt: number = 0;

  @Input()
  imageUrl: string = '';

  @Input()
  isLast: boolean = false;

  styles: any = {};

  ngOnInit(): void {
    this.styles.image = {
      'background-image': `url("${this.imageUrl}")`,
    };
    this.styles.card = {
      'margin-bottom': !this.isLast ? '30px' : 0,
    };
  }
}
