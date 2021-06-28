import { SortDirection } from '@angular/material/sort';

export interface DataColumn {
  name: string;
  value: string;
  options?: Partial<ColumnOptions>;
}
export enum ENestedSortLevel{
  SECOND_LEVEL = 2,
  THIRD_LEVEL = 3,
  FOURTH_LEVEL = 4
}
export interface INestedSort{
  level: ENestedSortLevel;
  direction: SortDirection;
}
export interface ColumnOptions {
  isLink: boolean;
  expandRow: boolean;
  align: 'left' | 'right' | 'center';
  sort: 'default' | 'date' | 'number';
  useColumn?: string;
  formatter: (value: string) => string;
  defaultSort?: SortDirection;
  secondLevelSort?: SortDirection;
  nestedSort?: INestedSort;
}
