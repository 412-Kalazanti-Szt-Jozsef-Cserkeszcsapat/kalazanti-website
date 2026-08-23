import { Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../../core/models/blog-post.model';

@Component({
  selector: 'app-hir-elem',
  standalone: true,
  imports: [RouterLink], // Navigációhoz kell
  templateUrl: './hir-elem.html',
  styleUrl: './hir-elem.css'
})
export class HirElemComponent {
  adat = input.required<BlogPost>();
  
  // Automatikusan hozzáfűzi (hozzáadja, elérakja) az API címet, ha kell
  teljesKepUrl = computed(() => {
    const kep = this.adat().thumbnailImage;
    if (!kep) return null;
    return kep.startsWith('http') ? kep : `https://f2p8g6mb-8000.euw.devtunnels.ms${kep}`;
  });
}