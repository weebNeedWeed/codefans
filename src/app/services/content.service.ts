import { Post } from './../models/Post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getPostMetadata(
    createdAt: number,
    slug: string
  ): Observable<Post | undefined> {
    return this.http.get<Array<Post>>('assets/contents/posts.json').pipe(
      map((x: Array<Post>) => {
        return x.filter((elm: Post) => {
          return elm.slug === slug && elm.createdAt === createdAt;
        })?.[0];
      })
    );
  }

  getPostContent(id: number): Observable<string> {
    return this.http.get('assets/contents/posts/_' + id + '.json', {
      responseType: 'text',
    });
  }
}
