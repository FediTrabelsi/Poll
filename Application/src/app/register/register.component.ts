import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
      password: ['', Validators.required],
      passwordConf: ['', Validators.required],
      role : ['',Validators.required]
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

    
      
      this.authService.RegisterUser(this.form.value).subscribe(data =>{
        console.log(data)
        if(data['success']){
          Swal.fire('Account created', "you can login now", 'success').then((result) => {
            if (result.value) {
            
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              setTimeout(()=>{
                this._router.navigate(['login']);
      
              },500);
            }
          })
        }else{
          Swal.fire('Validation error', data['message'], 'error')
        }
        
     
    });
    }
    this.formSubmitAttempt = true;             
  }

  login(){
    this._router.navigate(['login']);
}
}