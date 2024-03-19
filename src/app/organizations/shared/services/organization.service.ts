import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../../shared/Constants';
import { OrganizationsResponse, Organization, CreateOrganizationResponse } from '../models/organization-models';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllOrganizations(): Observable<OrganizationsResponse> {
    return this.http.get<OrganizationsResponse>(Constants.baseServerUrl + `Organization/GetAllOrganizations`, { headers: this.headers });
  }

  createOrganization(addRequest:Organization): Observable<CreateOrganizationResponse> {
    return this.http.post<CreateOrganizationResponse>(Constants.baseServerUrl + `Organization/CreateOrganization`,addRequest, { headers: this.headers });
  }
}
