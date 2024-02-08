import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jwtHelperService = new JwtHelperService();

  constructor() { }

  getLoggedInUserName() :string{
    const token = sessionStorage.getItem('access-token') || '';
    const decodedToken: any = this.jwtHelperService.decodeToken(token);
    return decodedToken?.name;
  }
}
