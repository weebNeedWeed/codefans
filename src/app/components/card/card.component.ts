import { Category } from './../../models/Category.model';
import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ContentService } from '../../services/content.service';

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

  @Input()
  categoryId: string = '0';

  styles: any = {};

  isMobile: boolean = false;

  categoryName: string = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.styles.image = {
      'background-image': `url("${this.imageUrl}")`,
    };
    this.styles.card = {
      'margin-bottom': !this.isLast ? '30px' : 0,
    };

    this.breakpointObserver
      .observe(['(max-width: 480px)'])
      .subscribe((state: BreakpointState) => {
        // If state.matches === true => mobile screen
        this.styles.card = {
          'margin-bottom': !this.isLast ? (state.matches ? '10px' : '30px') : 0,
        };
      });

    this.contentService
      .getCategoryById(this.categoryId)
      .subscribe((category: Category | undefined) => {
        if (category) {
          this.categoryName = category!.name;
        }
      });
  }
}
