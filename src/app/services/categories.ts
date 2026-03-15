import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Categories {
  private readonly baseUrl = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) {}

  /**
   * Returns all categories from the MockAPI backend.
   */
  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.baseUrl).pipe(
      map((categories) => {
        const hasAll = categories.some((c) => c.id === 0 || c.name === 'All');
        return hasAll ? categories : [{ id: 0, name: 'All' }, ...categories];
      }),
    );
  }
}

