import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { MatCardModule } from "@angular/material/card";
import { NgxMatDatatableModule } from "datatable";
import { TestModule } from "./test/test.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxMatDatatableModule,
    BrowserAnimationsModule,
    MatCardModule,
    TestModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
