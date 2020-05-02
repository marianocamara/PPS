import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, ActionSheetController } from '@ionic/angular';

import { MessagesIndex } from "../services/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
 
  validations_form: FormGroup;
  errorMessage: string = '';
  splash = true;
  fade = false;
 
  constructor(
 
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router,
    public actionSheetController: ActionSheetController
 
  ) { }
 
  ngOnInit() {
 
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  ionViewDidEnter() {
    setTimeout(() => this.fade = true, 4000);
  }

   validation_messages = {
    'email': [
      { type: 'required', message: 'El email es un campo requerido.' },
      { type: 'pattern', message: 'Por favor ingrese un email válido.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es un campo requerido.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' }
    ]
  };
 
 
  loginUser(value){
    this.authService.SignIn(value.email, value.password)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('/tabs/animales');
    }, err => {
      this.errorMessage =  this.authService.printErrorByCode (err.code);
      console.log(err.message);
    })
  }
 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/registration');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'users',
      buttons: [{
        text: 'Admin',
        role: 'destructive',
        icon: 'person-add-outline',
        handler: () => {
          this.validations_form.controls['email'].setValue("admin@test.com");
          this.validations_form.controls['password'].setValue("adminpass");
        }
      }, {
        text: 'Usuario',
        icon: 'person-outline',
        handler: () => {
          this.validations_form.controls['email'].setValue("usuario@test.com");
          this.validations_form.controls['password'].setValue("usuariopass");
        }
      }, {
        text: 'Anónimo',
        icon: 'person-outline',
        handler: () => {
          this.validations_form.controls['email'].setValue("anonimo@test.com");
          this.validations_form.controls['password'].setValue("anonimopass");
        }
      }]
    });
    await actionSheet.present();
  }
 
}