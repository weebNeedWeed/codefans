import { Post } from './../../models/Post.model';
import { ContentService } from './../../services/content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  newestPosts: Array<Post> = [];

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getAllPosts().subscribe((data: Array<Post>) => {
      this.newestPosts = data;
    });
  }
}
