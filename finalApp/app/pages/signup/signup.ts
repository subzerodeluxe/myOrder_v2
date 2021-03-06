import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { HomePage } from '../home/home';
import { LocationPage } from '../location/location';

@Component({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [AuthData]
})
export class SignupPage {
  public signupForm: ControlGroup;

  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      username: ['', Validators.required]
    })
  } // einde van constructor

  signupUser() {
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.username).then(() => {
        this.nav.setRoot(LocationPage);
          
          let loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
          });
          loading.present();
      }, (error) => {
        var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
      });
    }
  }  // einde signupUser function 
}// einde SignupPage class
