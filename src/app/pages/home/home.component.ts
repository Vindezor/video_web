import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  videos: any;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getAllVideos();
  }

  getAllVideos(){
    this.apiService.call(null, 'getAllVideos', 'GET').subscribe(
      (response) => {
        this.videos = response.data;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
