require('dotenv').config();
const app = require("./app/app");
const { sequelize } = require('./models/index')

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    
    sequelize.sync({ force: false }).then(()=>{
        console.log(`Connection has been established successfully`)
    })
})
