import { AuthService } from './../services/auth/auth.service';
import { JwtPayload } from './../schemas/jwt.payload.interface';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService){

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'thisismykickasssecretthatiwilltotallychangelater'
        });

    }

    async validate(payload: JwtPayload){

        const user = await this.authService.validateUserByJwt(payload);

        if(!user){
            throw new UnauthorizedException();
        }

        return user;

    }

}