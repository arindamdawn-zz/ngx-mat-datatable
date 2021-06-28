import { Component, OnInit } from '@angular/core';
import { DataColumn } from 'dist/ngx-mat-datatable/lib/datatable.interface';
import { Customer } from './customer.interface';
import { formatDate } from '@angular/common';
 enum ENestedSortLevel{
  SECOND_LEVEL = 2,
  THIRD_LEVEL = 3,
  FOURTH_LEVEL = 4
}
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
          defaultSort:'asc'
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
          secondLevelSort:'asc',
          nestedSort:{ level: ENestedSortLevel.SECOND_LEVEL, direction:'desc'}

      },
    },
    {
      name: 'city',
      value: 'City Name is pretty big',
      options: {
        align: 'center',
        formatter: (value: string) =>
          `<span style='color: green;size: 20px'>${value}</span>`,
          nestedSort:{ level: ENestedSortLevel.THIRD_LEVEL, direction:'desc'}
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
    this.testData.push(
      {
      name: 'ABC Mendes',
      age: 5,
      city: `LA`,
      dateFormatted: formatDate(new Date(), 'yyyy-MM-dd h:mm:ss a', 'en-CA'),
      date: new Date().toISOString(),
      country: 'USA',
      contact: `958989898`,
      email: `shawn3@gmail.com`,
    });
    this.testData.push(
      {
      name: '1BC Mendes',
      age: 10,
      city: `Florida`,
      dateFormatted: formatDate(new Date(), 'yyyy-MM-dd h:mm:ss a', 'en-CA'),
      date: new Date().toISOString(),
      country: 'USA',
      contact: `958989898`,
      email: `shawn3@gmail.com`,
    });
   
    // this.testData.push(
    //   {
    //   name: 'Michael Jordan',
    //   age: 2,
    //   city: `LA`,
    //   dateFormatted: formatDate(new Date(), 'yyyy-MM-dd h:mm:ss a', 'en-CA'),
    //   date: new Date().toISOString(),
    //   country: 'USA',
    //   contact: `958989898`,
    //   email: `shawn3@gmail.com`,
    // });
    this.testData.push(
      {
      name: 'Michael Jordan',
      age: 6,
      city: `LA`,
      dateFormatted: formatDate(new Date(), 'yyyy-MM-dd h:mm:ss a', 'en-CA'),
      date: new Date().toISOString(),
      country: 'USA',
      contact: `958989898`,
      email: `shawn3@gmail.com`,
    });
    let vals = [
      {
        name:'Shawn Mendes', age: 15, city: 'Georgia',country: 'USA'
      },
      {
        name:'1BC', age: 10, city: 'Florida',country: 'USA'
      },
      {
        name:'June', age: 23, city: 'Chicago',country: 'USA'
      },
      {
        name:'April', age: 15, city: 'Florida',country: 'USA'
      },
      {
        name:'Shawn Mendes', age: 15, city: 'Florida',country: 'USA'
      },
      {
        name:'Hello', age: 15, city: 'Florida',country: 'USA'
      },
      {
        name:'World', age: 15, city: 'Florida',country: 'USA'
      },
      {
        name:'June', age: 15, city: 'Pennsylvania',country: 'USA'
      },
      {
        name:'June', age: 15, city: 'Florida',country: 'USA'
      },
      {
        name:'Shawn Mendes', age: 15, city: 'Pennsylvania',country: 'USA'
      },
      {
        name:'Shawn Mendes', age: 23, city: 'Florida',country: 'USA'
      },
      {
        name:'Shawn Mendes', age: 5, city: 'Albania',country: 'USA'
      },
      {
        name:'Shawn Mendes', age: 7, city: 'Florida',country: 'USA'
      },
      {
        name:'Shawn Mendes', age: 23, city: 'Chicago',country: 'USA'
      },
      {
        name:'Shawn Mendes', age: 15, city: 'LA',country: 'USA'
      },
      {
        name:'Shawn Mendes', age: 15, city: 'Washington DC',country: 'USA'
      },
      {
        name:'Shawn Mendes', age: 15, city: 'Ontario',country: 'USA'
      },
      {
        name:'Shawn Mendes', age: 23, city: 'California',country: 'USA'
      },
      {
        name:'Shawn Mendes', age: 1, city: 'Florida',country: 'USA'
      },
      
    ];
    for (let i = 1; i <=vals.length; i++) {
      const randomDate = new Date(
        (new Date().getTime() * Math.random() * i) / 10
      ).toISOString();
      
      this.testData.push({
        name: vals[i-1].name,
        age: vals[i-1].age,
        city: vals[i-1].city,
        dateFormatted: formatDate(randomDate, 'yyyy-MM-dd h:mm:ss a', 'en-CA'),
        date: randomDate,
        country: vals[i-1].country,
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
