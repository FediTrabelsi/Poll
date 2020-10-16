import { UsersService } from './../../services/users/users.service';
import { PollSchema } from './../../schemas/poll.schema';
import { PassportModule } from '@nestjs/passport';
import { PollsController } from './../../controllers/polls/polls.controller';
import { PollsService } from './../../services/polls/polls.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
      MongooseModule.forFeature([{name: 'Poll', schema: PollSchema}]),
      PassportModule.register({ defaultStrategy: 'jwt', session: false }),
      PollsModule, UsersModule
    ],
    exports: [PollsService],
    controllers: [PollsController],
    providers: [PollsService]
  })
  export class PollsModule {}