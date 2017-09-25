import React from "react";

// Home page component
export default class Home extends React.Component {
  constructor(props) {
    const defaultMonth = 9;
    const defaultYear = 2017;
    super(props);
    this.weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

    this.state = {
      month: defaultMonth,
      year: defaultYear,
      calendar: this.createCalendar(defaultMonth, defaultYear)
    }
  }

  handlePrevious = () => {
    let month = this.state.month == 1 ? 12 : this.state.month-1;
    let year = this.state.month == 1 ? this.state.year-1 : this.state.year;
    this.setState({
      month: month,
      year: year,
      calendar: this.createCalendar(month, this.state.year)
    })
  };

  handleNext = () => {
    let month = this.state.month == 12 ? 1 : this.state.month+1;
    let year = this.state.month == 12 ? this.state.year+1 : this.state.year;

    this.setState({
      month: month,
      year: year,
      calendar: this.createCalendar(month, year),
    })
  };

  // render
  render() {
    const {month, year, calendar } = this.state;
    return (

      <div className="page-home">
        <h1>Mois : {new Date(year, month - 1).toLocaleString("fr-FR", { month: "long" })}</h1>
       <h2> Année : {new Date(year, month).toLocaleString("fr-FR", { year: "numeric" })}</h2>
        <button onClick={this.handlePrevious}>Prev</button>
        <button onClick={this.handleNext}>Next</button>
        <table>
          <thead>
          <tr>
            {calendar.map((object) => {
              return <td key={"th" + object.day}>{this.getWeekDay(year, month, object.day)}</td>
            })}
          </tr>
          </thead>
          <tbody>
          <tr>
            {calendar.map((object) => {
              return <td key={"td" + object.day}>{object.day}</td>
            })}
          </tr>
          </tbody>
        </table>
      </div>
    );
  }

  createCalendar = (month, year) => {
    if (typeof month != "undefined" && (!Number.isInteger(month) || (month < 0 || month > 12))) {
      throw new Error("Month must be an interger between 0 and 11")
    }

    if (typeof year != "undefined" && (!Number.isInteger(year) || year < 0 )) {
      throw new Error("Year must be an positive interger")
    }

    let daysInMonth = this.daysInMonth(month, year);
    let calendar = [];

    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push({day: i})
    }

    return calendar;
  };

  daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  getWeekDay = (year, month, day) => {
    return this.weekDays[new Date(year, month - 1, day - 1).getDay()]
  }
}
