import Swal from 'sweetalert2/dist/sweetalert2.js'
import { UsersService } from './../services/users.service';
import { User } from './user.interface';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  public displayedColumns = ['username', 'role', 'polls', 'created', 'details', 'update', 'delete']
  
  dataSource = new MatTableDataSource<User>()
  constructor(private userService : UsersService) { }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(res => {
      console.log(res)
      this.dataSource.data = res as User[];
    })
    console.log(this.dataSource.data)
 //   console.log(this.dataSource)
  }


  
  delete(id){

    Swal.fire({
      title: 'Are you sure?',
      text: 'Deleting a user is permanent!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.userService.delete(id).subscribe(data =>{
          
          Swal.fire(
            'Deleted!',
            'the user has been deleted.',
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
