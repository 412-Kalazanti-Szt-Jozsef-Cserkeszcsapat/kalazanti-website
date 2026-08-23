import { Component, input } from '@angular/core';
import { BlogPost } from '../../../core/models/blog-post.model';

@Component({
  selector: 'app-hir-elem',
  standalone: true,
  templateUrl: './hir-elem.html',
  styleUrl: './hir-elem.css'
})
export class HirElemComponent {
  readonly adat = input.required<BlogPost>();
}