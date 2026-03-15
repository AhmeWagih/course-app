import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICourse } from '../models/ICourses';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Courses {
  private readonly baseUrl = `${environment.apiBaseUrl}/courses`;

  constructor(private http: HttpClient) {}

  /** Returns all courses from the MockAPI backend. */
  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.baseUrl);
  }

  /** Returns courses that belong to the given category id. */
  getCoursesByCatID(catID: number): Observable<ICourse[]> {
    if (catID === 0) {
      return this.getAllCourses();
    }
    const url = `${this.baseUrl}?categoryId=${catID}`;
    return this.http.get<ICourse[]>(url);
  }

  /** Returns a single course by its id. */
  getCourseByID(courseID: number): Observable<ICourse> {
    const url = `${this.baseUrl}/${courseID}`;
    return this.http.get<ICourse>(url);
  }

  /** Adds a new course; MockAPI returns the inserted course. */
  addCourse(course: ICourse): Observable<ICourse> {
    return this.http.post<ICourse>(this.baseUrl, course);
  }

  /** Updates an existing course. */
  updateCourse(courseID: number, course: ICourse): Observable<ICourse> {
    const url = `${this.baseUrl}/${courseID}`;
    return this.http.put<ICourse>(url, course);
  }

  /** Deletes a course by id. */
  deleteCourse(courseID: number): Observable<void> {
    const url = `${this.baseUrl}/${courseID}`;
    return this.http.delete<void>(url);
  }
}

