import { JobsProps } from "./companyJob";

interface Column {
  Header: string;
  accessor: string;
}

interface DataRow {
  id: string | number;
  [key: string]: any;
}

interface TableProps {
  columns: Column[];
  data: any;
  children?: React.ReactNode;
  imgStyle?: string;
  className?: string;
  categoryList?: any;
  setEditMode?: any;
  categoriesloading?: any;
  getDataFromServer?: any;
}

interface initialJobs {
  id?: string;
  title: string;
  desc?: string | null;
  image: string;
}

interface TableJobsProps {
  columns: Column[];
  data: initialJobs[];
  className?: string;
  setEditMode?: any;
  getDataFromServer: any;
}
interface initialPackaging {
  id?: string;
  name: string;
  image: string;
  price?: number;
  stock?: number;
}

interface TablePackagingProps {
  columns: Column[];
  data: initialPackaging[];
  className?: string;
  setEditMode?: any;
  getDataFromServer: any;
}
interface TableProductPricingProps {
  columns: Column[];
  data: initialPackaging[];
  className?: string;
  setEditMode?: any;
  getDataFromServer: any;
}

export type {
  TableProps,
  TableJobsProps,
  TablePackagingProps,
  TableProductPricingProps,
};
