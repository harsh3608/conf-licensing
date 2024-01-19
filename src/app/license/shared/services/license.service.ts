import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../../shared/Constants';
import { AllLicensesResponse, CreateLicenseResponse, SingleLicenseResponse } from '../models/license-models';


@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllLicenseRequests(): Observable<AllLicensesResponse> {
    return this.http.get<AllLicensesResponse>(Constants.baseServerUrl + `LicenseRequest/GetAllLicenseRequests`, { headers: this.headers });
  }

  getLicenseRequest(artifactId:number): Observable<SingleLicenseResponse>{
    return this.http.get<SingleLicenseResponse>(Constants.baseServerUrl + `LicenseRequest/GetLicenseRequest?artifactId=${artifactId}`, { headers: this.headers });
  }
  
  CreateLicenseRequest(request:any): Observable<CreateLicenseResponse>{
    return this.http.post<CreateLicenseResponse>(Constants.baseServerUrl + `LicenseRequest/CreateLicenseRequest`,request, { headers: this.headers });
  }

}
