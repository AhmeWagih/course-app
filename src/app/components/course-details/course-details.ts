import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../models/ICourses';
import { Courses } from '../../services/courses';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-details',
  imports: [CurrencyPipe],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails implements OnInit, OnDestroy {
  course: ICourse | null = null;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private coursesService: Courses,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!Number.isNaN(id)) {
      const sub = this.coursesService.getCourseByID(id).subscribe({
        next: (course) => {
          this.course = course;
        },
        error: () => {
          window.alert('Failed to load course details.');
        },
      });
      this.subscriptions.add(sub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
