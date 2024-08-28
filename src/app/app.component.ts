import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  @ViewChild('eventModal') eventModal!: ElementRef; 
  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  currentMonth: number = this.currentDate.getMonth();
  currentWeekStart: Date = this.getStartOfWeek(this.currentDate);
  currentDay: Date = this.currentDate;
  view: string = 'month'; 
  events: any[] = [];
  newEventTitle: string = '';




 
  setView(view: string) {
    this.view = view;
  }

  
  goToToday() {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    this.currentWeekStart = this.getStartOfWeek(this.currentDate);
    this.currentDay = this.currentDate;
  }

  
  getDaysInMonth(): number[] {
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  getDaysOfWeek(): Date[] {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(new Date(this.currentWeekStart.getFullYear(), this.currentWeekStart.getMonth(), this.currentWeekStart.getDate() + i));
    }
    return days;
  }


  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  }

 
  openModal(day: number) {
    const selectedDate = new Date(this.currentYear, this.currentMonth, day);
    console.log('Fecha seleccionada:', selectedDate);
    $(this.eventModal.nativeElement).modal('show'); 
  }


  closeModal() {
    $(this.eventModal.nativeElement).modal('hide'); 
  }

 
  saveEvent() {
    if (this.newEventTitle.trim()) {
      this.events.push({
        title: this.newEventTitle,
        date: this.currentDay
      });
      this.newEventTitle = '';
      this.closeModal(); 
    }
  }

  
  getEventsForDay(date: Date): any[] {
    return this.events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  }
}
