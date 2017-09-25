/**
 * Created by Gess on 25/09/2017.
 */
import React from 'react'

export default class Calendar {

  constructor(month, year) {
    this.calendar = this.createCalendar(month, year);
    this.weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  }

  createCalendar = (month, year) => {
    if (typeof month != "undefined" && (!Number.isInteger(month) || (month < 0 || month > 11))) {
      throw new Error("Month must be an interger between 0 and 11")
    }

    if (typeof year != "undefined" && (!Number.isInteger(year) || year < 0 )) {
      throw new Error("Month must be an positive interger")
    }
    let calendarMonth = month ? month : new Date().getMonth();
    let calendarYear = year ? year : new Date().getFullYear();

    let daysInMonth = this.daysInMonth(calendarMonth, calendarYear);
    let calendar = [];

    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push({day: i})
    }

    return calendar;
  };

  daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  }

  getCalendar = (month, year) => (this.calendar = this.createCalendar(month, year));

  getWeekDay = (year, month, day) => {
    return this.weekDays[new Date(year, month-1, day-1).getDay()]
  }
}


