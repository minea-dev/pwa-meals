import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Meal, MealResponse } from '../models/meal.dto';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private http = inject(HttpClient);
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  getMeals(): Observable<Meal[]> {
    return this.http
      .get<MealResponse>(`${this.apiUrl}/search.php?f=c`)
      .pipe(map((response) => response.meals || []));
  }

  getMealById(id: string): Observable<Meal> {
    return this.http
      .get<MealResponse>(`${this.apiUrl}/lookup.php?i=${id}`)
      .pipe(map((response) => (response.meals ? response.meals[0] : (null as any))));
  }
}
