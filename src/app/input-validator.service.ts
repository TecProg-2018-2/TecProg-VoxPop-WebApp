import { Injectable, NgModule } from '@angular/core';

@Injectable()

@NgModule({
  imports: [],
  declarations: [],
  exports: []
})

export class InputValidatorService {

  valueErrorHandler: string = '';
  valuePassword: string = '';
  valueInvalidPassword: string = '';
  valueUsername: string = '';
  valueEmail: string = '';
  valueInvalidInput: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  statusPassword: boolean = false;
  statusValidPassword: boolean = false;
  statusUsername: boolean = false;
  statusEmail: boolean = false;
  colorDanger: string = '#d9534f';
  colorSucess: string = '#5cb85c';

  errorHandler(status: number) {
    if (status === 500) {
      document.getElementById('alert-invalid').style.display = 'block';
      this.valueErrorHandler = 'Error interno, tente novamente mais tarde';
    } else if (status === 400) {
      document.getElementById('alert-invalid').style.display = 'block';
      this.valueErrorHandler = 'Nome de usuário já existente';
    }
  }

  onKeyPassword(eventPassword: any) {
    this.password = eventPassword.target.value;
    
    const validPassword = this.isPasswordValid(this.password);

    if (!validPassword) {
      this.valueInvalidPassword = 'Sua senha deve ter no mínimo 6 caracteres';
      document.getElementById('alert-invalid-password').style.display = 'block';
      this.statusValidPassword = false;
      this.borderColor('password', this.colorDanger);
    } else {
      document.getElementById('alert-invalid-password').style.display = 'none';
      this.statusValidPassword = true;
      this.borderColor('password', this.colorSucess);
    }
  }
  
  onKeyConfirmPassword(eventPassword: any) {
    this.confirmPassword = eventPassword.target.value;
  }
  
  onKeyUsername(eventUsername: any) {
    let username = eventUsername.target.value;

    const validUsername = this.isUsernameValid(username);

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

  onKeyEmail(eventEmail: any) {
    let email = eventEmail.target.value;
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

  isUsernameValid(username) {
    const format = /^[a-zA-Z0-9]+$/;
    if (format.test(username)) {
      return true;
    }
    return false;
  }

  isUsernameSizeValid(username) {
    if (username.length > 3 && username.length < 21) {
      return true;
    }
    return false;
  }

  isEmailValid(email) {
    const EMAILRGX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (EMAILRGX.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  isConfirmedPassword(password, confPassword) {
    if (password === confPassword) {
      return true;
    }
    return false;
  }

  isPasswordValid(password) {
    if (password.length > 5 && password.length < 50) {
      return true;
    }
    return false;
  }

  validatorEditUser() {
    if (!this.statusUsername && !this.statusEmail) {
      document.getElementById('alert-invalid-inputs').style.display = 'block';
      this.valueInvalidInput = 'Por favor, preencha os campos obrigatórios';

      if (!this.statusUsername) {
        this.borderColor('username', this.colorDanger);
      } else {
        this.borderColor('username', this.colorSucess);
      }

      if (!this.statusEmail) {
        this.borderColor('email', this.colorDanger);
      } else {
        this.borderColor('email', this.colorSucess);
      }
    }
  }
  validatorRegisterUser() {
    if (this.statusPassword && this.statusUsername && this.statusEmail && this.statusValidPassword) {
      document.getElementById('firstPart').style.display = 'none';
      document.getElementById('secondPart').style.display = 'block';
      document.querySelector('#registerBtn').removeAttribute('disabled');
    } else {
      document.getElementById('alert-invalid-inputs').style.display = 'block';
      this.valueInvalidInput = 'Por favor, preencha os campos obrigatórios';
      if (!this.statusPassword) {
      this.borderColor('password', this.colorDanger);
      this.borderColor('confirm-password', this.colorDanger);
      } else {
        this.borderColor('password', this.colorSucess);
        this.borderColor('confirm-password', this.colorSucess);
      }

      if (!this.statusUsername) {
        this.borderColor('username', this.colorDanger);
      } else {
        this.borderColor('username', this.colorSucess);
      }

      if (!this.statusEmail) {
        this.borderColor('email', this.colorDanger);
      } else {
        this.borderColor('email', this.colorSucess);
      }
    }
 }

 borderColor(id, color) {
  document.getElementById(id).style.borderColor = color;
 }

 clickReturnButton () {
  document.getElementById('firstPart').style.display = 'block';
  document.getElementById('secondPart').style.display = 'none';
  document.querySelector('#registerBtn').setAttribute('disabled', 'disabled');
}


}
