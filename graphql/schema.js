// Import required  stuff from graphql
const {GraphQLSchema,GraphQLObjectType}=require("graphql");

// Import queries 

const {users}=require("./queries");



// Import Mutaions 
const {register,login}=require("./mutations");


// Define queryType
const QueryType=new GraphQLObjectType({
    name:"QueryType",
    description:"Queries",
    fields:{users}
});

// Define Mutations Type 
const MutationType=new GraphQLObjectType({
    name:"MutationType",
    description:"Mutations",
    fields:{register,login},
})

module.exports=new GraphQLSchema({
    query:QueryType,
    mutation:MutationType,
})