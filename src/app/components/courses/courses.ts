import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../models/ICategory';
import { ICourse } from '../../models/ICourses';
import { Courses as CoursesService } from '../../services/courses';
import { Categories } from '../../services/categories';
import { CurrencyPipe, DecimalPipe, NgClass, NgStyle } from '@angular/common';
import { DisableAfterClick } from '../../directives/disable-after-click';
import { Highlight } from '../../directives/highlight';
import { DiscountPipe } from '../../pipes/discount.pipe';
import { ShortenPipe } from '../../pipes/shorten.pipe';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  imports: [
    FormsModule,
    DisableAfterClick,
    Highlight,
    NgClass,
    NgStyle,
    CurrencyPipe,
    DecimalPipe,
    ShortenPipe,
    DiscountPipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit, OnChanges, OnDestroy {
  @Input('sentSelectedCatId') receivedCatId: number = 0;
  @Input() totalOrderPrice: number = 0;
  @Output() onTotalOrderPriceChanged: EventEmitter<number>;
  courses: ICourse[] = [];
  filteredCourses: ICourse[] = [];
  categories: ICategory[] = [];
  selectedCategoryId: number = 0;
  // totalOrderPrice: number = 0;
  /** Discount % per course id (0–100). Default 10. */
  discountByCourseId: Record<number, number> = {};
  date = new Date();
  num: number = 123.879;
  private subscriptions = new Subscription();

  constructor(
    private cdr: ChangeDetectorRef,
    private coursesService: CoursesService,
    private categoriesService: Categories,
  ) {
    this.onTotalOrderPriceChanged = new EventEmitter<number>();
  }

  ngOnInit(): void {
    const coursesSub = this.coursesService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.filteredCourses = courses;
        this.courses.forEach((c) => (this.discountByCourseId[c.id] = 10));
        this.cdr.detectChanges();
      },
      error: () => {
        window.alert('Failed to load courses.');
      },
    });
    this.subscriptions.add(coursesSub);

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

  getDiscount(courseId: number): number {
    return this.discountByCourseId[courseId] ?? 10;
  }

  private getDiscountedPrice(mainPrice: number, discountPercent: number): number {
    const raw =
      discountPercent == null ||
      typeof discountPercent !== 'number' ||
      Number.isNaN(discountPercent)
        ? 10
        : discountPercent;
    const percent = Math.max(0, Math.min(100, raw));
    return mainPrice * (1 - percent / 100);
  }

  register(courseId: number) {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course || course.seats <= 0) return;
    const quantity = 1;
    course.seats -= quantity;
    const discounted = this.getDiscountedPrice(course.price, this.getDiscount(course.id));
    this.totalOrderPrice += discounted * quantity;
    this.onTotalOrderPriceChanged.emit(this.totalOrderPrice);
    this.cdr.detectChanges();
  }

  increaseSeats(courseId: number, amount: number = 1) {
    const course = this.courses.find((c) => c.id === courseId);
    if (course) {
      course.seats += amount;
      this.cdr.detectChanges();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['receivedCatId']) {
      this.selectedCategoryId = this.receivedCatId;
    }
    this.filterCoursesFun();
  }

  filterCoursesFun(): void {
    const sub = this.coursesService.getCoursesByCatID(this.selectedCategoryId).subscribe({
      next: (courses) => {
        this.filteredCourses = courses;
        this.cdr.detectChanges();
      },
      error: () => {
        window.alert('Failed to filter courses.');
      },
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onDelete(courseId: number): void {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course) return;

    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }

    const sub = this.coursesService.deleteCourse(courseId).subscribe({
      next: () => {
        this.courses = this.courses.filter((c) => c.id !== courseId);
        this.filteredCourses = this.filteredCourses.filter((c) => c.id !== courseId);
        window.alert('Course deleted successfully.');
        this.cdr.detectChanges();
      },
      error: () => {
        window.alert('Failed to delete course.');
      },
    });

    this.subscriptions.add(sub);
  }
}
