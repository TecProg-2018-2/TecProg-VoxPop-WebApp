/**********************************************************************
* File: input-validator.service.ts
* Purpose: InputValidatorService class implementation
* Notice: All rights reserved.
* Description File:  Verify the value of user fields
***********************************************************************/
import { Injectable, NgModule } from '@angular/core';
import {ToastsManager, Toast} from 'ng2-toastr';
import { LoggerService } from '@ngx-toolkit/logger';


@Injectable()

@NgModule({
  imports: [],
  declarations: [],
  exports: []
})

/**
  *  class responsible for set up the user fields validations.
  */
export class InputValidatorService {

  public valueErrorHandler: string = '';
  public valuePassword: string = '';
  public valueInvalidPassword: string = '';
  public valueUsername: string = '';
  public valueEmail: string = '';
  public valueInvalidInput: string = '';
  private password: string = '';
  private confirmPassword: string = '';
  public username: string = '';
  private statusPassword: boolean = false;
  private statusValidPassword: boolean = false;
  private statusUsername: boolean = false;
  private statusEmail: boolean = false;
  private colorDanger: string = '#d9534f'; /* Stores the color to be shown if the field is invalid*/
  private colorSucess: string = '#5cb85c'; /* Stores the color to be shown if the field is valid*/
  private assert = require('assert');
  private toastManager: ToastsManager;
  private logger: LoggerService;
  static readonly REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE: string = 'An error occurred: Please click this message to refresh';
  static readonly DEFAULT_ERROR_TITLE: string = 'Something went wrong';
  
  /**
  *  Method responsible for verify if all fields are filled,
  *  when editing.
  */
 validatorEditUser() {

  document.getElementById('alert-invalid-inputs').style.display = 'block';
  this.valueInvalidInput = 'Por favor, preencha os campos obrigatórios';
    
    /**
     * Paragraph responsible for changing the color of the name inputfield 
     * according to the filled data (correct or wrong)
     */ //T35
    if (!this.statusUsername) {
      this.borderColor('username', this.colorDanger);
    } else {
      this.borderColor('username', this.colorSucess);
    }

    /**
     * Paragraph responsible for changing the color of the e-mail inputfield 
     * according to the filled data (correct or wrong)
     */ //T35
    if (!this.statusEmail) {
      this.borderColor('email', this.colorDanger);
    } else {
      this.borderColor('email', this.colorSucess);
    }
  }


  /**
  *  Method responsible for verify if all fields are filled,
  *  when registering.
  */
  validatorRegisterUser() { //T36
    if (this.statusPassword && this.statusUsername && this.statusEmail && this.statusValidPassword) {
      this.successRegisterUser();
    } else {
      this.failedRegisterUser();
    }
  }

    /**
    * Style to successfully registered user. 
    */
  successRegisterUser(){ //T36 e T11
    document.getElementById('firstPart').style.display = 'none';
    document.getElementById('secondPart').style.display = 'block';
    document.querySelector('#registerBtn').removeAttribute('disabled');
  }

  /**
   * Style for user not successfully registered.
   */
  failedRegisterUser(){ //T36 e T11
    document.getElementById('alert-invalid-inputs').style.display = 'block';
    this.valueInvalidInput = 'Por favor, preencha os campos obrigatórios';

    /**
     * Paragraph responsible for changing the color of the password inputfield 
     * according to the filled data (correct or wrong)
     */ //T34 e T35
    if (this.statusPassword) {
      this.borderColor('password', this.colorSucess);
      this.borderColor('confirm-password', this.colorSucess);
    }else {
      this.borderColor('password', this.colorDanger);
      this.borderColor('confirm-password', this.colorDanger);
    }

    /**
     * Paragraph responsible for changing the color of the username inputfield 
     * according to the filled data (correct or wrong)
     */ //T35
    if (this.statusUsername) {
      this.borderColor('username', this.colorSucess);
    } else {
      this.borderColor('username', this.colorDanger);
    }

    /**
     * Paragraph responsible for changing the color of the e-mail inputfield 
     * according to the filled data (correct or wrong)
     */ //T35
    if (this.statusEmail) {
      this.borderColor('email', this.colorSucess);
    } else {
      this.borderColor('email', this.colorDanger);
    }
  }

  /**
  *  Method responsible for show the success message
  *  or danger message according with password validation
  *
  */
  onKeyPassword(eventPassword: any) {
    this.password = eventPassword.target.value;

    this.assert.ok(this.password === null || undefined, 'O dado obtido é nulo.');

    const validPassword = this.isPasswordValid(this.password);
    
    /**
     * Paragraph responsible for changing the color of the password inputfield 
     * according to the filled data (correct or wrong). Validates the data.
     */ //T35
    if(validPassword) {
      document.getElementById('alert-invalid-password').style.display = 'none';
      this.statusValidPassword = true;
      this.borderColor('password', this.colorSucess);
    } else {
      this.valueInvalidPassword = 'Sua senha deve ter no mínimo 6 caracteres';
      document.getElementById('alert-invalid-password').style.display = 'block';
      this.statusValidPassword = false;
      this.borderColor('password', this.colorDanger);
    }
  }

  /**
  *  Method responsible for verify if passwords
  *  are equals.
  */
  onKeyConfirmPassword(eventPassword: any) {
    this.assert.ok(eventPassword === null || eventPassword === undefined, 'O dado obtido é nulo.');
    this.confirmPassword = eventPassword.target.value;
  }

  /**
  *  Method responsible for show the success message
  *  or danger message according with user name validation
  *
  */
  onKeyUsername(eventUsername: any) {
    this.assert.ok(eventUsername === null || eventUsername === undefined, 'O dado obtido é nulo.');
    let username = eventUsername.target.value;

    const validUsername = this.isUsernameValid(username);

    /**
     * Paragraph responsible for changing the color of the username inputfield 
     * according to the filled data (correct or wrong). Validates the data.
     */ //T35
      if (validUsername) {
        document.getElementById('alert-username').style.display = 'none';
        this.valueUsername = '';
        this.statusUsername = true;
        this.borderColor('username', this.colorSucess);
      } else {
        this.valueUsername = 'Nome de usuário inválido';
        document.getElementById('alert-username').style.display = 'block';
        this.statusUsername = false;
        this.borderColor('username', this.colorDanger);
      } if (!this.isUsernameSizeValid(username)) {
        this.valueUsername = 'Nome de usuário deve ter entre 4 e 20 caracteres';
        document.getElementById('alert-username').style.display = 'block';
        this.statusUsername = false;
        this.borderColor('username', this.colorDanger);
      }
  }

  /**
  *  Method responsible for show the success message
  *  or danger message according with user e-mail validation
  *
  */
  onKeyEmail(eventEmail: any) {
    this.assert.ok(eventEmail === null || eventEmail === undefined, 'Dado inválido inserido' );
    const email = eventEmail.target.value;

    /**
     * Paragraph responsible for changing the color of the e-mail inputfield 
     * according to the filled data (correct or wrong). Validates the data.
     */ //T35
    if (this.isEmailValid(email)){
      document.getElementById('alert-email').style.display = 'none';
      this.valueEmail = '';
      this.statusEmail = true;
      this.borderColor('email', this.colorSucess);
    } else {
      document.getElementById('alert-email').style.display = 'block';
      this.valueEmail = 'Formato do E-mail está incorreto';
      this.statusEmail = false;
      this.borderColor('email', this.colorDanger);
    } if (email.length < 4) {
      document.getElementById('alert-email').style.display = 'block';
      this.valueEmail = 'Formato do E-mail está incorreto';
      this.statusEmail = false;
      this.borderColor('email', this.colorDanger);
    }
  }

  /**
  *  Method responsible for show success or danger message
  *  if passwords matchs.
  */
  onKeyValidatorPassword() {
    if (this.isConfirmedPassword(this.confirmPassword, this.password)) {
      document.getElementById('alert-password').style.display = 'none';
      this.valuePassword = '';
      this.statusPassword = true;
      this.borderColor('confirm-password', this.colorSucess);
    } else {
      this.valuePassword = 'A confirmação de senha não corresponde';
      document.getElementById('alert-password').style.display = 'block';
      this.statusPassword = false;
      this.borderColor('confirm-password', this.colorDanger);
    }
  }

  /**
  *  Method responsible for verify if the user name
  *  is in  accordance with standart format.
  */
  isUsernameValid(username) {
    this.assert.ok(username === '' || username === undefined, 'Nome de usuário vazio ou indefinido');
    const format = /^[a-zA-Z0-9]+$/;
    if (format.test(username)) {
      return true;
    }else{
      return false;
    }
  }

   /**
  *  Method responsible for verify if the user name
  *  is in  accordance with standart length.
  */
  isUsernameSizeValid(username) {
    this.assert.ok(username === '' || username === undefined, 'O nome de usuário inserido é inválido');
    if (username.length > 3 && username.length < 21) {
      return true;
    }else {
      return false;
    }
  }

   /**
  *  Method responsible for verify if the user email
  *  is in  accordance with standart format regex for emails.
  */
  isEmailValid(email) {
    this.assert.ok(email === '', 'O e-mail inserido está vazio');
    // tslint:disable-next-line:max-line-length
    const EMAILRGX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (EMAILRGX.test(email)) {
      return true;
    } else {
      return false;
    }
  }

   /**
  *  Method responsible for verify if the password and
  *  password confirmation match.
  */
  isConfirmedPassword(password, confPassword) {
    this.assert(password === '', 'A senha inserida está vazia');
    this.assert(confPassword === '', 'A senha inserida está vazia');

    if (password === confPassword) {
      return true;
    }else {
      return false;
    }
  }

  /**
  *  Method responsible for verify if the user password
  *  is in  accordance with standart length.
  */
  isPasswordValid(password) {
    this.assert(password === '', 'A senha inserida está vazia');
    if (password.length > 5 && password.length < 50) {
      return true;
    }else {
      return false;
    }
  }

  /**
  *  Method responsible for showing to the user
  *  the error in the field, when the response status
  *  500 or 400.
  */
 handleError(error: any) { 
  const httpErrorCode = error.status;
  switch (httpErrorCode) {
    case 500:
      this.showErrorAlert()
      this.valueErrorHandler = 'Error interno, tente novamente mais tarde';
    break;

  case 400:
    this.showErrorAlert();
    this.valueErrorHandler = 'Nome de usuário já existente';
  break;

  default:
    this.showError(InputValidatorService.REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE);
  }
}

/**
 * Shows an error alert message.
 */
  showErrorAlert(){ //T36 e T11
    document.getElementById('alert-invalid').style.display = 'block'; 
  }

  private showError(message: string) { 
    this.toastManager.error(message, InputValidatorService.DEFAULT_ERROR_TITLE, { dismiss: 'controlled'}).then((toast: Toast) => {
            const currentToastId: number = toast.id;
            this.toastManager.onClickToast().subscribe(clickedToast => {
                if (clickedToast.id === currentToastId) {
                    this.toastManager.dismissToast(toast);
                    window.location.reload();
                }
            });
    });
  }

  /**
  *  Method responsible for set border color according id
  */
  borderColor(id, color) {
    document.getElementById(id).style.borderColor = color;
  }

  /**
  *  Method responsible for active the register button
  * according status
  */
  clickReturnButton () {
    document.getElementById('firstPart').style.display = 'block';
    document.getElementById('secondPart').style.display = 'none';
    document.querySelector('#registerBtn').setAttribute('disabled', 'disabled');
  }
}
