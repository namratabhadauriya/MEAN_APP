import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get('http://localhost:8000/api/getStocks',{responseType: 'text' } );
  }
}
