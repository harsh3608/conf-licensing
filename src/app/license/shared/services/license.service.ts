import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../../shared/Constants';


@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllLicenseRequests(): Observable<any> {
    return this.http.get<any>(Constants.baseServerUrl + 'LicenseRequest/GetAllLicenseRequests', { headers: this.headers });
  }
}
