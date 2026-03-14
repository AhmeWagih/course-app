import { Injectable } from '@angular/core';
import { ICourse } from '../models/ICourses';

@Injectable({
  providedIn: 'root',
})
export class Courses {
  private readonly courses: ICourse[] = [
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

  getAllCourses(): ICourse[] {
    return this.courses;
  }

  getCoursesByCatID(catID: number): ICourse[] {
    if (catID === 0) {
      return this.courses;
    }
    return this.courses.filter((c) => c.categoryId === catID);
  }

  getCourseByID(courseID: number): ICourse | undefined {
    return this.courses.find((c) => c.id === courseID);
  }
}
