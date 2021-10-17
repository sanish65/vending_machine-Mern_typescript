import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'http://localhost:4000'

const drinksUrl  : string = "http://localhost:4000/drinks"

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + '/todos'
    )
    return todos
  } catch (error) {
    throw new Error(error)
  }
}

export const getDrinks = async (): Promise<AxiosResponse<DrinksApiDataType>> => {
  try {
    const drinks: AxiosResponse<DrinksApiDataType> = await axios.get(
      drinksUrl + '/drinks'
    )
    return drinks
  } catch (error) {
    console.log("error"+error);
    throw new Error(error)
  }
}

export const buyDrinksById = async ( data : object ): Promise<AxiosResponse<DrinksApiDataType>> => {
  try {
    const drinks: AxiosResponse<DrinksApiDataType> = await axios.post(
      drinksUrl + '/update-drinks',
      data
    )
    return drinks
  } catch (error) {
    console.log("error"+error);
    throw new Error(error)
  }
}


export const returnDrinksById = async ( data : object ): Promise<AxiosResponse<DrinksApiDataType>> => {
  try {
    const drinks: AxiosResponse<DrinksApiDataType> = await axios.post(
      drinksUrl + '/update-drinks-return',
      data
    )
    return drinks
  } catch (error) {
    console.log("error"+error);
    throw new Error(error)
  }
}
export const getDrinksById = async ( id  : any ): Promise<AxiosResponse<DrinksApiDataType>> => {
  try {
    const drinks: AxiosResponse<DrinksApiDataType> = await axios.get(
      drinksUrl + `/drinks/${id}`
    )
    return drinks
  } catch (error) {
    console.log("error"+error);
    throw new Error(error)
  }
}

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, '_id'> = {
      name: formData.name,
      description: formData.description,
      status: false,
    }
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + '/add-todo',
      todo
    )
    return saveTodo
  } catch (error) {
    throw new Error(error);
  }
}


export const addDrinks = async (
  formData: IDrinks
): Promise<AxiosResponse<DrinksApiDataType>> => {
  try {
    const adddrinks: Omit<IDrinks, '_id'> = {
      fund : formData.fund,
      coke : formData.coke,
      pepsi : formData.pepsi,
      dew : formData.dew,
      status: false,
    }

    const saveTodo: AxiosResponse<DrinksApiDataType> = await axios.post(
      drinksUrl + '/add-drinks',
      adddrinks
    )
    return saveTodo
  } catch (error) {
    throw new Error(error);
  }
}

export const updateTodo = async (
  todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, 'status'> = {
      status: true,
    }
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-todo/${todo._id}`,
      todoUpdate
    )
    return updatedTodo
  } catch (error) {
    throw new Error(error)
  }
}

export const updateDrinks = async (
  drinks: IDrinks
): Promise<AxiosResponse<DrinksApiDataType>> => {
  try {
    const drinksUpdate: Pick<IDrinks, 'status'> = {
      status: true,
    }
    const updatedDrinks: AxiosResponse<DrinksApiDataType> = await axios.put(
      `${drinksUrl}/edit-drinks/${drinks._id}`,
      drinksUpdate
    )
    return updatedDrinks
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteTodo = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-todo/${_id}`
    )
    return deletedTodo
  } catch (error) {
    throw new Error(error)
  }
}


export const deleteDrinks = async (
  _id: string
): Promise<AxiosResponse<DrinksApiDataType>> => {
  try {
    const deletedDrinks: AxiosResponse<DrinksApiDataType> = await axios.delete(
      `${drinksUrl}/delete-drinks/${_id}`
    )
    return deletedDrinks
  } catch (error) {
    throw new Error(error)
  }
}
