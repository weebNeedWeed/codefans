import { Category } from './../../models/Category.model';
import { ContentService } from './../../services/content.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../../models/Post.model';
import { Title } from '@angular/platform-browser';
import * as MarkdownIt from 'markdown-it';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  createdAt: number = 0;
  postTitle: string = '';
  postContent: string = '';
  categoryName: string = '';

  private currentCodeBlockIndex: number = -1;
  private codeList: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private titleService: Title
  ) {}

  private getCssForCodeBlock(index: number): string {
    const cssCodeBlock = `<style>pre{word-wrap: break-word; overflow: auto; background: #fafafa none repeat scroll 0% 0%; width: 100%; border-radius: 2px; white-space: pre-wrap; position: relative;}pre code{display: block; background: transparent; border: medium none; color: #888; padding: 20px; font-family: Inconsolata, Menlo, Consolas, Monaco, monospace; white-space: pre; overflow: auto;}code .token.important{font-weight: normal;}code .token.entity{cursor: help;}pre mark,code mark,pre code mark{background-color: #5580e4; color: #fff !important; padding: 2px; margin: 0 2px; border-radius: 2px;}pre::before{content: "</>"; padding: 12px 20px; color: #fff; display: block; text-indent: 15px; background: #03a9f4 none repeat scroll 0% 0%; font-family: Inconsolata; font-weight: 400;}.textcopy{display: block; float: right; padding-right: 20px; font-size: 20px; color: #d6e8ee; position: absolute; top: 8px; right: 15px;}.textcopy:hover{color: white; font-weight: bold; cursor: pointer; text-decoration: none;}</style>`;

    const anchorTag = `<a class="textcopy" id="cp${index}" >copy</a>`;

    return cssCodeBlock + anchorTag;
  }

  private handleCopyCode(): void {
    setTimeout(() => {
      const copy = (text: string) => {
        var input = document.createElement('textarea');
        input.innerHTML = text;
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        document.body.removeChild(input);
        return result;
      };

      for (let i = 0; i <= this.currentCodeBlockIndex; ++i) {
        document.getElementById(`cp${i}`)!.onclick = () => {
          copy(this.codeList[i]);
        };
      }
    }, 500);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const createdAt = +(params.get('createdAt') ?? '-1');
      const slug = params.get('slug') ?? '';

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

          this.titleService.setTitle(
            `CodeFans - Technical Blog - ${data.name}`
          );

          this.createdAt = data.createdAt;
          this.postTitle = data.name;

          this.contentService
            .getCategoryById(data.categoryId)
            .subscribe((category: Category | undefined) => {
              if (category) {
                this.categoryName = category.name;
              }
            });

          const postId: string = data.id;

          this.contentService.getPostContent(postId).subscribe({
            next: (markdownData: string) => {
              if (!markdownData) {
                this.router.navigate(['404']);
                return;
              }

              var remark = new MarkdownIt({
                html: true,
                linkify: true,
                typographer: true,
                highlight: (str: string) => {
                  this.currentCodeBlockIndex++;

                  this.codeList.push(str);

                  return (
                    this.getCssForCodeBlock(this.currentCodeBlockIndex) + str
                  );
                },
              });

              const html: string = remark.render(markdownData);

              this.postContent = html;
            },
            complete: () => this.handleCopyCode(),
          });
        });
    });
  }
}
