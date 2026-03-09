import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, discountPercent: number = 10): number {
    if (price == null || typeof price !== 'number') {
      return 0;
    }
    const raw = discountPercent == null || typeof discountPercent !== 'number' || Number.isNaN(discountPercent)
      ? 10
      : discountPercent;
    const percent = Math.max(0, Math.min(100, raw));
    return price * (1 - percent / 100);
  }
}
