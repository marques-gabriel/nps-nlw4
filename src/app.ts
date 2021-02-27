import 'reflect-metadata' // importante vir antes
import express, { Request, Response, NextFunction } from 'express'
import "express-async-errors"
import  createConnection from "./database"
import { router } from "./routes"
import { AppError } from './errors/AppError'
import handlebars from 'express-handlebars'

createConnection()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)

app.engine('handlebars', handlebars({defaultLayout: null}))
app.set('view engine', 'handlebars')

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`
    })
})

export { app }