import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PageMetaService {
  baseURL: any = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  fetchPageMetaData(domain: string) {
    return this.http.get(this.baseURL + 'aggregator?domain=odn.nowfloats.com');
  }
}
