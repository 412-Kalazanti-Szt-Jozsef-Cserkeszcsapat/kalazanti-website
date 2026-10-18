import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { API_CONFIG } from '../../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class BlogService {
  // A backend API címe
  private readonly apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.blog}`;

  constructor(private http: HttpClient) {}

  // A lista lekérése (itt kapjuk meg a bélyegképeket)
  getBlogPosts(year: number = 2026): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}?year=${year}`);
  }

  // Egy konkrét cikk lekérése az URL szöveg alapján
  getBlogPostByUrl(url: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${url}`);
  }
}