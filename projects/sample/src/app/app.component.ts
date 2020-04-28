import { Component } from "@angular/core";
import { DataColumn } from "dist/ngx-mat-datatable/lib/datatable.interface";
import { Customer } from "./customer.interface";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [
    `
      .container {
        margin: 2rem;
      }
    `,
  ],
})
export class AppComponent {
  title = "sample";
  customStyles = {height: '400px' };
  testColumns: DataColumn[] = [
    {
      name: "name",
      value: "Name",
      options: {
        isLink: true,
      },
    },
    {
      name: "age",
      value: "Age",
    },
    { name: "city", value: "City" },
    { name: "state", value: "State" },
    { name: "country", value: "Country" },
    { name: "contact", value: "Contact" },
    { name: "email", value: "Email" },
  ];

  testData: Customer[] = [
    {
      name: "Shawn Mendes",
      age: 33,
      city: "Florida1",
      state: "LA",
      country: "USA",
      contact: "9898989898",
      email: "shawn@gmail.com",
    },
    {
      name: "Jack Holland",
      age: 21,
      city: "Florida63",
      state: "West Bengal",
      country: "India",
      contact: "9898989898",
      email: "jack.holland@gmail.com",
    },
    {
      name: "Rakesh Malhotra",
      age: 45,
      city: "Florida0",
      state: "Maharashtra",
      country: "India",
      contact: "9897878787",
      email: "rakesh@gmail.com",
    },
    {
      name: "Will Smith",
      age: 45,
      city: "Florida2",
      state: "Maharashtra",
      country: "India",
      contact: "9898787878",
      email: "will@gmail.com",
    },
    {
      name: "Paula Scherr",
      age: 45,
      city: "Florida2",
      state: "Maharashtra",
      country: "India",
      contact: "9898989898",
      email: "paula@gmail.com",
    },
    {
      name: "Amanda Mathews",
      age: 45,
      city: "Florida2",
      state: "Maharashtra",
      country: "India",
      contact: "0989898989",
      email: "amanda@gmail.com",
    },
    {
      name: "Amanda Mathews",
      age: 45,
      city: "Florida2",
      state: "Maharashtra",
      country: "India",
      contact: "0989898989",
      email: "amanda@gmail.com",
    },
    {
      name: "Amanda Mathews",
      age: 45,
      city: "Florida2",
      state: "Maharashtra",
      country: "India",
      contact: "0989898989",
      email: "amanda@gmail.com",
    },
    {
      name: "Amanda Mathews",
      age: 45,
      city: "Florida2",
      state: "Maharashtra",
      country: "India",
      contact: "0989898989",
      email: "amanda@gmail.com",
    },
    {
      name: "Amanda Mathews",
      age: 45,
      city: "Florida2",
      state: "Maharashtra",
      country: "India",
      contact: "0989898989",
      email: "amanda@gmail.com",
    },
    {
      name: "Amanda Mathews",
      age: 45,
      city: "Florida2",
      state: "Maharashtra",
      country: "India",
      contact: "0989898989",
      email: "amanda@gmail.com",
    },
    {
      name: "Amanda Mathews",
      age: 45,
      city: "Florida2",
      state: "Maharashtra",
      country: "India",
      contact: "0989898989",
      email: "amanda@gmail.com",
    },
  ];
}
