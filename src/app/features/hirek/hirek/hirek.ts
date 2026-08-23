import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Az *ngFor-hoz szükséges

// Az új modellt és szervizt importáljuk (emeljük be, töltjük be)
import { HirElemComponent } from '../hir-elem/hir-elem';
import { BlogService } from '../../../core/services/blog.service';
import { BlogPost } from '../../../core/models/blog-post.model';

@Component({
  selector: 'app-hirek',
  standalone: true,
  imports: [CommonModule, HirElemComponent],
  templateUrl: './hirek.html',
  styleUrl: './hirek.css',
})
export class Hirek implements OnInit {
  // A változó (tömb, lista) típusa most már BlogPost
  hirekLista: BlogPost[] = [];

  // A constructor-ban az új szervizt "injektáljuk" (adjuk át, húzzuk be)
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    // Az új getBlogPosts() függvényre (metódusra, eljárásra) iratkozunk fel
    this.blogService.getBlogPosts().subscribe({
      next: (adatok) => {
        this.hirekLista = adatok;
        console.log('Sikeres adatlekérés:', this.hirekLista);
      },
      error: (err) => {
        console.error('Hiba történt a hírek betöltésekor:', err);
      }
    });
  }
}