import { Component, Input } from '@angular/core';
import { BlogPost } from '../../../core/models/blog-post.model';

@Component({
  selector: 'app-hir-elem',
  templateUrl: './hir-elem.html',
  styleUrl: './hir-elem.css'
})
export class HirElemComponent {
  @Input() adat!: BlogPost;
}