import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // A RouterLink kell a Vissza gombhoz
import { BlogService } from '../../../core/services/blog.service';
import { BlogPost } from '../../../core/models/blog-post.model';

@Component({
  selector: 'app-hir-reszletek',
  standalone: true,
  imports: [RouterLink], // Ide is be kell tenni
  templateUrl: './hir-reszletek.html', // Most már a külső HTML-re hivatkozunk
  styleUrl: './hir-reszletek.css'      // És a külső CSS-re
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