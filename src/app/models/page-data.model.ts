import { Observable } from 'rxjs';

export interface PageData {
  aggregators: {
    aggregator: Observable<any>[];
    siteInfo: Observable<any>[];
  };
}
