import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Order } from './components/order/order';
import { CourseDetails } from './components/course-details/course-details';
import { CourseForm } from './components/course-form/course-form';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'courses', component: Order },
  { path: 'course/:id', component: CourseDetails },
  { path: 'insertcourse', component: CourseForm },
  { path: 'insertcourse/:id', component: CourseForm },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: NotFound },
];
