import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  name: string = '';
  description: string = '';
  currentTime: string = "0:00";
  endTime: string = "0:00";
  movingBar: boolean = false;
  playing: boolean = false;
  fullscreen: boolean = false;
  restartButton: boolean = false;
  urlVideo: string = '#';
  idVideo: string = '';
  videoForm = new FormGroup({
    video: new FormControl(''),
  });
  routeSub: Subscription | undefined;
  qualities: any;
  selectedQuality: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ensureVideoPlays(): void{
    const video = document.querySelector("video");

    if(!video) return;
    
    const promise = video.play();
    if(promise !== undefined){
        promise.then(() => {
            // Autoplay started
        }).catch(error => {
            // Autoplay was prevented.
            video.muted = true;
            video.play();
        });
    }
  }

  ngOnInit(): void {
    let qualityUsed: string;
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      this.description = params['description'];
    })
    this.routeSub = this.route.params.subscribe(params => {
      this.idVideo = params['id'];
      this.getReadyQuality(params['id']).subscribe(
        (response) => {
          this.qualities = response.data;
          this.selectedQuality = this.qualities[this.qualities.length - 1];
          this.urlVideo = `http://localhost:3000/api/reproduceVideo?quality=${this.selectedQuality}&id=${this.idVideo}`;
          console.log(response);
        },
        (error) => {
          console.log(error);
        },
      );
    });
    let videoPlayer: HTMLVideoElement = document.getElementById('videoPlayer') as HTMLVideoElement;
    videoPlayer.addEventListener("timeupdate", () => {
      if(videoPlayer.currentTime === videoPlayer.duration){
        this.playing = false
        this.restartButton = true;
      } else {
        this.restartButton = false;
      }
      if(videoPlayer.currentTime !== 0){
        if(videoPlayer.currentTime < 0) {
          this.currentTime = "00:00";
        } else {
          this.currentTime = this.secondsToMinutes(videoPlayer.currentTime);
        }
      } else {
        this.currentTime = "00:00";
      }
      if(!Number.isNaN(videoPlayer.duration)){
        this.endTime = this.secondsToMinutes(videoPlayer.duration);
      }
      let curr = (videoPlayer.currentTime / videoPlayer.duration) * 100;
      // if(video.ended){
      //     document.querySelector(".fa-play").style.display = "block"
      //     document.querySelector(".fa-pause").style.display = "none"
      // }
      if(!this.movingBar){
        (document.getElementById('barra') as HTMLElement).style.width = `${curr}%`;
      }
    });
    //this.ensureVideoPlays();
  }

  test(){
    let button = (document.getElementById('144p') as HTMLButtonElement);
    console.log(button)
  }

  getReadyQuality(id: any){
    return this.apiService.call(null, 'getReadyQuality/' + id, 'GET')
  }

  mousemoveBar(event: any){
    this.movingBar = true;
    let timeline: HTMLElement = document.getElementById('timeline') as HTMLElement;
    let curr = (event.offsetX / timeline.clientWidth) * 100;
    let timelineSizes = this.getCoords(timeline);
    (document.getElementById('barra') as HTMLElement).style.width = `${curr}%`;
    let time = (document.getElementById('time-on-mouse') as HTMLElement);
    let textTime = (document.getElementById('text-time') as HTMLElement);
    let videoPlayer: HTMLVideoElement = document.getElementById('videoPlayer') as HTMLVideoElement;
    time.style.display = "block";
    time.style.position = "absolute";
    console.log(timelineSizes);
    if( window.innerHeight == screen.height) {
      // browser is fullscreen
      time.style.top = (timelineSizes.top - 15) + "px";
      time.style.left = (event.clientX - 20) + "px";
    } else {
      time.style.top = (timelineSizes.top - 99) + "px";
      time.style.left = (event.clientX - 40) + "px";
    }
    let seconds = (curr / 100) * videoPlayer.duration;
    if(seconds < 0) seconds = 0;
    textTime.innerText = this.secondsToMinutes(seconds);
    // console.log(timeline.getBoundingClientRect());
  }

  getCoords(elem: HTMLElement) {
    let box = elem.getBoundingClientRect();
  
    return {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
  }

  mouseleaveBar(event: any){
    let time = (document.getElementById('time-on-mouse') as HTMLElement);
    time.style.display = "none";
    this.movingBar = false;
    let videoPlayer: HTMLVideoElement = document.getElementById('videoPlayer') as HTMLVideoElement;
    let curr = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    (document.getElementById('barra') as HTMLElement).style.width = `${curr}%`;
  }

  clickBar(event: any){
    let timeline: HTMLElement = document.getElementById('timeline') as HTMLElement;
    let videoPlayer: HTMLVideoElement = document.getElementById('videoPlayer') as HTMLVideoElement;
    let curr = (event.offsetX / timeline.clientWidth) * 100;
    if(curr < 0) curr = 0;
    (document.getElementById('barra') as HTMLElement).style.width = `${curr}%`;
    videoPlayer.currentTime = (curr / 100) * videoPlayer.duration;
  }

  changeQuality(quality: string){
    this.selectedQuality = quality;
    let videoPlayer: HTMLVideoElement = document.getElementById('videoPlayer') as HTMLVideoElement;
    videoPlayer?.pause(); // Pausa el video
    let currentTime = videoPlayer.currentTime;
    this.urlVideo = `http://localhost:3000/api/reproduceVideo?quality=${quality}&id=${this.idVideo}`; // Cambia la fuente del video
    videoPlayer?.load(); // Carga la nueva fuente
    videoPlayer?.addEventListener('loadedmetadata', () => {
      videoPlayer.currentTime = currentTime; // Restaura la posición de reproducción
      if(this.playing){
        videoPlayer.play(); // Reanuda la reproducción
      }
    });
  }

  disabledButton(quality: any){
    if(quality === this.selectedQuality) return true;
    return false;
  }

  getBase64(file: any){
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject();
      };
    })
  }

  restartVideo(){
    let videoPlayer: HTMLVideoElement = document.getElementById('videoPlayer') as HTMLVideoElement;
    videoPlayer.currentTime = 0;
    this.playing = true;
    videoPlayer.play();
  }

  playVideo(){
    let videoPlayer: HTMLVideoElement = document.getElementById('videoPlayer') as HTMLVideoElement;
    if(videoPlayer.paused){
      this.playing = true;
      videoPlayer.play();
    } else {
      this.playing = false;
      videoPlayer.pause();
    }
  }

  fullScreen(){
    let containa: HTMLElement = document.getElementById('containa') as HTMLElement;
    if(this.fullscreen){
      this.fullscreen = false;
      document.exitFullscreen();
    } else {
      this.fullscreen = true;
      containa.requestFullscreen();
    }
  }

  secondsToMinutes(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const secondsString = remainingSeconds.toFixed(0).padStart(2, '0'); // Round and format seconds
    const timeFormatted = `${minutes}:${secondsString}`;
    return timeFormatted;
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
