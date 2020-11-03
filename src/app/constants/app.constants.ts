import { HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://newsapi.org/v2';

export const NewsConstants = {
  environmentUrl: `http://newsapi.org/v2`,
   everything: `${baseUrl}/everything`,
   apiKey: '4ffe40ad0d90484686a08db204aed51f'
  };

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
  };

export const NewsSources = [
  {id: 'Articles from TechCrunch', value: 'TechCrunch'},
  {id: 'Bitcoin Related Articles', value: 'bitcoin'},
  {id: 'Top Headlines from US', value: 'us'}
]