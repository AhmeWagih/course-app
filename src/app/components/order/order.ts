import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Courses } from '../courses/courses';
import { ICategory } from '../../models/ICategory';

@Component({
  selector: 'app-order',
  imports: [Courses, FormsModule, CurrencyPipe],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  selectedCatId: number = 0
  categories: ICategory[]
  orderPrice: number = 0
  constructor() {
    this.categories = [
      { id: 0, name: 'All' },
      { id: 1, name: 'Web Development' },
      { id: 2, name: 'Data Science' },
      { id: 3, name: 'Mobile Development' },
    ];
  }

  setOrderPrice(newOrderPrice: number) {
    this.orderPrice = newOrderPrice;
  }
}