import { PollsService } from './../polls/polls.service';
import { User } from './../../schemas/user.interface';
import { CreateUserDto } from './../../dto/create-user-dto';
import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(userInterface: User) {
    
      const user = await this.findOneByUsername(userInterface.username)
      console.log(user)
      if(user) return {success : false , message : 'username already exists !'}
      if(userInterface.password!==userInterface.passwordConf) return {success : false , message : 'passwords dont match !'}
  
      let createdUser = new this.userModel({
        username : userInterface.username,
        password : userInterface.password,
        role : userInterface.role?userInterface.role:'simple'
      });
      
      const created= await createdUser.save();
      return {success : true, user : created }
  

  }

  async findOneByUsername(username): Model<User> {

    return await this.userModel.findOne({username: username});

  }

  async findOneByID(id): Model<User> {

    return await this.userModel.findOne({_id : id});

  }

  async findAll(): Model<User> {

    return await this.userModel.find();

  }

  async deleteUser(userID): Promise<any> {
   // console.log(userID)
    const deleteUser = await this.userModel.findByIdAndRemove(userID.toString());
    console.log(deleteUser)
    return deleteUser;
}

  async deleteUserPoll(userID,pollID){
    return await this.userModel.findOneAndUpdate({_id : userID},{ $pull: { 'polls': pollID } })

  }


}