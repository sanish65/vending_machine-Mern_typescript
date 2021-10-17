import { Document } from 'mongoose'

export interface IDrinks extends Document {
    _id : object,
    fund : number,
    income : number,
    coke : number,
    pepsi : number,
    dew    : number,
}