import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {}

  test(){
    const inputFile = document.getElementById('myFile') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;
    const description = document.getElementById('description') as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
      const file = inputFile.files[0];
      this.getBase64(file).then(
        (base64) => {
          let data = {
            base64,
            name: name.value,
            description: description.value,
          };
          this.apiService.call(data, 'uploadVideo', 'POST').subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {

        }
      );
    }
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
}
