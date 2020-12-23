import { Component, OnInit } from '@angular/core';
import { DataColumn } from 'dist/ngx-mat-datatable/lib/datatable.interface';
import { Customer } from './customer.interface';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .container {
        margin: 2rem;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  title = 'sample';
  customStyles = { height: '100%' };
  actionMenuItems = ['Add', 'Remove', 'Show details'];
  testColumns: DataColumn[] = [
    {
      name: 'name',
      value: 'Name',
      options: {
        isLink: true,
        formatter: (value: string) =>
          `<span style="color: green;size: 20px">${value}</span>`,
      },
    },
    {
      name: 'age',
      value: 'Age',
      options: {
        align: 'center',
        sort: 'number',
        formatter: (value: string) =>
          `<span style='color: green;size: 20px'>${value}</span>`,
      },
    },
    {
      name: 'city',
      value: 'City Name is pretty big',
      options: {
        align: 'center',
        formatter: (value: string) =>
          `<span style='color: green;size: 20px'>${value}</span>`,
      },
    },
    {
      name: 'dateFormatted',
      value: 'Date',
      options: { sort: 'date', useColumn: 'date' },
    },
    { name: 'country', value: 'Country' },
    {
      name: 'contact',
      value: 'Contact',
      options: { expandRow: true, isLink: true },
    },
    { name: 'email', value: 'Email' },
  ];

  testData: Customer[] = [];

  ngOnInit() {
    for (let i = 1; i < 7; i++) {
      const randomDate = new Date(
        (new Date().getTime() * Math.random() * i) / 10
      ).toLocaleString();
      this.testData.push({
        name: 'Shawn Mendes',
        age: i,
        city: `Florida`,
        dateFormatted: formatDate(randomDate, 'yyyy-MM-dd h:mm:ss a', 'en-CA'),
        date: randomDate,
        country: 'USA',
        contact: `958989898`,
        email: `shawn3@gmail.com`,
      });
    }
  }

  addData(data: Customer) {
    this.testData = [...this.testData, data];
  }

  removeData(index: number) {}
  handleActionClicked(event: { actionName: string; rowData: Customer }) {
    if (event.actionName === 'Add') {
      this.addData({
        age: 23,
        city: 'Melbourne',
        contact: '9898989888',
        country: 'USA',
        date: '2020-02-01',
        dateFormatted: '2020-03-01',
        email: 'test@gmail.com',
        name: 'Michael Jordan',
      });
      console.log(this.testData);
    }
    if (event.actionName === 'Show details') {
      console.log('do magic');
    }
  }
  handleRowItemClicked(event: { column: DataColumn; rowData: Customer }) {
    console.log(event, 'row item clicked');
  }
}
