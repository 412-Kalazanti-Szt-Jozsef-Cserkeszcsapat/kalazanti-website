import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

import { HirElemComponent } from '../hir-elem/hir-elem';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { LoadingScreenComponent } from '../../../../shared/components/loading-screen/loading-screen';

@Component({
  selector: 'app-hirek',
  standalone: true,
  imports: [HirElemComponent, LoadingScreenComponent],
  templateUrl: './hirek.html',
  styleUrl: './hirek.css',
})
export class Hirek {
  private readonly blogService = inject(BlogService);

  readonly kereses = signal('');
  readonly hiba = signal<string | null>(null);

  private readonly hirekSignal = toSignal(
    this.blogService.getBlogPosts().pipe(
      catchError((err) => {
        console.error('Hiba a hírek lekérésekor:', err);
        this.hiba.set('A hírek lekérése sikertelen. A backend szerver jelenleg nem érhető el.');
        return of([]);
      })
    ),
    { initialValue: undefined }
  );

  readonly betoltes = computed(() => this.hirekSignal() === undefined && !this.hiba());

  readonly hirekLista = computed(() => this.hirekSignal() ?? []);

  readonly szurtHirek = computed(() => {
    const q = this.kereses().toLowerCase().trim();
    const hirek = this.hirekLista();
    if (!q) return hirek;
    return hirek.filter((hir) => {
      const matchTitle = hir.title?.toLowerCase().includes(q);
      const matchContent = hir.content?.toLowerCase().includes(q);
      const matchAuthor = (hir.authorName || hir.author)?.toLowerCase().includes(q);
      const matchTags = hir.tags?.some((t) => t.name.toLowerCase().includes(q));
      const matchSummary = (hir.summary || hir.lead || hir.excerpt)?.toLowerCase().includes(q);
      return matchTitle || matchContent || matchAuthor || matchTags || matchSummary;
    });
  });

  onKeresesInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.kereses.set(target.value);
  }
}