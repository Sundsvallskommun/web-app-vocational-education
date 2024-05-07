export interface TableBlockHeader {
  id: number;
  tableId: number;
  pageId: number;
  name: string;
  cells: TableBlockCell[];
  sortable: boolean;
  hidden: boolean;
}

export interface TableBlockCell {
  id: number;
  headerId: number;
  pageId: number;
  tableId: number;
  wysiwyg_content: string;
}

export interface TableBlockRow {
  id: number;
  tableBlock: TableBlock;
  tableId: number;
  pageId: number;
  cells: TableBlockCell[];
}

export interface TableBlock {
  id: number;
  page: number;
  pageName: string;
  pageId: number;
  showBlock: boolean;
  headers: TableBlockHeader[];
  rows: TableBlockRow[];
  cells: TableBlockCell[];
}
