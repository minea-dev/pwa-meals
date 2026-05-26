import { Routes } from '@angular/router';
import { MealDetail } from './components/meal-detail/meal-detail';
import { MealList } from './components/meal-list/meal-list';

export const routes: Routes = [
  { path: '', redirectTo: 'meals', pathMatch: 'full' },
  { path: 'meals', component: MealList },
  { path: 'meal/:id', component: MealDetail },
];
