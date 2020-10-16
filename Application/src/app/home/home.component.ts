import { PollServicesService } from './../services/polls/poll-services.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private activatedRoute : ActivatedRoute;
  
  private formSubmitAttempt: boolean; 
  form: FormGroup;         
  myPolls : []          

  constructor(
  private  pollService : PollServicesService,
  private fb: FormBuilder, 
   
  ) {}

  ngOnInit() {
   
    this.form = this.fb.group({   
      question: ['', Validators.required],
    
    });

   this.pollService.getMyPolls().subscribe(data =>{
    console.log(data)
    this.myPolls = data['polls'];
  
    
});
;
  }

  isFieldInvalid(field: string) { 
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }
  onSubmit() {
    if (this.form.valid) {
    this.pollService.createPoll(this.form.value).subscribe(data =>{
      if(data['success']){
        this.ngOnInit()
      }else{
        Swal.fire(
          'Limit reached',
          data['message'],
          'error'
        )
      }
      console.log(data)
  });

}
    this.formSubmitAttempt = true;             
  }


}