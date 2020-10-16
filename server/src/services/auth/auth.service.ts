import { JwtPayload } from './../../schemas/jwt.payload.interface';
import { CreateUserDto } from './../../dto/create-user-dto';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService){

    }

    async validateUserByPassword(loginAttempt: CreateUserDto) {

        // This will be used for the initial login
        let userToAttempt = await this.usersService.findOneByUsername(loginAttempt.username);
        if (!userToAttempt) return this.err('username does not exist')
        return new Promise((resolve) => {

            // Check the supplied password against the hash stored for this email address
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
    
                if(err) throw new UnauthorizedException();
    
                if(isMatch){
                    // If there is a successful match, generate a JWT for the user
                    resolve(this.createJwtPayload(userToAttempt));
    
                } else {
                    resolve(this.err("wrong password"));
                }
    
            });

        });

    }

    async validateUserByJwt(payload: JwtPayload) { 

        // This will be used when the user has already logged in and has a JWT
        let user = await this.usersService.findOneByUsername(payload.username);

        if(user){
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(user){

        let data: JwtPayload = {
            username: user.username,
            id : user._id,
            role : user.role

        };

        let jwt = this.jwtService.sign(data);

        return {success : true, token : jwt}            
       

    }

    err(message){

        let data={
            success : false ,
            message : message
        }

        return data            
       

    }
}