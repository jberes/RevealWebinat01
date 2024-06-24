import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardNames } from '../models/reveal-webinar-demo/dashboard-names';

const API_ENDPOINT = 'https://localhost:7218';

@Injectable({
  providedIn: 'root'
})
export class RevealWebinarDemoService {
  constructor(
    private http: HttpClient
  ) { }

  public getDashboardNamesList(): Observable<DashboardNames[]> {
    return this.http.get<DashboardNames[]>(`${API_ENDPOINT}/dashboards/names`);
  }
}
