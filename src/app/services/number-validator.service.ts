import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValidationResponse } from '../models/validation.model';

const params = new HttpParams()
    .set("apikey", "1cNMlD05ajdxqUCxygurvwydcj05NAjP")
   
@Injectable({
  providedIn: 'root'
})

export class NumberValidatorService {
  private verifyNumberUrl: string = environment.verifyNumberApi;
  private accesskeyUrl: string = environment.acces_key;
  private countryUrl: string = environment.countryApi;
  private supportedCounries: string = environment.supportedCountries;
   myHeaders = new Headers().set("apikey", "1cNMlD05ajdxqUCxygurvwydcj05NAjP");



  constructor(private http: HttpClient) { }

  verifyNumber(param: any): Observable<ValidationResponse>{
  // return this.http.get<ValidationResponse>(`${this.verifyNumberUrl}/validate?access_key=${this.accesskeyUrl}&number=${param.number}&country_code=${param.country_code}`);
  return this.http.get<any>(`https://api.apilayer.com/number_verification/validate?number=${param.number}&country_code=${param.country_code}`, {params})
  }

  getCountries(): Observable<any>{
    return this.http.get<any>(`${this.countryUrl}`);
  }

  getSupportedCountries(): Observable<any>{
    return this.http.get<any>(`${this.supportedCounries}?access_key=${this.accesskeyUrl}`);
  }

get(){
   return this.http.get<any>('https://api.apilayer.com/number_verification/countries', {params});
}


}
