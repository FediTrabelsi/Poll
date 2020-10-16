import { Component, Input, OnInit } from '@angular/core';
import { PollServicesService } from '../services/polls/poll-services.service';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2/dist/sweetalert2.js'


@Component({
  selector: 'app-poll-card',
  templateUrl: './poll-card.component.html',
  styleUrls: ['./poll-card.component.css']
})
export class PollCardComponent implements OnInit {
  @Input() poll;
  @Input() mine;
  yes : number;
  no : number;
  voted ;
  deleted;
  constructor(private pollService : PollServicesService,) { }

  ngOnInit() {
    
    this.voted = this.checkIfVoted()
    if(this.poll.options[0].votes!==0 || this.poll.options[1].votes!==0){
    this.yes=this.poll.options[0].votes/(this.poll.options[0].votes+this.poll.options[1].votes)*100
    this.no=this.poll.options[1].votes/(this.poll.options[0].votes+this.poll.options[1].votes)*100
    }else{
      this.no=0;
      this.yes=0;
    }
  }

  checkIfVoted(){
    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token);
    const id = decoded.id;
    var bool = false;
    this.poll.voted.map(vote=>{
      
      if (vote===id){
        bool=true
      
      }
   
      
    });
    return bool
  }
  vote(answer){
    this.pollService.vote(this.poll._id,answer).subscribe(data =>{
       
      this.voted=true
      if(answer==='YES'){
        this.yes=(this.poll.options[0].votes+1)/(this.poll.options[0].votes+this.poll.options[1].votes+1)*100
        this.no=(this.poll.options[1].votes)/(this.poll.options[0].votes+this.poll.options[1].votes+1)*100
      }else{
        this.no=(this.poll.options[1].votes+1)/(this.poll.options[0].votes+this.poll.options[1].votes+1)*100
        this.yes=(this.poll.options[0].votes)/(this.poll.options[0].votes+this.poll.options[1].votes+1)*100
      }
    
   });
   

  }


  delete(){

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this poll!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.pollService.delete(this.poll._id).subscribe(data =>{
          this.deleted=true;
          Swal.fire(
            'Deleted!',
            'Your poll has been deleted.',
            'success'
          )
            this.ngOnInit()
    
     
          
           
       });
     

      } else if (result.dismiss === Swal.DismissReason.cancel) {
       
        Swal.fire(
          'Cancelled',
          'Delete operation was cancelled',
          'error'
        )
      }
    })

 
  }

}
