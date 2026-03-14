import { Injectable } from '@angular/core';
import { ICategory } from '../models/ICategory';

@Injectable({
  providedIn: 'root',
})
export class Categories {
  private readonly categories: ICategory[] = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Data Science' },
    { id: 3, name: 'Mobile Development' },
  ];

  getAllCategories(): ICategory[] {
    return this.categories;
  }
}
