import { Url } from 'url';

export interface ApiModel<T> {
    status: string;
    totalResults: number;
    articles: T;
  }