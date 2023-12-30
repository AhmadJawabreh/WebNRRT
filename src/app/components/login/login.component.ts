import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationModel } from 'src/app/api-client-services/authentication/models/authentication-model';
import { AuthenticationResource } from 'src/app/api-client-services/authentication/resources/authentication-resource';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public static headers = new HttpHeaders();
  public form: FormGroup;
  public errorMessage: string = '';
  public isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private patientService: PatientsService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  login() {
    if (this.validateEmailAndPassword) {
      const authenticationModel = {
        email: this.form.value.email,
        password: this.form.value.password,
      } as AuthenticationModel;

      this.authService.login(authenticationModel);
    }

    this.authService.userAuthentication.subscribe(
      (item: AuthenticationResource | null) => {
        if (item?.token) {
          this.authService.setSession(item);
          this.router.navigateByUrl('/patients');
        }
      }
    );

    this.authService.isloading.subscribe(
      (isLoading: boolean) => (this.isLoading = isLoading)
    );
    this.authService.errorMessage.subscribe((errorMessage: any) => {
      this.errorMessage = errorMessage;
    });
  }

  private get validateEmailAndPassword(): boolean {
    return this.form.value.email && this.form.value.password;
  }
}
