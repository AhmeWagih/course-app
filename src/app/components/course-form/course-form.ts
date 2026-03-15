import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICourse } from '../../models/ICourses';
import { ICategory } from '../../models/ICategory';
import { Courses } from '../../services/courses';
import { Categories } from '../../services/categories';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-form.html',
})
export class CourseForm implements OnInit, OnDestroy {
  course: ICourse = {
    id: 0,
    title: '',
    instructor: '',
    price: 0,
    seats: 0,
    image: '',
    categoryId: 0,
  };

  categories: ICategory[] = [];
  isEditMode = false;
  private courseIdFromRoute: number | null = null;
  private subscriptions = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly coursesService: Courses,
    private readonly categoriesService: Categories,
  ) {}

  ngOnInit(): void {
    const routeSub = this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.courseIdFromRoute = idParam ? Number(idParam) : null;
      this.isEditMode = this.courseIdFromRoute != null && !Number.isNaN(this.courseIdFromRoute);

      if (this.isEditMode && this.courseIdFromRoute != null) {
        const courseSub = this.coursesService.getCourseByID(this.courseIdFromRoute).subscribe({
          next: (course) => {
            this.course = course;
          },
          error: () => {
            window.alert('Failed to load course details.');
          },
        });
        this.subscriptions.add(courseSub);
      }
    });
    this.subscriptions.add(routeSub);

    const catsSub = this.categoriesService.getAllCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
      },
      error: () => {
        window.alert('Failed to load categories.');
      },
    });
    this.subscriptions.add(catsSub);
  }

  onSubmit(): void {
    if (!this.course.title || !this.course.instructor || !this.course.categoryId) {
      window.alert('Please fill in all required fields.');
      return;
    }

    if (this.isEditMode && this.courseIdFromRoute != null) {
      const updateSub = this.coursesService
        .updateCourse(this.courseIdFromRoute, this.course)
        .subscribe({
          next: () => {
            window.alert('Course updated successfully.');
            this.router.navigate(['/courses']);
          },
          error: () => {
            window.alert('Failed to update course.');
          },
        });
      this.subscriptions.add(updateSub);
    } else {
      const addSub = this.coursesService.addCourse(this.course).subscribe({
        next: () => {
          window.alert('Course added successfully.');
          this.router.navigate(['/courses']);
        },
        error: () => {
          window.alert('Failed to add course.');
        },
      });
      this.subscriptions.add(addSub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
