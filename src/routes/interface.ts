export interface Book {
  Title: string,
  Author: string,
  dateUploaded?: string
  datePublished: string
  Description: string
  pageCount: number
  Genre: string
  bookId: number
  Publisher: string
  dateEdited?: string
}

export interface ErrorInt {
  success: boolean;
  status: number;
  message: string;
  data: object;
}