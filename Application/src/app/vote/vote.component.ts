import { PollServicesService } from './../services/polls/poll-services.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  private formSubmitAttempt: boolean; 
  form: FormGroup;         
  Polls : []       

  constructor(
    private  pollService : PollServicesService,
    private fb: FormBuilder, 
  ) { }

  ngOnInit() {
    this.pollService.getPolls().subscribe(data =>{
      this.Polls = data['polls'];
      console.log(this.Polls)
  
  });
  }

}
