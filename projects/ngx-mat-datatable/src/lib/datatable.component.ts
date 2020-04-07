import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges,
} from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { SelectionModel } from "@angular/cdk/collections";
import { DataColumn } from "./datatable.interface";

@Component({
  selector: "ngx-mat-datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatatableComponent<T> implements OnInit {
  constructor() {}
  // Todo make generic click handlers for row actions (determine how to grab row data on specific action click such as edit)
  @Input() data: Array<T> = [];
  @Input() displayedColumns: DataColumn[] = [];
  @Input() actionEnabled: boolean = false;
  @Input() showIndex: boolean = false;
  @Input() indexColumnLabel: string = "No.";
  @Input() selectEnabled: boolean = false;
  @Input() selectAllEnabled: boolean = true;
  @Input() selectColumnTitle: string = "Select";
  @Input() actionMenuItems: Array<string> = [];
  @Input() expandedDetailEnabled: boolean = false;
  @Input() showFilter: boolean = false;
  @Input() filterPlaceholder: string = "Search";
  // @Input() exportEnabled: boolean = false;
  @Input() name: string = "default_table";
  @Output() rowItemClicked = new EventEmitter<{ name: string; rowData: T }>();
  @Output() actionClicked = new EventEmitter<{
    actionName: string;
    rowData: T;
  }>();
  @Output() selectedRows = new EventEmitter<T[]>();
  dataSource: MatTableDataSource<T>;
  maxAll: number = 3;
  selection = new SelectionModel<T>(true, []);
  columnsToDisplay: string[];
  noDataText: string = "No records found";
  noData: boolean = false;
  expandedElement;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] !== undefined && changes.data.currentValue) {
      this.dataSource = new MatTableDataSource(changes.data.currentValue);
      this.dataSource.paginator = this.paginator;
      this.noData = this.dataSource.data.length === 0;
    }
  }

  ngOnInit() {
    this.populateTableData(this.displayedColumns);
    this.selection.changed.subscribe((next) =>
      this.selectedRows.emit(next.source.selected)
    );
  }

  /**
   * Populates data table
   */
  populateTableData(columnsData: Array<DataColumn>): void {
    let columnNames: string[] = [];
    columnsData.map((column) => {
      columnNames.push(column.name);
    });
    if (this.actionEnabled) {
      columnNames.push("action"); //appends an extra 'action' column to the table
    }
    if (this.showIndex) {
      columnNames.unshift("index");
    }
    if (this.selectEnabled) {
      columnNames.unshift("select"); // appends 'select' column as the 1st column
    }

    this.columnsToDisplay = columnNames.slice();
  }

  /**
   * Emits row item name and row Data
   * @param itemName
   * @param rowData
   */

  onRowItemSelected(name: string, rowData: T): void {
    this.rowItemClicked.emit({ name, rowData });
  }

  /**
   * Emits action name on clicking a row action
   *
   * @param {string} action
   */
  onActionClick(action: string, rowData: T): void {
    this.actionClicked.emit({ actionName: action, rowData: rowData });
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
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }

  /**
   * Filters datatable with provided keyword
   * @param filterValue
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.noData = this.dataSource.filteredData.length === 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportPDF() {}

  exportExcel() {}

  getPageSizeOptions(): number[] {
    if (this.dataSource && this.dataSource.paginator.length > this.maxAll)
      return [5, 10, this.dataSource.paginator.length];
    else return [5, 10, this.maxAll];
  }

  sortData(sort: Sort): void {
    if (sort.direction === "") {
      this.dataSource.data = this.data;
      return;
    }

    const sortedData = this.data.slice();
    sortedData.sort((a: T, b: T) =>
      sort.direction === "asc"
        ? _sortAlphanumeric(String(a[sort.active]), String(b[sort.active]))
        : _sortAlphanumeric(String(b[sort.active]), String(a[sort.active]))
    );
    this.dataSource.data = sortedData;
  }
}

function _sortAlphanumeric(a: string, b: string): number {
  return a.localeCompare(b, "en", { numeric: true });
}
