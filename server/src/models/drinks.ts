import { IDrinks } from './../types/drinks';
import { model, Schema } from 'mongoose'

const drinksSchema: Schema = new Schema({

    fund : {
        type: Number,
        default : 1000,
    },

    income : {
        type: Number,
        default : 0,
    },

    coke : {
        type: Number,
        default : 100,
    },

    pepsi : {
        type: Number,
        default: 100,
    },
    dew : {
        type: Number,
        default: 100,
    }
}, { timestamps: true })


export default model<IDrinks>('Drinks', drinksSchema)