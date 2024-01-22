import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationsResponse } from '../models/organization-models';
import { Observable } from 'rxjs';
import { Constants } from '../../../shared/Constants';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllOrganizations(): Observable<OrganizationsResponse> {
    return this.http.get<OrganizationsResponse>(Constants.baseServerUrl + `Organization/GetAllOrganizations`, { headers: this.headers });
  }
}
