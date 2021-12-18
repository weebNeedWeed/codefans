import { Post } from './../models/Post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Array<{ name: string; id: string }>> {
    return this.http.get<Array<{ name: string; id: string }>>(
      'assets/contents/categories.json'
    );
  }

  getAllPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>('assets/contents/posts.json');
  }
}
