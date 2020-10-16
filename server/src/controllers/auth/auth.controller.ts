import { CreateUserDto } from './../../dto/create-user-dto';
import { AuthService } from './../../services/auth/auth.service';
import { Controller, Body, Post, Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post() 
    async login( @Body() loginUserDto: CreateUserDto){
        return await this.authService.validateUserByPassword(loginUserDto);
        
        
    }

}