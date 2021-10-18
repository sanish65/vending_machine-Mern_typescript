import express, { Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { drinksRoutes , todoRoutes }  from './routes/index'
import bodyParser from 'body-parser'

const app: Express = express();

app.use(bodyParser.json());


const PORT: string | number = process.env.PORT || 4000

app.use(cors())

app.use('/drinks', drinksRoutes);

const uri: string = 'mongodb://localhost:27017/OutSideTechsolutions';
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set('useFindAndModify', false)

mongoose
    .connect(uri, options)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error
    })
