import { ContentService } from './../../services/content.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  newestPosts: Array<Post> = [];

  constructor(
    private contentService: ContentService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('CodeFans - Technical Blog - Home');

    this.contentService.getAllPosts().subscribe((data: Array<Post>) => {
      this.newestPosts = data
        .sort((a: Post, b: Post) => b.createdAt - a.createdAt)
        .slice(0, 10);
    });
  }
}
