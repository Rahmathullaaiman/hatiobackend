
require('dotenv').config() 

const express = require('express')

const cors = require('cors')

const router = require('./ROUTES/router')

require('./DATABASE/connection')
const mernserver = express()

mernserver.use(cors())

mernserver.use(express.json())


mernserver.use(router)


//mernserver.use('/uploads',express.static('./uploads'))

const PORT = 10000 || process.env

mernserver.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

