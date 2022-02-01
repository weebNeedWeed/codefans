import { Category } from './../models/Category.model';
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

  getAllCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>('assets/contents/categories.json');
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

  getPostContent(id: string): Observable<string> {
    return this.http.get('assets/contents/posts/post' + id + '.md', {
      responseType: 'text',
    });
  }

  getCategoryById(id: string): Observable<Category | undefined> {
    return this.getAllCategories().pipe(
      map<Array<Category> | undefined, Category | undefined>(
        (categories: Array<Category> | undefined) => {
          return categories?.find((category: Category) => category.id === id);
        }
      )
    );
  }
}
