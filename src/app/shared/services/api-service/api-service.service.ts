import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ENUMS } from 'src/utils/enums';

export interface AggregatorOrderResponse {
  status: string;
  orders: Order[];
}

export interface SellerListResponse {
  status: string;
  sellers: any[];
}

interface Seller {
  aggregatorId: string;
  email: string;
  id: string;
  name: string;
  phone: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: Item[];
  orderSummary: orderSummary;
  orderStatus: string;
  sellerId: string;
  category: string;
}

export interface Item {
  brandName: string;
  description: string;
  name: string;
}

interface orderSummary {
  total: string;
}

export interface AggregatorProductListing {
  status: string;
  products: any[];
}

export interface sellerInfo {}

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  baseURL: any = environment.BASE_URL;
  httpClient: any;
  sellerId: any;

  constructor(private http: HttpClient, private router: Router) {}

  // AGGREGATOR ACTIONS
  AggregatorLogin(data: any) {
    let url: string = environment.BASE_URL + 'auth/login-email';
    return this.http.post(url, data);
  }

  AggregatorRegister(data: any) {
    let url: string = environment.BASE_URL + 'aggregator/ondcregistration';
    return this.http.post(url, data);
  }

  sellerListing() {
    let url: string = environment.BASE_URL + 'aggregator/sellerList';
    return this.http.get(url);
  }

  getOrdersListAggregator(pageNo: string): Observable<AggregatorOrderResponse> {
    let url: string = environment.BASE_URL + `aggregator/orders?page=${pageNo}`;
    return this.http.get<AggregatorOrderResponse>(url);
  }

  getOrdersListFull(): Observable<AggregatorOrderResponse> {
    let url: string = environment.BASE_URL + `aggregator/orders`;
    return this.http.get<AggregatorOrderResponse>(url);
  }

  getAllProductsAggregator(): Observable<AggregatorProductListing> {
    let url: string = environment.BASE_URL + 'product';
    return this.http.get<AggregatorProductListing>(url);
  }

  inviteSeller(data: sellerInfo) {
    let url: string = environment.BASE_URL + 'aggregator/inviteSeller';
    return this.http.post(url, data);
  }

  getSellerList(): Observable<SellerListResponse> {
    let url: string = environment.BASE_URL + 'aggregator/sellerList';
    return this.http.get<SellerListResponse>(url);
  }

  updateOrder(id: string, payload: any) {
    let url: string = environment.BASE_URL + `order/updateStatus?id=${id}`;
    return this.http.patch(url, payload);
  }

  registerSeller(data: any) {
    // let url: string = environment.BASE_URL + `order/updateStatus?id=${id}`;
    // return this.http.patch(url, payload);
  }

  // SELLER ACTIONS

  // getToken(url: any, data: any): any {
  //   return this.http.post(this.baseURL + url, data);
  // }
  // getPermissions(url: any, data: any) {
  //   return this.http.post(this.baseURL + url, data);
  // }

  // get(url: any): any {
  //   return this.http.get(this.baseURL + url);
  // }
  // post(url: any, obj: any): Observable<any> {
  //   return this.http.post(this.baseURL + url, obj);
  // }

  getProduct() {
    return this.http.get(this.baseURL + 'product');
  }
  postProduct(data: any) {
    return this.http.post(this.baseURL + 'product', data);
  }
  patchProduct(obj: any, id: any, sellerId: any) {
    return this.http.patch(`${this.baseURL}product/${id}/${sellerId}`, obj);
  }
  deleteProduct(id: any, sellerId: any) {
    return this.http.delete(`${this.baseURL}product/${id}/${sellerId}`);
  }
  getProd(id: any, sellerId: any) {
    this.sellerId = localStorage.getItem('sellerId');
    return this.http.get(`${this.baseURL}product/${id}/${sellerId}`);
  }

  User = new BehaviorSubject<any>(null);

  public get UserSubjectValue() {
    if (this.User) {
      return this.User.value;
    } else {
      return null;
    }
  }


  // COMMON ACTIONS
  login(data: any) {
    return this.http.post(this.baseURL + 'auth/login', data);
  }

  verifyLogin(data: any) {
    return this.http.post(this.baseURL + 'auth/verify-login', data);
  }

  phoneTransfer(data: any) {
    this.User.next(data);
  }

  getOrders() {
    return this.http.get(this.baseURL + 'order');
  }

  verifyRefreshToken(token: string) {
    let url: string = environment.BASE_URL + 'auth/verify-access-token';
    this.http.post(url, token);
  }
}
