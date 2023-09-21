import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {
  movingBar: boolean = false;
  playing: boolean = false;
  fullscreen: boolean = false;
  urlVideo: string = 'http://localhost:3000/video?quality=2160';

  videoForm = new FormGroup({
    video: new FormControl(''),
  });

  imagenbase64: string | undefined = undefined;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let videoPlayer: HTMLVideoElement = document.getElementById('videoPlayer') as HTMLVideoElement;
    videoPlayer.addEventListener("timeupdate", () => {
      let curr = (videoPlayer.currentTime / videoPlayer.duration) * 100;
      // if(video.ended){
      //     document.querySelector(".fa-play").style.display = "block"
      //     document.querySelector(".fa-pause").style.display = "none"
      // }
      if(!this.movingBar){
        (document.getElementById('barra') as HTMLElement).style.width = `${curr}%`;
      }
  })
  }

  mousemoveBar(event: any){
    this.movingBar = true;
    let timeline: HTMLElement = document.getElementById('timeline') as HTMLElement;
    let curr = (event.offsetX / timeline.clientWidth) * 100;
    (document.getElementById('barra') as HTMLElement).style.width = `${curr}%`;
    console.log(curr);
  }

  mouseleaveBar(event: any){
    this.movingBar = false;
    let videoPlayer: HTMLVideoElement = document.getElementById('videoPlayer') as HTMLVideoElement;
    let curr = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    (document.getElementById('barra') as HTMLElement).style.width = `${curr}%`;
  }

  clickBar(event: any){
    let timeline: HTMLElement = document.getElementById('timeline') as HTMLElement;
    let videoPlayer: HTMLVideoElement = document.getElementById('videoPlayer') as HTMLVideoElement;
    let curr = (event.offsetX / timeline.clientWidth) * 100;
    (document.getElementById('barra') as HTMLElement).style.width = `${curr}%`;
    videoPlayer.currentTime = (curr / 100) * videoPlayer.duration;
  }

  changeQuality(quality: string){
    let videoPlayer: HTMLVideoElement = document.getElementById('videoPlayer') as HTMLVideoElement;
    videoPlayer?.pause(); // Pausa el video
    let currentTime = videoPlayer.currentTime;
    this.urlVideo = `http://localhost:3000/video?quality=${quality}`; // Cambia la fuente del video
    videoPlayer?.load(); // Carga la nueva fuente
    videoPlayer?.addEventListener('loadedmetadata', () => {
      videoPlayer.currentTime = currentTime; // Restaura la posición de reproducción
      if(this.playing){
        videoPlayer.play(); // Reanuda la reproducción
      }
    });
  }

  capturarImagen(event: any) {
    const imagenCapturada = event.target.files[0];
    this.extraerBase64(imagenCapturada).then((imagen: any) => {
      this.imagenbase64 = imagen.base;
    });
   }

   extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        console.log(e);
      }
    });

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

}
