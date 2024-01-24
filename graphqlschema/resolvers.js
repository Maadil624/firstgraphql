const { UserList } = require('../dummydata.js')
const _ = require("lodash");
const { userLoginModel, getuserModel, addUserModel } = require('../dbmodels/userModels.js');
const { rejisterController, loginController } = require('../controller/loginController.js');

const responce = async (status, message, data) => {
    // console.log("data at res", data)
    return {
        success: status,
        message,
        data
    };
}

const resolvers = {
    Query: {
        users: async () => {
            let response = await getuserModel.find()
            if (response) {
                // console.log("resolvers", responce(true, "Fecthed All User Details successfull!", response))
                return responce(true, "Fecthed All User Details successfull!", response)
            } else {
                return responce(false, "Error while Fetching!")
            }
        },
        user: async (parent, args) => {
            let response = await getuserModel.findOne({ email: args.email })
            // console.log("responce at user",responce)
            if (response) {
                return responce(true, "Fecthed All User Details successfull!", response)
            } else {
                return responce(false, "Error while Fetching!")
            }
        }
    },
    Mutation: {
        registerUser: async (parent, args) => {
            // console.log('args at reg resol', args)
            let response = await rejisterController(parent, args);
            // console.log("responce at reg resol", response)
            if (response.sucess) {
                let data = (response.extuser) ? response.extuser : response.user || "Error"
                return responce(true, response.message, data)
            } else {
                let message = response.message || "Error at registration"
                return responce(false, message)
            }
            // console.log("reg responce at resolver", response)
        },
        loginUser: async (parent, args) => {
            let response = await loginController(parent, args);
            console.log(response)
            if (response.sucess) {
                let data = response.userDetails ?? ""
                return responce(true, response.message, data)
            } else {
                return responce(false, response.message)
            }
            // console.log("login responce at resolver", response)
        },
        addUser: async (parent, args) => {
            const data = args.input
            const userdata = await addUserModel.create(data)
            if (userdata) {
                return responce(true, "User added successfully!", userdata)
            } else {
                return responce(false, "Error while adding user!")
            }
        },
        updateUser: async (parent, args) => {
            const data = args.input
            const userdata = await getuserModel.findOneAndUpdate({ email: data.email }, { $set: data }, { new: true, upsert: true })
            if (userdata) {
                return responce(true, "updated successfull!", userdata)
            } else {
                return responce(false, "Error while Updation!")
            }
        },
        deleteUser: async (parent, args) => {
            const data = args.input
            // console.log(data)
            // console.log(nm)
            const userdata = await getuserModel.findOneAndDelete({ email: data.email })
            // console.log(userdata)
            if (userdata) {
                return responce(true, "User deleted successfull!", userdata)
            } else {
                return responce(false, "Error while deleting!")
            }
        }
    }
}

module.exports = { resolvers }