import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit { 
  value = undefined;
  message = undefined;
  cities = undefined;
  result = undefined;
  resultDetails = undefined;

  public constructor(private DataService: DataService) {
  }

  ngOnInit() {
  }

  httpRequestAsync(url) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => { 
      if (httpRequest.readyState == 4 && httpRequest.status == 200)
        var result = JSON.parse(httpRequest.responseText)
        this.result = result;   
        this.DataService.setOption(result) 
    }
    httpRequest.open("GET", url, true)
    httpRequest.send();
  }

  getValue(event) {
  	this.value = event.target.value
  }

   onClick() {
    if (this.value === undefined || this.value ==='') {
  		this.message = "Search field is empty"
      return
  	}

  	else {
    	this.message = undefined;
    	var searchLink = "https://www.metaweather.com/api/location/search/?query=" + this.value;
   		this.httpRequestAsync(searchLink);
    }
  }
}
