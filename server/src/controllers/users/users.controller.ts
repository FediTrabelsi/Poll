import { User } from './../../schemas/user.interface';
import { CreateUserDto } from './../../dto/create-user-dto';
import { UsersService } from './../../services/users/users.service';
import { Controller, Get, Post, Body, UseGuards, Req, Delete, Res, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {

    }

    @Post() 
    async create( @Body() userInterface: User) {
        return await  this.usersService.create(userInterface);
      
    }


    @Get()
    @UseGuards(AuthGuard())
    async fetchUsers(@Req() req) {
        
        return await this.usersService.findAll();
    }

    
    @Delete(':userId')
    @UseGuards(AuthGuard())
    async deleteUser(@Res() res, @Param('userId') userId) {
        
     //   console.log(userId)
        const user = await this.usersService.deleteUser(userId);
       if (user) return res.json({success :true, message : 'user Deleted', user : user})
       else return res.json({success :false, message : 'There is no user with that id'})
    }

   

}