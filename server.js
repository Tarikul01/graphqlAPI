const express=require('express');
const dotenv=require('dotenv');
const {connectDB}=require('./db');
const {graphqlHTTP}=require("express-graphql");
const schema=require("./graphql/schema");

const app=express();
dotenv.config();
connectDB();



app.get("/",(req,res)=>{
    res.json({msg:"Hello graphql"});
});
app.get("/graphql",graphqlHTTP({
    schema:schema,
    graphiql:true,
}));



app.listen(process.env.PORT,()=>{
    console.log(`App running on port http://localhost:${process.env.PORT}/`);
})