// Import required  stuff from graphql
const {GraphQLSchema,GraphQLObjectType}=require("graphql");

// Import queries 

const {}=require("./queries");



// Import Mutaions 
const {}=require("./mutation");


// Define queryType
const QueryType=new GraphQLObjectType({
    name:"QueryTpe",
    description:"Queries",
    fields:{}
});

// Define Mutations Type 
const MutationType=new GraphQLObjectType({
    name:"MutationType",
    description:"Mutations",
    fields:{},
})

module.exports=new GraphQLSchema({
    query:QueryType,
    mutation:MutationType,
})