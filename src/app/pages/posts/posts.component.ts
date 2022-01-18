import { Post } from './../../models/Post.model';
import { ContentService } from './../../services/content.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  newestPosts: Array<Post> = [];

  constructor(
    private contentService: ContentService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('CodeFans - Technical Blog - Posts');

    this.contentService.getAllPosts().subscribe((data: Array<Post>) => {
      this.newestPosts = data;
    });
  }
}
