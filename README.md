# Graphql api

In this project i will create some **BLOG SITE** **_api_** for frontend using expressjs,mongodb and graphql step by step.

 ## 🚀 About Me
### Md. Tarikul
I'm a full stack **MERN** developer and problem solver.
- ***E-mail*** : tarikul.cse5.bu@gmail.com
- ***contact*** : +88017887935026
- [@Linkedin](https://www.linkedin.com/in/tarikul-islam-2100841ab/)
- [@Facebook](https://www.facebook.com/tarikulcse001)

## Installation

Install Graphql api with npm

```bash
npm install graphql
cd graphql
npm i express express-graphql graphql nodemon mongoose jsonwebtoken dotenv
```
## Usage

```bash
const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();

app.get("/",(req,res)=>{
    res.json({msg:"Hello graphql"});
});


app.listen(process.env.PORT,()=>{
    console.log(`App running on port http://localhost:${process.env.PORT}/`);
})

```

### Database connection
- create db folder then create connectionDb function then import inside server.js file
 

 ### Create graphqlHTTP playground use this middleware
```bash
app.use("/graphql",graphqlHTTP({
    schema:schema,
    graphiql:true,
}));
```
 ### Declared all Graphql Types then exports
```bash
const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLID,
	GraphQLString,
} = require('graphql');

const { User,Post,Comment } = require('../model');

const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'User Type',
	fields: () => ({
		id: { type: GraphQLID },
		username: { type: GraphQLString },
		email: { type: GraphQLString },
		displayName: { type: GraphQLString },
	}),
});
const PostType = new GraphQLObjectType({
	name: 'Post',
	description: 'Post Type',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		body: { type: GraphQLString },
		author: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.authorId);
			},
		},
		comments: {
			type: GraphQLList(CommentType),
			resolve(parent, args) {
				return Comment.find({postId:parent.id});
			},
		},
	}),
});

const CommentType = new GraphQLObjectType({
	name: 'Comment',
	description: 'Comment type',
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, arg) {
				return User.findById(parent.userId);
			},
		},
		post: {
			type: PostType,
			resolve(parent, arg) {
				return Post.findById(parent.postId);
			},
		},
	}),
});
module.exports = {
	UserType,
	PostType,
	CommentType,
};

```

 ### Create JsonWebToken for authentications inside  utils folder
```bash
const jwt=require('jsonwebtoken');


const createJwtToken=(user)=>{
    return jwt.sign(user,"123454",{expiresIn:"30 days"})
};
module.exports={createJwtToken};
```
 ### After Create Jsonwebtoken then  careate verify middleware use this token for authenticate users.
```bash
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1] || '';
	try {
		const verified=jwt.verify(token,process.env.JWT_SECRET);
		 req.verifiedUser=verified;
		// console.log(token);
		 console.log("Verifications Sucees",verified);
		next();
	} catch (error) {
		console.log('Veriefied Failed!');
		next();
	}
};

module.exports = { authenticate };
```

 ### Create register mutations
```bash
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
```



