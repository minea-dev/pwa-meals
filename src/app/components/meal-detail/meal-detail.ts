import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MealService } from '../../services/meal.service';
import { Meal } from '../../models/meal.dto';

@Component({
  selector: 'app-meal-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTabsModule, MatProgressSpinnerModule],
  templateUrl: './meal-detail.html',
  styleUrls: ['./meal-detail.scss'],
})
export class MealDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private mealService = inject(MealService);
  private cdr = inject(ChangeDetectorRef);

  meal: Meal | null = null;
  isLoading = true;
  showDetails = false;
  ingredientsList: { name: string; measure: string }[] = [];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mealService.getMealById(id).subscribe((data) => {
        this.meal = data;
        this.extractIngredients();
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    }
  }

  goBack() {
    this.router.navigate(['/meals']);
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  private extractIngredients() {
    if (!this.meal) return;
    this.ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = this.meal[`strIngredient${i}`];
      const measure = this.meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        this.ingredientsList.push({ name: ingredient, measure: measure });
      }
    }
  }
}
