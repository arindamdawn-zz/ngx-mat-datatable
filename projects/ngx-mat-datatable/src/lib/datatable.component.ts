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
  nestedSortColumns: DataColumn[];

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
    this.getNestedSortColumns();
    this.sortDefault(this.displayedColumns);
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
   * Populate nestedSortColumns variable from displayedColumns
   */
  getNestedSortColumns() {
    this.nestedSortColumns = this.displayedColumns.filter((c) => {
      return c.options && Object.keys(c.options).includes('nestedSort');
    });

    this.nestedSortColumns.length > 1 &&
      this.nestedSortColumns.sort((a, b) => {
        return _sortNumeric(
          a.options.nestedSort.level,
          b.options.nestedSort.level
        );
      });
  }
  /**
   * handle All Nested Sorting After doing Primary Sort
   * @param primarySort
   * @param sortedData
   * @param primaryColName
   */
  handleAllNestedSorts(
    primarySort: Sort,
    sortedData: T[],
    primaryColName,
    type
  ) {
    let primary = {
      sort: {...primarySort},
      name: primaryColName,
      type: type,
    };
    
    this.nestedSortColumns.forEach((sort) => {
      let nested = {
        sort: {
          active: sort.name,
          direction: sort.options.nestedSort.direction,
        },
        name: sort.name,
        type: sort?.options.sort,
      };
      this.handleNestedSort(primary,nested,sort.options.nestedSort.level,sortedData);
    });
  }
  /**
   * Get Value for sorting
   * @param sortParams 
   * @param row1 
   * @param row2 
   * @param col 
   * @returns integer
   */
  getSortVal(sortParams, row1,row2, col) {
    if (sortParams.sort.direction === 'asc') {
      if (sortParams.type === 'date') {
        return _sortDates(row1[col],row2[col]);
      } else if (sortParams.type === 'number') {
        return _sortNumeric(row1[col],row2[col]);
      } else {
        return _sortAlphanumeric(row1[col],row2[col]);
      }
    } else if (sortParams.sort.direction === 'desc') {
      if (sortParams.type === 'date') {
        return _sortDates(row2[col],row1[col]);
      } else if (sortParams.type === 'number') {
        return _sortNumeric(row2[col],row1[col]);
      } else {
        return _sortAlphanumeric(row2[col],row1[col]);
      }
    }
  }

  handleNestedSort(primary,nested,level,sortedData){
    sortedData.sort((a: T, b: T) =>{
      let prevColVals  = this.nestedSortColumns.filter(col=>col.options.nestedSort.level<level).map(el=>{
        return this.getSortVal({sort:{direction: el.options.nestedSort.direction},type:el.options.sort},a,b,el.name);
      });
      
      let primaryVal = this.getSortVal({sort:{direction:primary.sort.direction},type:primary.type},a,b,primary.name);
      prevColVals.unshift(primaryVal);

      // If all elements doesn't require any change in position
      // check if position to be adjusted based on this nested col
      if(prevColVals.some(el=>el>0)) {
        return 1;
      } else {
        return this.getSortVal({sort:{direction: nested.sort.direction},type:nested.type},a,b,nested.name);
      }
    });
  }
  /**
   * Sort the Table with default Sorting
   */
  sortDefault(columnsData: Array<DataColumn>): void {
    columnsData.forEach(column=>{
      if (column.options && column.options.defaultSort) {
          let defaultSortState:Sort = { active: column.name,direction: column.options.defaultSort };

          // Update UI
          this.sort.active = defaultSortState.active;
          this.sort.direction = defaultSortState.direction;

          // Emit to invoke sorting
          this.sort.sortChange.emit(defaultSortState);

      }
    });
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

    let colName = sort.active;

    if (currentColumnData.options && currentColumnData.options.useColumn) {
      // If useColumn field is present,
      // for sorting purpose, use value from `${useColumn}`column
      // useColumn column typically contain data suitable for sorting
      // paired with formattedData rendered in `${name}`column
      colName= currentColumnData.options.useColumn;
    } else {
      colName = sort.active;
    }

    if (
      currentColumnData.options &&
      currentColumnData.options.sort === 'date'
    ) {
      sortedData.sort((a: T, b: T) =>
        sort.direction === 'asc'
          ? _sortDates(a[colName], b[colName])
          : _sortDates(b[colName], a[colName])
      );
    } else if (
      currentColumnData.options &&
      currentColumnData.options.sort === 'number'
    ) {
      sortedData.sort((a: T, b: T) =>
        sort.direction === 'asc'
          ? _sortNumeric(a[colName], b[colName])
          : _sortNumeric(b[colName], a[colName])
      );
    } else {
      sortedData.sort((a: T, b: T) =>
        sort.direction === 'asc'
          ? _sortAlphanumeric(String(a[colName]), String(b[colName]))
          : _sortAlphanumeric(String(b[colName]), String(a[colName]))
      );
    }

    this.handleAllNestedSorts(
      sort,
      sortedData,
      colName,
      currentColumnData.options && currentColumnData.options.sort
    );
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
