import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { HirElemComponent } from '../hir-elem/hir-elem';
import { BlogService } from '../../../core/services/blog.service';
import { BlogPost } from '../../../core/models/blog-post.model';

@Component({
  selector: 'app-hirek',
  standalone: true,
  imports: [HirElemComponent],
  templateUrl: './hirek.html',
  styleUrl: './hirek.css',
})
export class Hirek {
  private readonly blogService = inject(BlogService);

  readonly hirekLista = toSignal(this.blogService.getBlogPosts(), {
    initialValue: [] as BlogPost[],
  });
}