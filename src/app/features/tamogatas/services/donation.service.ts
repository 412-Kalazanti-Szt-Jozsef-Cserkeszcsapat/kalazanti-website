import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../core/config/api.config';
import {
  DonateType,
  CreateCheckoutSessionRequest,
  CheckoutSessionResponse,
} from '../models/donation.model';

@Injectable({ providedIn: 'root' })
export class DonationService {
  private readonly apiUrl = `${API_CONFIG.baseUrl.replace(/\/+$/, '')}${API_CONFIG.endpoints.donate}`;

  constructor(private http: HttpClient) {}

  getDonateTypes(): Observable<DonateType[]> {
    return this.http.get<DonateType[]>(`${this.apiUrl}/types`);
  }

  createCheckoutSession(
    request: CreateCheckoutSessionRequest,
  ): Observable<CheckoutSessionResponse> {
    return this.http.post<CheckoutSessionResponse>(`${this.apiUrl}`, request);
  }
}
