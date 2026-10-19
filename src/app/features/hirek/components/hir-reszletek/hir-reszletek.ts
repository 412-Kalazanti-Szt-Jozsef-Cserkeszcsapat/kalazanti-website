import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { LoadingScreenComponent } from '../../../../shared/components/loading-screen/loading-screen';
import { API_CONFIG } from '../../../../core/config/api.config';

@Component({
  selector: 'app-hir-reszletek',
  standalone: true,
  imports: [RouterLink, LoadingScreenComponent],
  templateUrl: './hir-reszletek.html',
  styleUrl: './hir-reszletek.css'
})

export class HirReszletek implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  
  cikk = signal<BlogPost | null>(null);
  hiba = signal<string | null>(null);

  ngOnInit(): void {
    const url = this.route.snapshot.paramMap.get('url');
    if (url) {
      this.blogService.getBlogPostByUrl(url).subscribe({
        next: (adat) => {
          // Ha relatívak a képek a szerver HTML-ben, itt korrigáljuk az elérési utat
          const content = adat.content ?? '';
          const javitottTartalom = content.replace(/src="\/media/g, `src="${API_CONFIG.baseUrl}/media`);
          this.cikk.set({ ...adat, content: javitottTartalom });
        },
        error: (err) => {
          console.error('Hiba a cikk lekérésekor:', err);
          this.hiba.set('A cikk betöltése sikertelen. A backend szerver nem érhető el.');
        }
      });
    }
  }
}