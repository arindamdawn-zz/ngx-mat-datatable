export interface DataColumn {
  name: string;
  value: string;
  options?: Partial<ColumnOptions>;
}

export interface ColumnOptions {
  isLink: boolean;
  expandRow: boolean;
  align: 'left' | 'right' | 'center';
  sort: 'default' | 'date' | 'number';
  useColumn?: string;
  formatter: (value: string) => string;
}
