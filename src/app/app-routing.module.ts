import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadVideoComponent } from './pages/upload-video/upload-video.component';
import { HomeComponent } from './pages/home/home.component';
import { VideoComponent } from './pages/video/video.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

const routes: Routes = [
  {path: '', component: NavbarComponent, children: [
    {path: 'upload-video', component: UploadVideoComponent},
    {path: 'home', component: HomeComponent},
    {path: 'video/:id', component: VideoComponent},
    {path: '**', redirectTo: '/home', pathMatch: 'full'},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
  ]},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
