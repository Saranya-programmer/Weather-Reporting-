//weather.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherData$: Observable<any>;

  constructor(private http: HttpClient) {}

  getWeather() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=YOUR_API_KEY&units=metric`;
    this.weatherData$ = this.http.get(apiUrl).pipe(
      map((data: any) => ({
        temp: data.main.temp,
        city: data.name
      })),
      catchError((error) => {
        console.error('Error fetching weather data', error);
        return [];
      })
    );
  }
}
//weather.component.html

<div class="container text-center mt-5">
  <h2 class="mb-4">The Weather App</h2>
  <div *ngIf="weatherData$ | async as weather">
    <h1>{{ weather.temp }}° Celsius</h1>
    <h3>{{ weather.city }}</h3>
  </div>
  <div class="input-group mt-4">
    <input
      type="text"
      class="form-control"
      placeholder="Enter city"
      [(ngModel)]="city"
    />
    <button class="btn btn-primary" (click)="getWeather()">Get Weather</button>
  </div>
</div>
//weather.component.css
        
.container {
  max-width: 400px;
  background: #e0f7ff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h1 {
  font-weight: bold;
  color: #333;
}
h2, h3 {
  color: #555;
}
.input-group {
  display: flex;
}
.btn-primary {
  background-color: #3a80f6;
  border-color: #3a80f6;
}
//app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';

@NgModule({
  declarations: [AppComponent, WeatherComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
