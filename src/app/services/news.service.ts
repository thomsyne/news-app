import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiModel } from '../models/api.model';
import { Article } from '../models/article.model';
import { NewsConstants } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private httpClient: HttpClient) {}
  urlString = `${NewsConstants.environmentUrl}/everything`;

  fetchNews(
    domains?: string,
    query?: string,
    apiKey?: string,
    country?: string,
  ): Observable<ApiModel<Article[]>> {
    let params = new HttpParams();

    if (domains) {
      params = params.append('domains', domains);
    }

    if (query) {
      params = params.append('q', query);
    }

    if (apiKey) {
      params = params.append('apiKey', apiKey);
    }

    if (country) {
      this.urlString = `${NewsConstants.environmentUrl}/top-headlines`;
      params = params.append('country', country);
    }

    return this.httpClient
      .get<ApiModel<Article[]>>(this.urlString, { params })
      .pipe();
  }
}
