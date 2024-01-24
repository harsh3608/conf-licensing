import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../../shared/Constants';
import { AllApprovedLicensesResponse, AllLicensesResponse, ApproveLicenseModel, CreateLicenseResponse, GenerateLicenseResponse, SingleApprovedLicenseResponse, SingleLicenseResponse, UpdateLicenseRequest, UpdateLicenseResponse } from '../models/license-models';


@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  //License Requests
  getAllLicenseRequests(): Observable<AllLicensesResponse> {
    return this.http.get<AllLicensesResponse>(Constants.baseServerUrl + `LicenseRequest/GetAllLicenseRequests`, { headers: this.headers });
  }

  getLicenseRequest(artifactId: number): Observable<SingleLicenseResponse> {
    return this.http.get<SingleLicenseResponse>(Constants.baseServerUrl + `LicenseRequest/GetLicenseRequest?artifactId=${artifactId}`, { headers: this.headers });
  }

  CreateLicenseRequest(request: any): Observable<CreateLicenseResponse> {
    return this.http.post<CreateLicenseResponse>(Constants.baseServerUrl + `LicenseRequest/CreateLicenseRequest`, request, { headers: this.headers });
  }

  updateLicenseRequest(request: UpdateLicenseRequest): Observable<UpdateLicenseResponse> {
    return this.http.put<UpdateLicenseResponse>(Constants.baseServerUrl + `LicenseRequest/UpdateLicenseRequest`, request, { headers: this.headers });
  }


  //Approved Licenses
  getAllApprovedLicenses(): Observable<AllApprovedLicensesResponse> {
    return this.http.get<AllApprovedLicensesResponse>(Constants.baseServerUrl + `ApprovedLicense/GetAllApprovedLicenses`, { headers: this.headers });
  }

  generateLicense(request: ApproveLicenseModel): Observable<GenerateLicenseResponse> {
    return this.http.post<GenerateLicenseResponse>(Constants.baseServerUrl + `ApprovedLicense/GenerateLicense`, request, { headers: this.headers });
  }

  updateApprovedLicense(request: ApproveLicenseModel): Observable<GenerateLicenseResponse> {
    return this.http.put<GenerateLicenseResponse>(Constants.baseServerUrl + `ApprovedLicense/UpdateApprovedLicense`, request, { headers: this.headers });
  }

  getApprovedLicense(artifactId: number): Observable<SingleApprovedLicenseResponse> {
    return this.http.get<SingleApprovedLicenseResponse>(Constants.baseServerUrl + `ApprovedLicense/GetApprovedLicense?artifactId=${artifactId}`, { headers: this.headers });
  }

  validateLicense(request: any): Observable<GenerateLicenseResponse> {
    return this.http.post<GenerateLicenseResponse>(Constants.baseServerUrl + `ApprovedLicense/ValidateLicense`, request, { headers: this.headers });
  }






}
