import { Component, signal } from '@angular/core';
import { Order } from './components/order/order';

@Component({
  selector: 'app-root',
  imports: [Order],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('courseApp');
}
