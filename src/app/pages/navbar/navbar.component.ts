import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { globalAlert } from 'src/app/shared/global-alert/global-alert.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private method?: string;
  private route?: string;

  constructor(
    //private _auth: AuthService,
    private router: Router,
    //private _translate: TranslateService,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    // this.route = 'logout',
    // this.method = 'POST'
    // let data = {
    //   username: this._auth.getUsername(),
    //   ...(this._auth.getTokenBiscomm() && { tokenBisscomm: this._auth.getTokenBiscomm() })
    // }

    globalAlert('', '¿Deseas cerrar cesión?', 'warning', '', true, 'Cancelar', true, 'Aceptar',)
      .then(
        res => {
          if (res.isConfirmed) {
            this.router.navigate(['/login']);
            // this._auth.call$(data, this.route, this.method, true, true).subscribe({
            //   next: (response) => {
            //     if (response.status === Constant.SUCCESS) {
            //       sessionStorage.clear();
            //       this.router.navigate(['/login']);
            //     } else {
            //       globalAlert('', this._translate.instant(Constant.MSG001), 'error', '', true, 'Cerrar', false, '')
            //     }
            //   },
            //   error: (error) => {
            //     globalAlert('', this._translate.instant(Constant.MSG001), 'error', '', true, 'Cerrar', false, '')
            //   }
            // })
          }
        }
      );

    
	}

}
