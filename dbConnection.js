const sequelize = require("./config/sequelize")

function connnectToDb() {
    sequelize.authenticate()
        .then((result) => {
            console.log(`Database Connected Succesfully!!`)
            sequelize.sync()
        })
        .catch((err) => {
            console.log(`Error Occured while connecting to db`)
            console.log(err)
        })
}

module.exports = { connnectToDb, sequelize }
