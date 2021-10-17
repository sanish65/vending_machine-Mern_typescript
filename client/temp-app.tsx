import React, { useEffect, useState } from 'react'
// import TodoItem from './components/TodoItem'
// import AddTodo from './components/AddTodo'

import DrinksItem from './components/DrinksItem';
import AddDrinks from './components/AddDrinks';
import { 
  // getTodos, addTodo, updateTodo, deleteTodo,
  getDrinks, addDrinks , updateDrinks , deleteDrinks,
} from './API'

const App: React.FC = () => {
  // const [todos, setTodos] = useState<ITodo[]>([])
  const [ drinks , setDrinks ] = useState<IDrinks[]>([])

  useEffect(() => {
    // fetchTodos();
    fetchDrinks();
  }, [])

  // const fetchTodos = (): void => {
  //   getTodos()
  //   .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
  //   .catch((err: Error) => console.log(err))
  // }

  const fetchDrinks = (): void => {   //for drinks project
    getDrinks()
    .then(({ data: { drinks } }: IDrinks[] | any) => setDrinks(drinks))
    .catch((err: Error) => console.log(err))
  }

//  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {

//    e.preventDefault()
//    addTodo(formData)
//    .then(({ status, data }) => {
//     if (status !== 201) {
//       console.log("checking this");
//       throw new Error('Error! Todo not saved')
//     }
//     console.log("checking this else");

//     setTodos(data.todos)
//   })
//   .catch((err) => {
//     console.log("Checking this catch");
//     console.log(err);
//   });
// }


const handleSaveDrinks = (e: React.FormEvent, formData: IDrinks): void => {
  e.preventDefault()
  addDrinks(formData)
  .then(({ status, data }) => {
   if (status !== 201) {
     console.log("checking this");
     throw new Error('Error! Todo not saved')
   }
   console.log("checking this else");

   setDrinks(data.drinks)
 })
 .catch((err) => {
   console.log("Checking this catch");
   console.log(err);
 });
}

  // const handleUpdateTodo = (todo: ITodo): void => {
  //   updateTodo(todo)
  //   .then(({ status, data }) => {
  //       if (status !== 200) {
  //         throw new Error('Error! Todo not updated')
  //       }
  //       setTodos(data.todos)
  //     })
  //     .catch((err) => console.log(err))
  // }

  const handleUpdateDrinks = (drinks: IDrinks): void => {   //updating the drinks
    updateDrinks(drinks)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not updated')
        }
        setDrinks(data.drinks)
      })
      .catch((err) => console.log(err))
  }

  // const handleDeleteTodo = (_id: string): void => {
  //   deleteTodo(_id)
  //   .then(({ status, data }) => {
  //       if (status !== 200) {
  //         throw new Error('Error! Todo not deleted')
  //       }
  //       setTodos(data.todos)
  //     })
  //     .catch((err) => console.log(err))
  // }

  const handleDeleteDrinks = (_id: string): void => {
    deleteDrinks(_id)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted')
        }
        setDrinks(data.drinks)
      })
      .catch((err) => console.log(err))
  }

  return (
    <main className='App'>
      {/* <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))} */}

      <h1>My Drinks</h1>
      <AddDrinks saveDrinks={handleSaveDrinks} />
      {drinks.map((drink: IDrinks) => (
        <DrinksItem
          key={drink._id}
          updateDrinks={handleUpdateDrinks}
          deleteDrinks={handleDeleteDrinks}
          drink={drink}
          />
      ))}
    </main>
  )
}

export default App
