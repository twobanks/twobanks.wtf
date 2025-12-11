import { STATUS_BOOK, TYPE_BOOK } from "@/utils/enums";

export interface Book {
  id: string; 
  title: string;
  subtitle?: string;
  author: string;
  cover: string;
  status: STATUS_BOOK;
  rating?: number;
  link: string; 
  type: TYPE_BOOK;
  readIn?: number;
}