import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges,
  TemplateRef,
  OnChanges,
  ElementRef,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { DataColumn } from './datatable.interface';
import { DomSanitizer } from '@angular/platform-browser';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'ngx-mat-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed, void',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
      transition(
        'expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DatatableComponent<T> implements OnInit, OnChanges {
  constructor(private sanitizer: DomSanitizer) {}
  @Input() data: Array<T> = [];
  @Input() displayedColumns: DataColumn[] = [];
  @Input() toolbar = true;
  @Input() customContainerStyles: object;
  @Input() actionEnabled = false;
  @Input() showIndex = false;
  @Input() indexColumnLabel = 'No.';
  @Input() sortEnabled = true;
  @Input() disableSortClear = true;
  @Input() selectEnabled = false;
  @Input() selectAllEnabled = true;
  @Input() selectColumnTitle = 'Select';
  @Input() actionMenuItems: Array<string> = [];
  @Input() expandedDetailEnabled = false;
  @Input() filterPlaceholder = 'Search';
  @Input() stickyHeader = true;
  @Input() expandedDetailRef: TemplateRef<any>;
  @Input() name = 'default_table';
  @Input() pageSize: number;

  @Output() rowItemClicked = new EventEmitter<{
    column: DataColumn;
    rowData: T;
  }>();
  @Output() actionClicked = new EventEmitter<{
    actionName: string;
    rowData: T;
  }>();
  @Output() selectedRows = new EventEmitter<T[]>();
  dataSource: MatTableDataSource<T>;
  maxAll = 25;
  selection = new SelectionModel<T>(true, []);
  columnsToDisplay: string[];
  noDataText = 'No records found';
  noData = false;
  expandedElement;
  showSearch = false;
  currentSort: Sort = undefined;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('search') searchInput: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data !== undefined && changes.data.currentValue) {
      this.dataSource = new MatTableDataSource(changes.data.currentValue);
      this.dataSource.paginator = this.paginator;
      this.noData = this.dataSource.data.length === 0;
      if (this.currentSort) {
        this.sortData(this.currentSort);
      }
    }
  }

  ngOnInit() {
    this.populateTableData(this.displayedColumns);
    this.selection.changed.subscribe((next) =>
      this.selectedRows.emit(next.source.selected)
    );
  }

  onClickSearch() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 0);
    }
  }

  /**
   * Populates data table
   */
  populateTableData(columnsData: Array<DataColumn>): void {
    const columnNames: string[] = [];
    columnsData.map((column) => {
      columnNames.push(column.name);
    });
    if (this.actionEnabled) {
      columnNames.push('action'); // appends an extra 'action' column to the table
    }
    if (this.showIndex) {
      columnNames.unshift('index');
    }
    if (this.selectEnabled) {
      columnNames.unshift('select'); // appends 'select' column as the 1st column
    }

    this.columnsToDisplay = columnNames.slice();
  }

  /**
   * Emits row item name and row Data
   */

  onRowItemSelected(column: DataColumn, rowData: T): void {
    if (!!column.options && !!column.options.expandRow) {
      this.expandedElement = this.expandedElement === rowData ? null : rowData;
    }
    this.rowItemClicked.emit({ column, rowData });
  }

  /**
   * Emits action name on clicking a row action
   *
   */
  onActionClick(action: string, rowData: T): void {
    this.actionClicked.emit({ actionName: action, rowData });
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
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  /**
   * Filters datatable with provided keyword
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
    return [25, 50, 100];
  }

  sortData(sort: Sort): void {
    this.currentSort = sort;
    if (sort.direction === '') {
      this.dataSource.data = this.data;
      return;
    }

    const sortedData = this.data.slice();

    // fetch the associated column data
    const currentColumnData = this.displayedColumns.filter(
      (column) => column.name === sort.active
    )[0];

    if (currentColumnData.options && currentColumnData.options.useColumn) {
      this.currentSort.active = currentColumnData.options.useColumn;
    } else {
      this.currentSort.active = sort.active;
    }

    if (
      currentColumnData.options &&
      currentColumnData.options.sort === 'date'
    ) {
      sortedData.sort((a: T, b: T) =>
        sort.direction === 'asc'
          ? _sortDates(a[sort.active], b[sort.active])
          : _sortDates(b[sort.active], a[sort.active])
      );
    } else if (
      currentColumnData.options &&
      currentColumnData.options.sort === 'number'
    ) {
      sortedData.sort((a: T, b: T) =>
        sort.direction === 'asc'
          ? _sortNumeric(a[sort.active], b[sort.active])
          : _sortNumeric(b[sort.active], a[sort.active])
      );
    } else {
      sortedData.sort((a: T, b: T) =>
        sort.direction === 'asc'
          ? _sortAlphanumeric(String(a[sort.active]), String(b[sort.active]))
          : _sortAlphanumeric(String(b[sort.active]), String(a[sort.active]))
      );
    }

    this.dataSource.data = sortedData;
  }

  formatColumnCell(column: DataColumn, value: string) {
    if (column.options && column.options.formatter) {
      return this.sanitizer.bypassSecurityTrustHtml(
        column.options.formatter(value)
      );
    }
    return value;
  }
}

function _sortAlphanumeric(a: string, b: string): number {
  return a.localeCompare(b, 'en', { numeric: true });
}

function _sortNumeric(a: number, b: number): number {
  return a - b;
}

function _sortDates(a: string, b: string) {
  return new Date(a).getTime() - new Date(b).getTime() > 0 ? 1 : -1;
}
