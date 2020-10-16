import { User } from './../../schemas/user.interface';
import { UsersService } from './../users/users.service';
import { Poll } from './../../schemas/poll.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class PollsService {

  constructor(@InjectModel('Poll')  private pollModel: Model<Poll> , private usersService: UsersService ) {}

  checlPollLimit(limit){
    if(limit.pollPerHour<3){ return 1} //still can post a poll
    else{
      let currentDate = new Date();
      let diff=(currentDate.getTime() -limit.nextAvailableDate.getTime())/1000/60/60
     if(diff < 1){
       console.log((currentDate.getTime() -limit.nextAvailableDate.getTime())/1000/60/60)
      return 2  //reached 3 polls and one hour did not expire
     }else
     return 3  //reset limit because an hour expired
    }
  }

  async create(pollInterface: Poll, id) {
    const user = await this.usersService.findOneByID(id);
  
    if(!user) return {success : false , message : 'token no longer assigned to this user'}
    else{
      const limit= this.checlPollLimit(user.limit);
      console.log(limit)
      if(limit===2){
        return {success : false , message : 'You reached a limit of 3 polls/hour try again later'}
      }else{

        const options = ["YES", "No"]
        let createdPoll = new this.pollModel({
          question : pollInterface.question,
          options : options.map(option =>({option , votes : 0})),
          user 
        });
        
        const poll = await createdPoll.save();
        if(poll){
          if(limit===3){
            user.limit.pollPerHour=1 
            var nextDate= new Date();
            nextDate.setHours( nextDate.getHours() + 1 )
            user.limit.nextAvailableDate=nextDate
          }
           user.limit.pollPerHour=user.limit.pollPerHour+1;
          
          user.polls.push(poll._id)
          await user.save()
        return {success : true , 
          message : 'poll created',
          poll : { ...poll._doc,user : user._id}}

        }
        else return {success : false , message : 'an error occured while creating the poll poll created'}
      }
        
      }
     
  

  }

  async findOneById(): Model<Poll> {

   

  }

  async findAll(): Model<Poll> {
    
    const polls = await this.pollModel.find().populate('user',['username','id']);
    return {polls : polls}

  }

  async findOthersPolls(id): Model<Poll> {
    const polls=  await this.pollModel.find({user : {$ne : id}}).populate('user',['username','id']);
    const filtered = []
   
    return {success : true, polls : polls}
  }

  async findMyPolls(id) : Model<Poll>{
    const polls=  await this.pollModel.find({user : id}).populate('user',['username','id']);
    
    return {success : true, polls : polls}
  }

  async deletePoll(pollID): Promise<any> {
   // console.log(userID)
    const deletePoll = await this.pollModel.findByIdAndRemove(pollID);
    if(deletePoll){
     await  this.usersService.deleteUserPoll(deletePoll.user, pollID)
      return deletePoll;
    }

  
    
}

  async vote(userID,pollID,answer){
    
    if(answer){
        const poll = await this.pollModel.findById(pollID);
        if(!poll) throw new Error('No poll found');
        const vote = poll.options.map( option => {
            if(option.option === answer){
                return {option : option.option, _id: option._id, votes : option.votes + 1}
            }else{ 
                return option
            }
        });

        if(poll.voted.filter(user => user.toString()===userID).length <=0){
            poll.voted.push(userID)
             poll.options = vote ;
            await (await poll).save()
            return {success : true, poll}
        }else{
          return ({success : false, message : "you already voted"})
        }
    }else{
      return ({success : false, message : "no answer provided"})
    }
  }
}