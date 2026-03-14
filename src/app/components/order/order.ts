import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Courses } from '../courses/courses';
import { ICategory } from '../../models/ICategory';
import { Categories } from '../../services/categories';

@Component({
  selector: 'app-order',
  imports: [Courses, FormsModule],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  selectedCatId: number = 0;
  categories: ICategory[];
  orderPrice: number = 0;

  constructor(private categoriesService: Categories) {
    this.categories = this.categoriesService.getAllCategories();
  }

  setOrderPrice(newOrderPrice: number) {
    this.orderPrice = newOrderPrice;
  }
}