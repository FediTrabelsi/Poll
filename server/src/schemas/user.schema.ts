import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    limit :{
        pollPerHour : { type : Number, default : 0},
        nextAvailableDate : {type : Date, default: new Date()}
    },
    username: {
        type: String,
        required: true,
        unique: true,
      },
      role : {type: String,enum:["admin","simple"],default:"simple"},
      password: {
        type: String,
        required: true,
        unique: true,
      },
      created: {
        type: Date,
        default: Date.now,
      },
      polls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }],
});

UserSchema.pre('save', function(next){

    let user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {

        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {

            if(err) return next(err);
            user.password = hash;
            next();

        });

    });

}); 

UserSchema.methods.checkPassword = function(attempt, callback){

    let user = this;

    bcrypt.compare(attempt, user.password, (err, isMatch) => {
        if(err) return callback(err);
        callback(null, isMatch);
    });

};