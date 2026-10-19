import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { BlogService } from '../hirek/services/blog.service';
import { BlogPostListItem } from '../hirek/models/blog-post.model';
import { HirElemComponent } from '../hirek/components/hir-elem/hir-elem';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HirElemComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly blogService = inject(BlogService);

  readonly facebookLink = 'https://www.facebook.com/kalazanti';

  // Alapértelmezett kiemelt cserkész hírek (ha a backend épp nem elérhető)
  private readonly tartalekHirek: BlogPostListItem[] = [
    {
      title: 'Tavaszi portyák és próbázás',
      url: 'tavaszi-portyak-probazas',
      thumbnailImage: '/img/hero.jpg',
      summary: 'Izgalmas tavaszi portyákon és rajprogramokon vettek részt őrseink a Budai hegyekben. Megkezdődött a felkészülés a nagytáborra!',
      created_at: '2026-04-15T10:00:00Z',
      created_by: {
        first_name: 'Vezetői Kör',
        last_name: '412.',
      },
    },
    {
      title: 'Csatlakozz csapatunkhoz! – Tagfelvétel',
      url: 'csatlakozz-csapatunkhoz',
      thumbnailImage: '/img/hero.jpg',
      summary: 'Várunk minden 2. osztályos és idősebb fiút és lányt, akik szeretnének egy összetartó, vidám közösséghez tartozni és igazi kalandokat átélni a természetben!',
      created_at: '2026-03-20T10:00:00Z',
      created_by: {
        first_name: 'Kalazanti Csapat',
        last_name: '412.',
      },
    },
    {
      title: 'Nyári Nagytábor készülődés',
      url: 'nyari-nagytabor-elokeszuletek',
      thumbnailImage: '/img/hero.jpg',
      summary: 'Már gőzerővel zajlanak az idei nagytábor előkészületei: sátorozás, nomád konyha, éjszakai őrség és rengeteg játék várja cserkészeinket!',
      created_at: '2026-02-28T10:00:00Z',
      created_by: {
        first_name: 'Vezetőség',
        last_name: 'Tábori',
      },
    },
  ];

  private readonly featuredPostsQuery = toSignal(
    this.blogService.getFeaturedBlogPosts({ tag: 'featured', limit: 3 }).pipe(
      catchError(() => of(this.tartalekHirek))
    ),
    { initialValue: undefined }
  );

  readonly kiemeltHirek = computed(() => {
    const apiHirek = this.featuredPostsQuery();
    if (!apiHirek || apiHirek.length === 0) {
      return this.tartalekHirek;
    }
    return apiHirek;
  });
}

