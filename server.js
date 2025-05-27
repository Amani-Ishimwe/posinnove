const express = require('express')
const morgan = require('morgan')
const debug =  require('debug')('app:server')
const config = require('config')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')  
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger/swagger.json') 
const events = require('events');
events.EventEmitter.defaultMaxListeners = 20; // Increase from default 10


const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use('/api/users', userRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


const startServer = async ()=>{
    try{
        await connectDB()
        const server = app.listen(process.env.PORT || config.get('port'),()=>{
            debug(`Server is running on port ${config.get('port')}`)
        })
        return server
    }catch(error){
        debug('Server startup error: ',error)
        process.exit(1)
    }
}
startServer();

module.exports = app //for testing purposes

