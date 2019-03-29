import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	private data: any;  
  
 setOption(value) { 
    this.data = value;  
  }  
  
  getOption() {  
    return this.data;  
  }
}