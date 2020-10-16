import { PollsModule } from './../polls/polls.module';
import { UserSchema } from './../../schemas/user.schema';
import { UsersController } from './../../controllers/users/users.controller';
import { UsersService } from './../../services/users/users.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
      MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
      PassportModule.register({ defaultStrategy: 'jwt', session: false }),
      UsersModule
    ],
    exports: [UsersService],
    controllers: [UsersController],
    providers: [UsersService]
  })
  export class UsersModule {}