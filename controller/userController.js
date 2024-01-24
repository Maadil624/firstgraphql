const userModels = require('../dbmodels/userModels.js')
const bcrypt = require('bcrypt')
export default async function userController(req, res) {
    try {
        const { name, email, password } = req.body
        if (!name) {
            return res.status(400).send({ sucess: false, message: "please provide the name" })
        }
        if (!password) {
            return res.status(400).send({ sucess: false, message: "please provide the password" })
        }
        if (!email) {
            return res.status(400).send({ sucess: false, message: "please provide the e-mail" })
        }
        const extuser = await userModels.findOne({ email })
        if (extuser) {
            return res.status(200).send({
                sucess: true,
                message: "email is already there"
            })
        }
        const newuser = {
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 10)
        }
        console.log('newuser', newuser)
        const user = await userModels.create(newuser)
        res.status(200).send({
            sucess: true,
            message: "user created sucessfully.....",
            user
        })
    } catch (err) {
        res.status(400).send({
            sucess: false,
            err,
            message: "user control error"
        })
    }
}