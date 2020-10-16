import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageClass;
  message;
  loginstatus : string;
  processing = false;
  form: FormGroup;                   
  private formSubmitAttempt: boolean; 

  constructor(
    private _router: Router,
    private authService: AuthService,
    private fb: FormBuilder,        
   
  ) {}

  ngOnInit() {
    
    this.form = this.fb.group({   
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { 
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.authService.AuthentificateUser(this.form.value).subscribe(data =>{
       
       if(data['success']){
        this.authService.nextTrue()
    
        localStorage.setItem('token',data['token'] )
        setTimeout(()=>{
          this._router.navigate(['home']);

        },500);
      
       }else{
        Swal.fire('Validation error', data['message'], 'error')
       }
        console.log(data)
    });

     
      
    }
    this.formSubmitAttempt = true;             
  }

  register(){
    this._router.navigate(['register']);
}
}
