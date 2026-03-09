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
import { CurrencyPipe, DecimalPipe, NgClass, NgStyle } from '@angular/common';
import { DisableAfterClick } from '../../directives/disable-after-click';
import { Highlight } from '../../directives/highlight';
import { DiscountPipe } from '../../pipes/discount.pipe';
import { ShortenPipe } from '../../pipes/shorten.pipe';

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
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnChanges {
  @Input('sentSelectedCatId') receivedCatId: number = 0;
  @Output() onTotalOrderPriceChanged: EventEmitter<number>;
  courses: ICourse[];
  filteredCourses: ICourse[];
  categories: ICategory[];
  selectedCategoryId: number = 0;
  totalOrderPrice: number = 0;
  /** Discount % per course id (0–100). Default 10. */
  discountByCourseId: Record<number, number> = {};
  date = new Date();
  num: number = 123.879;

  constructor(private cdr: ChangeDetectorRef) {
    this.courses = [
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
    this.categories = [
      { id: 0, name: 'All' },
      { id: 1, name: 'Web Development' },
      { id: 2, name: 'Data Science' },
      { id: 3, name: 'Mobile Development' },
    ];
    this.selectedCategoryId = 0;
    this.filteredCourses = this.courses;
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
    if (this.selectedCategoryId === 0) {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter((c) => c.categoryId === this.selectedCategoryId);
    }
  }
}
