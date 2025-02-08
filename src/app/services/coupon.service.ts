import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviorment';


@Injectable({
  providedIn: 'root'
})
export class CouponService {
 private apiURL = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  validateCoupon(code: string): Observable<{ valid: boolean; discountPercentage?: number }> {
    return this._http.get<{ valid: boolean; discountPercentage?: number }>(`${this.apiURL}coupons/${code}`);
  }

  createCoupon(couponData: any): Observable<any> {
    return this._http.post<any>(`${this.apiURL}generate-coupons`, couponData);
  }
}
