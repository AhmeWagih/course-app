import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICourse } from '../../models/ICourses';
import { ICategory } from '../../models/ICategory';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [FormsModule, NgClass, NgStyle],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  corses: ICourse[];
  category: ICategory[];
  totalOrderPice: number = 0;
  selectedCategoryId: number = 0;

  constructor() {
    this.corses = [
      {
        id: 1,
        title: 'Angular Complete Guide',
        instructor: 'John Smith',
        price: 299,
        seats: 0,
        image: 'https://picsum.photos/600/400?1',
        categoryId: 1,
      },
      {
        id: 2,
        title: 'React Fundamentals',
        instructor: 'Sarah Johnson',
        price: 249,
        seats: 1,
        image: 'https://picsum.photos/600/400?2',
        categoryId: 1,
      },
      {
        id: 3,
        title: 'Python for Data Analysis',
        instructor: 'Michael Chen',
        price: 349,
        seats: 20,
        image: 'https://picsum.photos/600/400?3',
        categoryId: 2,
      },
      {
        id: 4,
        title: 'Machine Learning Basics',
        instructor: 'Emily Davis',
        price: 399,
        seats: 15,
        image: 'https://picsum.photos/600/400?4',
        categoryId: 2,
      },
      {
        id: 5,
        title: 'iOS Development with Swift',
        instructor: 'David Wilson',
        price: 329,
        seats: 18,
        image: 'https://picsum.photos/600/400?5',
        categoryId: 3,
      },
      {
        id: 6,
        title: 'Android App Development',
        instructor: 'Lisa Anderson',
        price: 319,
        seats: 22,
        image: 'https://picsum.photos/600/400?6',
        categoryId: 3,
      },
    ];
    this.category = [
      { id: 0, name: 'All' },
      { id: 1, name: 'Web Development' },
      { id: 2, name: 'Data Science' },
      { id: 3, name: 'Mobile Development' },
    ];
  }

  register(course: ICourse) {
    if (course.seats > 0) {
      course.seats--;
    }
  }

  get filteredCourses(): ICourse[] {
    if (this.selectedCategoryId === 0 || !this.selectedCategoryId) {
      return this.corses;
    }
    return this.corses.filter(course => course.categoryId === this.selectedCategoryId);
  }
}
