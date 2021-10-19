
interface IDrinks {
    _id: string,
    fund : number,
    income? : number,
    coke : number,
    pepsi : number, 
    dew : number,
    status: boolean
    createdAt?: string
    updatedAt?: string
}

type DrinksProps = {
    drink: IDrinks
}

type DrinksApiDataType = {
    message: string
    status: string
    drinks: IDrinks[]
    drink?: IDrinks
  }

type Error = {
    error: any
}