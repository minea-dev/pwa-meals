import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Meal } from '../../models/meal.dto';

@Component({
  selector: 'app-meal-grid',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './meal-grid.html',
  styleUrls: ['./meal-grid.scss'],
})
export class MealGrid {
  @Input({ required: true }) meals: Meal[] = [];
  @Output() rowClick = new EventEmitter<string>();
  displayedColumns: string[] = ['image', 'name', 'category'];
}
