import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges
} from "@angular/core";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { DataColumn } from './datatable.interface';

@Component({
  selector: "ngx-mat-datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatableComponent implements OnInit {
  constructor() {}
  // Todo make generic click handlers for row actions (determine how to grab row data on specific action click such as edit)
  @Input() data: Array<any> = [];
  @Input() displayedColumns: DataColumn[] = [];
  @Input() actionEnabled: boolean = false;
  @Input() selectEnabled: boolean = false;
  @Input() actionMenuItems: Array<string> = [];
  @Input() expandedDetailEnabled: boolean = false;
  @Input() showFilter: boolean = false;
  @Input() filterPlaceholder: string = "Search";
  @Input() exportEnabled: boolean = true;
  @Input() name: string = "default_table";
  @Input() isLoading: boolean = true;
  @Output() rowSelected: EventEmitter<Array<any>> = new EventEmitter<
    Array<any>
  >();
  @Output() actionClicked: EventEmitter<string> = new EventEmitter<string>();
  dataSource;
  maxAll: number = 3;
  selection = new SelectionModel<any>(true, []);
  columnsToDisplay: string[];
  noDataText: string = "No records found";
  noData: boolean = false;
  expandedElement;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] !== undefined && changes.data.currentValue) {
      console.log("data defined");
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(changes.data.currentValue);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.noData = this.dataSource.data.length === 0;
    }
  }

  ngOnInit() {
    this.populateTableData(this.displayedColumns);
  }

  /**
   * Populates data table
   */
  populateTableData(columnsData: Array<DataColumn>): void {
    let columnNames: string[] = [];
    columnsData.map(column => {
      columnNames.push(column.name);
    });
    if (this.actionEnabled) {
      columnNames.push("action"); //appends an extra 'action' column to the table
    }
    if (this.selectEnabled) {
      columnNames.unshift("select"); // appends 'select' column as the 1st column
    }
    this.columnsToDisplay = columnNames.slice();
  }

  /**
   * Emits row data when a table row is clicked
   *
   * @param {Array<any>} rowData
   */
  onRowSelected<T>(rowData: Array<T>): void {
    this.rowSelected.emit(rowData);
  }

  /**
   * Emits action name on clicking a row action
   *
   * @param {string} action
   */
  onActionClick<T>(action: string, rowData: Array<T>): void {
    console.log("row data", rowData);
    this.actionClicked.emit(action);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.position + 1}`;
  }

  /**
   * Filters datatable with provided keyword
   * @param filterValue
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportPDF() {}

  exportExcel(){}

  getPageSizeOptions(): number[] {
    if (this.dataSource && this.dataSource.paginator.length > this.maxAll)
      return [5, 10, this.dataSource.paginator.length];
    else return [5, 10, this.maxAll];
  }
}
