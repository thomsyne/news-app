import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { NewsConstants, NewsSources } from './constants/app.constants';
import { Article, Kvp } from './models/article.model';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NewsApp';

  sourceValue = null;
  authorValue = null;
  country = null;
  domains = null;
  selected = false;
  query = null;
  headlines = null;
  newsOptions = NewsSources;
  apiKey = NewsConstants.apiKey;
  articlesList: Article[];
  filteredList: Article[];
  sourcesList: Kvp[];
  authorsList: Kvp[];
  startDate = new Date(2000, 0, 2);

  constructor(
    private readonly newsService: NewsService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.fetchNews();
  }

  fetchNews() {
    if (this.selected === false) {
      this.query = 'bitcoin';
    } else {
      this.domains = 'techcrunch.com';
    // tslint:disable-next-line: align
    } if (this.country) {
      this.query = null;
      this.domains = null;
    }
    this.newsService.fetchNews(this.domains, this.query, this.apiKey, this.country).subscribe(
      (response) => {
        this.articlesList = response.articles;
        this.filteredList = response.articles;
        const result = response.articles;

        result.forEach((element) => {
          const sourceResp = Object.keys(result).map(function(key) {
            return { id: result[key].source.id, value: result[key].source.name};
          });

          const authorResp = Object.keys(result).map(function(key) {
            return { id: result[key].author, value: result[key].author};
          });

          this.sourcesList = Array.from(new Set(sourceResp.filter(data => data.id !== null).map(a => a.value)))
            .map(value => {
              return sourceResp.filter(data => data.id !== null).find(a => a.value === value);
            });
          this.authorsList = Array.from(new Set(authorResp.filter(data => data.id !== null).map(a => a.value)))
          .map(value => {
            return authorResp.filter(data => data.id !== null).find(a => a.value === value);
          });
        });
        console.log(this.sourcesList);

        console.log(this.articlesList);
      },
      (error) => {

      }
    );
  }

  toggleSelector() {
    this.query = null;
    this.domains = null;
    this.selected = !this.selected;
    this.fetchNews();
  }

  usNews() {
    this.country = 'us';
    this.fetchNews();
  }

  selectedOption(event) {
    switch (event.target.id) {
      case 'source':
        this.sourceValue = event.target.value;
        break;
      case 'author':
        this.authorValue = event.target.value;
        break;
    }


    // this.filteredList = this.articlesList;
    // this.cdr.detectChanges();
    // this.filteredList = this.articlesList.filter(data => data.source.id === id);
    // this.cdr.detectChanges();
  }

  filterList() {
    this.filteredList = this.articlesList;
    if (this.authorValue !== null) {
      this.filteredList = this.sourceValue !== null ?
          this.filteredList.filter(data => (data.source.id === this.sourceValue) && (data.author === this.authorValue)) :
          this.filteredList.filter(data => data.author === this.authorValue);
    }
    if (this.authorValue === null || this.sourceValue === null) {
      this.filteredList = this.articlesList;
    }
  }

  reloadPage() {
    window.location.reload(true);
  }

}
