// Import required  stuff from graphql
const {GraphQLSchema,GraphQLObjectType}=require("graphql");

// Import queries 

const {}=require("./queries");



// Import Mutaions 
const {register}=require("./mutations");


// Define queryType
const QueryType=new GraphQLObjectType({
    name:"QueryType",
    description:"Queries",
    fields:{}
});

// Define Mutations Type 
const MutationType=new GraphQLObjectType({
    name:"MutationType",
    description:"Mutations",
    fields:{register},
})

module.exports=new GraphQLSchema({
    query:QueryType,
    mutation:MutationType,
})