import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MealService } from '../../services/meal.service';
import { Meal } from '../../models/meal.dto';
import { MealCard } from '../meal-card/meal-card';
import { MealGrid } from '../meal-grid/meal-grid';

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MealCard,
    MealGrid,
  ],
  templateUrl: './meal-list.html',
  styleUrls: ['./meal-list.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class MealList implements OnInit {
  private mealService = inject(MealService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  meals: Meal[] = [];
  isLoading = true;
  viewMode: 'cards' | 'grid' = 'cards';

  ngOnInit() {
    this.mealService.getMeals().subscribe((data) => {
      this.meals = data;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  toggleView(mode: 'cards' | 'grid') {
    this.viewMode = mode;
  }

  goToDetail(id: string) {
    this.router.navigate(['/meal', id]);
  }
}
