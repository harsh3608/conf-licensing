import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../../shared/Constants';
import { OrganizationsResponse, Organization, CreateOrganizationResponse, SingleOrganizationResponse } from '../models/organization-models';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  createOrganization(addRequest: Organization): Observable<CreateOrganizationResponse> {
    return this.http.post<CreateOrganizationResponse>(Constants.baseServerUrl + `Organization/CreateOrganization`, addRequest, { headers: this.headers });
  }

  getOrganization(artifactId: number): Observable<SingleOrganizationResponse> {
    return this.http.get<SingleOrganizationResponse>(Constants.baseServerUrl + `Organization/GetOrganization?artifactId=${artifactId}`, { headers: this.headers });
  }

  getAllOrganizations(): Observable<OrganizationsResponse> {
    return this.http.get<OrganizationsResponse>(Constants.baseServerUrl + `Organization/GetAllOrganizations`, { headers: this.headers });
  }

  getActiveOrganizations(): Observable<OrganizationsResponse> {
    return this.http.get<OrganizationsResponse>(Constants.baseServerUrl + `Organization/GetActiveOrganizations`, { headers: this.headers });
  }

  updateOrganization(updateRequest: Organization): Observable<CreateOrganizationResponse> {
    return this.http.put<CreateOrganizationResponse>(Constants.baseServerUrl + `Organization/UpdateOrganization`, updateRequest, { headers: this.headers });
  }
}
