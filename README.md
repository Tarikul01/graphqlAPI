# Graphql api

In this project i will create some api for frontend using expressjs,mongodb and graphql step by step.

 ## 🚀 About Me
### Md. Tarikul
I'm a full stack [MERN]() developer and problem solver.
- E-mail: tarikul.cse5.bu@gmail.com
- contact: 017887935026
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