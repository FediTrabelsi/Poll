import { Vote } from './../../schemas/vote.interface';
import { Poll } from './../../schemas/poll.interface';
import { PollsService } from './../../services/polls/polls.service';
import { Controller, Param, Res, UseGuards, Post, Get, Body, Delete, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken'
@Controller('polls')
export class PollsController { constructor(private pollsService: PollsService) {

}

@Post()
@UseGuards(AuthGuard())
async create(@Req() req, @Body() PollInterface: Poll) {
    let id = this.getIDFromHeader(req.headers)
    return await this.pollsService.create(PollInterface,id)
    
    
} 

@Get()
@UseGuards(AuthGuard())
async fetchOthersPolls(@Req() req) {
    let id = this.getIDFromHeader(req.headers)
    return await this.pollsService.findOthersPolls(id);
}

@Get('my')
@UseGuards(AuthGuard())
async fetchPolls(@Req() req) {
    let id = this.getIDFromHeader(req.headers)
    return await this.pollsService.findMyPolls(id);
}



@Delete(':pollId')
@UseGuards(AuthGuard())
async deletePoll(@Res() res, @Param('pollId') pollId) {
    const poll = await this.pollsService.deletePoll(pollId);
    if (poll) {
        
        return res.json({success :true, message : 'poll was Deleted',  poll})
    }
    else return res.json({success :false, message : 'There is no poll with that id'})
}

@Post('vote/:pollId')
@UseGuards(AuthGuard())
async Vote(@Req() req, @Param('pollId') pollId,  @Body() VoteInterface : Vote) {
    let id = this.getIDFromHeader(req.headers)

    return await this.pollsService.vote(id,pollId,VoteInterface.answer);
    
}

getIDFromHeader(header){
    var id;
    const token =header.authorization.split(" ")[1]
     jwt.verify(token,'thisismykickasssecretthatiwilltotallychangelater',function(err,decoded){
        if(err){
            return {success : false, message : 'token no longer assined to this user'}
        }
        id = decoded.id
    })
    return id;
}

}
