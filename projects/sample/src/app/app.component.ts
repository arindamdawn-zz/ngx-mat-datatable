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
  testColumns: DataColumn[] = [
    {
      name: "name",
      value: "Name",
    },
    {
      name: "age",
      value: "Age",
    },
    { name: "city", value: "City" },
    { name: "state", value: "State" },
    { name: "country", value: "Country" },
  ];

  testData: Customer[] = [
    {
      name: "Shawn Mendes",
      age: 33,
      city: "Florida1",
      state: "LA",
      country: "USA",
    },
    {
      name: "Jack Holland",
      age: 21,
      city: "Florida63",
      state: "West Bengal",
      country: "India",
    },
    {
      name: "Rakesh Malhotra",
      age: 45,
      city: "Florida0",
      state: "Maharashtra",
      country: "India",
    },
    {
      name: "Rakesh Malhotra",
      age: 45,
      city: "Florida2",
      state: "Maharashtra",
      country: "India",
    },
  ];
}
