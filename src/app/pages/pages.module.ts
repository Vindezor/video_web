import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UploadVideoComponent,
    HomeComponent,
    VideoComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
  ],
  providers: [
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ]
})
export class PagesModule { }
