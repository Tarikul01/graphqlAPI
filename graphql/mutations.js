const {}=require("./types");
const {User}=require("../model");

const {GraphQLString}=require("graphql");

const { createJwtToken}=require("../util/auth");

const register={
    type:GraphQLString,
    args:{
        username:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString},
        displayName:{type:GraphQLString},
    },
    async resolve(parent,args){
        const {username,email,password,displayName}=args
        const user=new User({username,email,password,displayName})

        await user.save();
        const token=createJwtToken(user)
        return JSON.stringify(token);
    }
}

module.exports={register};