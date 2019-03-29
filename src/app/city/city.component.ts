import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {
	name:string;
	data: any;
	location: any;
	resultDetails: any;

  constructor(private route:ActivatedRoute, private DataService:DataService){
		this.name = this.route.snapshot.params['name'];
  	this.data = this.DataService.getOption();
  	this.getLocation()
  	var searchLink = "https://www.metaweather.com/api/location/" + this.location.woeid;
   	this.httpRequestAsync(searchLink);
  }

  getLocation () {
		var data = this.data;
		var name = this.name;
		var location = undefined;
		data.forEach(function(item) {
			if(item.title === name) {
				location = item
			}
		})
		this.location = location;
	}

	httpRequestAsync(url) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => { 
      if (httpRequest.readyState == 4 && httpRequest.status == 200)
        var resultDetails = JSON.parse(httpRequest.responseText)
        this.resultDetails = resultDetails; 
    }
    httpRequest.open("GET", url, true)
    httpRequest.send();
  }
  round(input) {
    return Math.round(input)
  }

  getSrc(input) {
   return "https://www.metaweather.com/static/img/weather/png/64/"+input+".png"
  }

  getWeather() {
    var number = 3;
    var items = this.resultDetails.consolidated_weather.slice(0, number).map(item => {
      return item
    });
  return items
  }
}
