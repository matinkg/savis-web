export interface DataObject {
  id: string;
  date: Date;
  status: string;
  total?: string;
  quantity?: number;
}

export interface TabelDataProps {
  data: DataObject[];
}
