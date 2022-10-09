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
        return token;
    }
}


const login={
    type:GraphQLString,
    args:{
        email:{type:GraphQLString},
        password:{type:GraphQLString},
    },
    async resolve(parent,args){
         
        const user=await User.findOne({email:args.email}).select("+password");
        // console.log(user,args.password,user.password)
        if(!user ||args.password !==user.password){
            throw new Error("Invalid credentials");
        }
        const token=createJwtToken(user);
        return token;
    }
}

module.exports={register,login};