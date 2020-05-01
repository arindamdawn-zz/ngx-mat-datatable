import { Component, OnInit } from "@angular/core";
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
export class AppComponent implements OnInit {
  title = "sample";
  customStyles = { height: "400px" };
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
      options: { align: "center" },
    },
    { name: "city", value: "City" },
    { name: "state", value: "State" },
    { name: "country", value: "Country" },
    {
      name: "contact",
      value: "Contact",
      options: { expandRow: true, isLink: true },
    },
    { name: "email", value: "Email" },
  ];

  testData: Customer[] = [];

  ngOnInit() {
    for (let i = 1; i < 100; i++) {
      this.testData.push({
        name: "Shawn Mendes",
        age: i,
        city: "Florida1",
        state: "LA",
        country: "USA",
        contact: "9898989898",
        email: "shawn@gmail.com",
      });
    }
  }

  handleRowItemClicked(event: { column: DataColumn; rowData: Customer }) {
    console.log(event, "row item clicked");
  }
}
