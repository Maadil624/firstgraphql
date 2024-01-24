const { gql } = require('apollo-server')
const typeDefs = gql`
type User{
    id:ID
    name:String
    age:Int
    email:String
    dep:String
    loc:String
    password:String
    token:String
}
type responce {
  success: Boolean!
  message: String!
  data: [User]
}

type Authresponse{
    success: Boolean
    message: String
    token: String
    data:User
}
input addUserType{
    name:String
    age:Int
    email:String
    dep:String
    loc:String
}
input regUserType{
    name:String
    email:String
    password:String
}
input updateUserType{
    id:Int
    name:String
    age:Int
    email:String!
    dep:String
    loc:String
}
input deleteUserType{
    id:Int
    email:String!
    message:String
    success:Boolean
}
type Mutation{
    addUser(input:addUserType):responce
    updateUser(input:updateUserType):User
    deleteUser(input:deleteUserType):User
    registerUser(input:regUserType):Authresponse
    loginUser(email: String!, password: String!):Authresponse
}
type Query{
    users:responce
    user(email:String):responce
}
`

module.exports = { typeDefs }