import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  // A backend API címe a megadott adataid alapján
  private apiUrl = 'https://f2p8g6mb-8000.euw.devtunnels.ms/api/v1/blog';

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