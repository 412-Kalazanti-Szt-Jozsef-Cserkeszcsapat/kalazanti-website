import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { BlogService } from '../hirek/services/blog.service';
import { BlogPost } from '../hirek/models/blog-post.model';
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
  private readonly tartalekHirek: BlogPost[] = [
    {
      title: 'Tavaszi portyák és próbázás',
      url: 'tavaszi-portyak-probazas',
      thumbnailImage: '/img/hero.jpg',
      content: 'Izgalmas tavaszi portyákon és rajprogramokon vettek részt őrseink a Budai hegyekben. Megkezdődött a felkészülés a nagytáborra!',
      summary: 'Izgalmas tavaszi portyákon és rajprogramokon vettek részt őrseink a Budai hegyekben.',
      author: '412. Vezetői Kör',
      authorName: '412. Kalazanti Vezetőség',
      publishedDate: '2026. 04. 15.',
    },
    {
      title: 'Csatlakozz csapatunkhoz! – Tagfelvétel',
      url: 'csatlakozz-csapatunkhoz',
      thumbnailImage: '/img/hero.jpg',
      content: 'Várunk minden 2. osztályos és idősebb fiút és lányt, akik szeretnének egy összetartó, vidám közösséghez tartozni és igazi kalandokat átélni a természetben!',
      summary: 'Várunk minden kalandvágyó fiatalt csapatunkba! Csatlakozz hozzánk a Facebook oldalunkon!',
      author: 'Csapatparancsnokság',
      authorName: '412. Kalazanti Csapat',
      publishedDate: '2026. 03. 20.',
    },
    {
      title: 'Nyári Nagytábor készülődés',
      url: 'nyari-nagytabor-elokeszuletek',
      thumbnailImage: '/img/hero.jpg',
      content: 'Már gőzerővel zajlanak az idei nagytábor előkészületei: sátorozás, nomád konyha, éjszakai őrség és rengeteg játék várja cserkészeinket!',
      summary: 'Már gőzerővel zajlanak az idei nagytábor előkészületei, a részleteket hamarosan közzétesszük.',
      author: 'Táborparancsnokság',
      authorName: 'Tábori Vezetőség',
      publishedDate: '2026. 02. 28.',
    }
  ];

  private readonly hirekQuery = toSignal(
    this.blogService.getBlogPosts().pipe(
      catchError(() => of(this.tartalekHirek))
    ),
    { initialValue: undefined }
  );

  readonly kiemeltHirek = computed(() => {
    const apiHirek = this.hirekQuery();
    if (!apiHirek || apiHirek.length === 0) {
      return this.tartalekHirek;
    }
    // Legfrissebb 3-6 cikk a kezdőlapra
    return apiHirek.slice(0, 3);
  });
}
