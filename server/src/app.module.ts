import { PollsModule } from './modules/polls/polls.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PollsController } from './controllers/polls/polls.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/pollsDatabase'),
    UsersModule,
    AuthModule,
    PollsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
