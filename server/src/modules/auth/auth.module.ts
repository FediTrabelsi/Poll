import { AuthService } from './../../services/auth/auth.service';
import { AuthController } from './../../controllers/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from 'src/strategies/jwt.stategy';

@Module({
    imports: [
      PassportModule.register({ defaultStrategy: 'jwt', session: false }),
      JwtModule.register({
        secretOrPrivateKey: 'thisismykickasssecretthatiwilltotallychangelater',
        signOptions: {
          expiresIn: 3600
        }
      }),
      UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
  })
  export class AuthModule {}