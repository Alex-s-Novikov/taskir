const usersMock = require('../mock/users.json')
const Users = require('../models/user')



module.exports = async () => {
    const users = await Users.find()
    if (users.length !==  usersMock.length){
        createInitialEntity(Users, usersMock)
    }
}

async function createInitialEntity(Model, data){
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
try {
delete item._id
const newItem = new Model(item)
const res = await newItem.save()
return newItem
} catch(e) {
    console.error(e)
return e
}
        })
    )
}