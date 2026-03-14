import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../models/ICourses';
import { Courses } from '../../services/courses';

@Component({
  selector: 'app-course-details',
  imports: [CurrencyPipe],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {
  course: ICourse | null = null;

  constructor(private route: ActivatedRoute, private coursesService: Courses) {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!Number.isNaN(id)) {
      this.course = this.coursesService.getCourseByID(id) ?? null;
    }
  }
}

