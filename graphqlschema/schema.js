const graphql = require('graphql');
const _ = require("lodash");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

const employees = [
    { id: "1", name: 'John Doe', dep: 'HR' },
    { id: "2", name: 'Jane Smith', dep: 'Marketing' },
    { id: "3", name: 'Bob Johnson', dep: 'Engineering' },
    { id: "4", name: 'Alice Williams', dep: 'Finance' },
    { id: "5", name: 'Charlie Brown', dep: 'Sales' },
    { id: "6", name: 'Diana Lee', dep: 'IT' },
    { id: "7", name: 'Eddie Garcia', dep: 'Customer Support' },
    { id: "8", name: 'Fiona Turner', dep: 'Research and Development' },
    { id: "9", name: 'George Miller', dep: 'Legal' },
    { id: "10", name: 'Helen Davis', dep: 'Operations' }
];

const employees_address = [
    { id: "1", address: 'hyderabad' },
    { id: "2", address: 'hyderabad' },
    { id: "3", address: 'banglore' },
    { id: "4", address: 'mumbai' },
    { id: "5", address: 'chennai' },
    { id: "6", address: 'vizag' },
    { id: "7", address: 'goa' },
    { id: "8", address: 'vizag' },
    { id: "9", address: 'tirupati' },
    { id: "10", address: 'hyderabad' }
];

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        dep: { type: GraphQLString },
        address: {
            type: UserAddType,
            resolve(parent, args) {
                console.log("user ", _.find(employees_address, { id: parent.id }))
                return _.find(employees_address, { id: parent.id })
            }
        }
    })
})

const UserAddType = new GraphQLObjectType({
    name: 'Address',
    fields: () => ({
        id: { type: GraphQLID },
        address: { type: GraphQLString },
        user: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                console.log("Address", parent, args)
                return _.filter(employees, { id: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log('RootQuery user', parent, args);
                return _.find(employees, { id: args.id })
            }
        },
        address: {
            type: UserAddType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log('RootQuery add', parent, args)
                return _.find(employees_address, { id: args.id })
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                console.log('users rootquery')
                return employees
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})