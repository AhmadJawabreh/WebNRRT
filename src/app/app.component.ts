import { AuthenticationService } from 'src/app/services/authentication.service';
import {
  Component,
  TemplateRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})



export class AppComponent {
  title = 'WebNRRT';
  private offcanvasService = inject(NgbOffcanvas);
  closeResult = '';

  public constructor(private readonly router: Router,private readonly authenticationService: AuthenticationService) {
  }

  public get isLogin(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public navigate(type: number) {
    if (type === 0) {
      this.router.navigate([`patients`]);
    } else if (type === 1) {
      this.router.navigate([`patients/vistis`]);
    } else if (type === 2) {
      this.router.navigate([`patients/history`]);
    }  else if (type === 3) {
      this.router.navigate([`patient/akira`]);
    }else if (type === 4) {
      this.router.navigate([`teams`]);
    } else if (type === 5) {
      this.router.navigate([`team/members`]);
    } else if (type === 6) {
      this.authenticationService.logout();
      this.router.navigate([`login`]);
    }
    this.offcanvasService.dismiss();
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, { ariaLabelledBy: 'offcanvas-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
