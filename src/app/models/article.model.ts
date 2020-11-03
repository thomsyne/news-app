import { Url } from 'url';

export interface Article {
  source: Source;
  author: any;
  title: string;
  description: string;
  url: Url;
  urlToImage: Url;
  publishedAt: string;
  content: any;
}

interface Source {
    id: any;
    name: string;
}

export interface Kvp {
  id: string;
  value: any;
}
