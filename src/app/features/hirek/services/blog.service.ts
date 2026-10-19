import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost, BlogPostListItem } from '../models/blog-post.model';
import { API_CONFIG } from '../../../core/config/api.config';

export interface FeaturedPostsQueryOptions {
  tag?: string;
  limit?: number;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly baseUrl = API_CONFIG.baseUrl.replace(/\/+$/, '');
  private readonly blogApiUrl = `${this.baseUrl}${API_CONFIG.endpoints.blog}`;
  private readonly featuredApiUrl = `${this.baseUrl}${API_CONFIG.endpoints.blogFeatured}`;

  constructor(private http: HttpClient) {}

  // Kiemelt bejegyzések lekérése címke és limit alapján az OpenAPI specifikáció szerint
  getFeaturedBlogPosts(options?: FeaturedPostsQueryOptions): Observable<BlogPostListItem[]> {
    let params = new HttpParams();
    if (options?.tag !== undefined) {
      params = params.set('tag', options.tag);
    }
    if (options?.limit !== undefined) {
      params = params.set('limit', options.limit.toString());
    }

    return this.http.get<BlogPostListItem[]>(this.featuredApiUrl, { params });
  }

  // A lista lekérése (itt kapjuk meg a bélyegképeket)
  getBlogPosts(year: number = 2026): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.blogApiUrl}?year=${year}`);
  }

  // Egy konkrét cikk lekérése az URL szöveg alapján
  getBlogPostByUrl(url: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.blogApiUrl}/${url}`);
  }
}