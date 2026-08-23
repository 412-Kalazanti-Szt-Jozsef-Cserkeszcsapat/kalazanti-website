import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { BlogPost } from '../../../core/models/blog-post.model';
import { LoadingScreenComponent } from '../../../core/components/loading-screen/loading-screen';

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

  ngOnInit(): void {
    const url = this.route.snapshot.paramMap.get('url');
    if (url) {
      this.blogService.getBlogPostByUrl(url).subscribe(adat => {
        // Ha relatívak a képek a szerver HTML-ben, itt korrigáljuk az elérési utat
        const javitottTartalom = adat.content.replace(/src="\/media/g, 'src="https://f2p8g6mb-8000.euw.devtunnels.ms/media');
        this.cikk.set({ ...adat, content: javitottTartalom });
      });
    }
  }
}