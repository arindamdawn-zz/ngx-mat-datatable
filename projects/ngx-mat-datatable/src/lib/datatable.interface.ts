export interface DataColumn {
  name: string;
  value: string;
  options?:Partial<ColumnOptions>
}

export type ColumnOptions = {
  isLink: boolean;
  expandRow: boolean;
}
