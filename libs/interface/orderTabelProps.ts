export interface DataObject {
  id: string;
  created_at: Date;
  status: string;
  code?: string;
  is_redeemed?: boolean;
  amount?: string;
  items?: any;
  total_amount?: string;
}

export interface TabelDataProps {
  data: DataObject[];
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}
