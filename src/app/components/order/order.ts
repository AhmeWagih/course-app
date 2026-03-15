import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Courses } from '../courses/courses';
import { ICategory } from '../../models/ICategory';
import { Categories } from '../../services/categories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  imports: [Courses, FormsModule],
  templateUrl: './order.html',
})
export class Order {
  selectedCatId: number = 0;
  categories: ICategory[] = [];
  orderPrice: number = 0;
  private subscriptions = new Subscription();

  constructor(private categoriesService: Categories) {}

  ngOnInit(): void {
    const sub = this.categoriesService.getAllCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
      },
      error: () => {
        window.alert('Failed to load categories.');
      },
    });
    this.subscriptions.add(sub);
  }

  setOrderPrice(newOrderPrice: number) {
    this.orderPrice = newOrderPrice;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}