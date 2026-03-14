import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
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
export class Courses implements OnChanges {
  @Input('sentSelectedCatId') receivedCatId: number = 0;
  @Input() totalOrderPrice: number = 0;
  @Output() onTotalOrderPriceChanged: EventEmitter<number>;
  courses: ICourse[];
  filteredCourses: ICourse[];
  categories: ICategory[];
  selectedCategoryId: number = 0;
  // totalOrderPrice: number = 0;
  /** Discount % per course id (0–100). Default 10. */
  discountByCourseId: Record<number, number> = {};
  date = new Date();
  num: number = 123.879;

  constructor(
    private cdr: ChangeDetectorRef,
    private coursesService: CoursesService,
    private categoriesService: Categories,
  ) {
    this.courses = this.coursesService.getAllCourses();
    this.categories = this.categoriesService.getAllCategories();
    this.selectedCategoryId = 0;
    this.filteredCourses = this.coursesService.getCoursesByCatID(this.selectedCategoryId);
    this.courses.forEach((c) => (this.discountByCourseId[c.id] = 10));
    this.onTotalOrderPriceChanged = new EventEmitter<number>();
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
    this.filteredCourses = this.coursesService.getCoursesByCatID(this.selectedCategoryId);
  }
}
