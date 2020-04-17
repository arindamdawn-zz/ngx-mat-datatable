import { NgModule } from "@angular/core";
import { DatatableComponent } from "./datatable.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSortModule } from "@angular/material/sort";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { CommonModule } from "@angular/common";
import { CdkTableModule } from "@angular/cdk/table";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [DatatableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    CdkTableModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [DatatableComponent]
})
export class NgxMatDatatableModule {}
