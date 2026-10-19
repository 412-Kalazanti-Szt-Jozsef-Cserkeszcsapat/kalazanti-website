import { Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPost, BlogPostListItem } from '../../models/blog-post.model';
import { API_CONFIG } from '../../../../core/config/api.config';

@Component({
  selector: 'app-hir-elem',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hir-elem.html',
  styleUrl: './hir-elem.css'
})
export class HirElemComponent {
  adat = input.required<BlogPostListItem | BlogPost>();
  
  teljesKepUrl = computed(() => {
    const kep = this.adat().thumbnailImage;
    if (!kep) return null;
    return kep.startsWith('http') ? kep : `${API_CONFIG.baseUrl.replace(/\/+$/, '')}/${kep.replace(/^\/+/, '')}`;
  });

  kivonat = computed(() => {
    const hir = this.adat() as BlogPost;
    if (hir.summary) return hir.summary;
    if (hir.lead) return hir.lead;
    if (hir.excerpt) return hir.excerpt;
    if (hir.description) return hir.description;
    if (!hir.content) return '';

    const plainText = hir.content
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&[a-z]+;/gi, '')
      .trim();

    if (plainText.length <= 130) return plainText;
    return plainText.substring(0, 130).trim() + '...';
  });

  szerzo = computed(() => {
    const hir = this.adat();
    if (hir.created_by) {
      const parts = [hir.created_by.last_name, hir.created_by.first_name].filter(Boolean);
      if (parts.length > 0) {
        return parts.join(' ');
      }
    }
    const legacyHir = hir as BlogPost;
    return legacyHir.authorName || legacyHir.author || '412. Kalazanti Csapat';
  });

  datum = computed(() => {
    const hir = this.adat();
    const rawDate =
      ('publishedDate' in hir ? hir.publishedDate : undefined) ||
      ('date' in hir ? hir.date : undefined) ||
      hir.created_at;

    if (rawDate) {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}. ${m}. ${day}.`;
      }
      return rawDate;
    }
    return '';
  });
}