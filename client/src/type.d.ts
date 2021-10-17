interface ITodo {
    _id: string
    name: string
    description: string
    status: boolean
    createdAt?: string
    updatedAt?: string
}

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

type TodoProps = {
    todo: ITodo
}

type DrinksProps = {
    drink: IDrinks
}

type ApiDataType = {
    message: string
    status: string
    todos: ITodo[]
    todo?: ITodo
  }

type DrinksApiDataType = {
    message: string
    status: string
    drinks: IDrinks[]
    drink?: IDrinks
  }