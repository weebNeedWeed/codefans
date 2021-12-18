import { ContentService } from './../../services/content.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../../models/Post.model';
import { Converter } from 'showdown';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  createdAt: number = 0;

  postTitle: string = '';

  postContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const createdAt = +(params.get('createdAt') ?? '-1');
      const slug = params.get('slug') ?? '';

      console.log(createdAt, slug);

      if (isNaN(createdAt) || createdAt === -1 || !slug) {
        this.router.navigate(['404']);
        return;
      }

      this.contentService
        .getPostMetadata(createdAt, slug)
        .subscribe((data: Post | undefined) => {
          if (!data) {
            this.router.navigate(['404']);
            return;
          }

          this.createdAt = data.createdAt;
          this.postTitle = data.name;

          const postId: number = data.id;

          this.contentService
            .getPostContent(postId)
            .subscribe((data: string) => {
              if (!data) {
                this.router.navigate(['404']);
                return;
              }

              const converter: Converter = new Converter();

              const html: string = converter.makeHtml(data);

              this.postContent = html;
            });
        });
    });
  }
}
