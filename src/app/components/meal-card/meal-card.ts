import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Meal } from '../../models/meal.dto';

@Component({
  selector: 'app-meal-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './meal-card.html',
  styleUrls: ['./meal-card.scss'],
})
export class MealCard {
  @Input({ required: true }) meal!: Meal;
}
