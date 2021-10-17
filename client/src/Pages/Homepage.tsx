import React, {  useEffect, useState } from 'react'
import DrinksItem from '../components/DrinksItem';
import AddDrinks from '../components/AddDrinks';
import Shopppage from './Shoppage';
import Loader from "react-loader-spinner";


import { 
  getDrinks, addDrinks , updateDrinks , deleteDrinks,
} from '../API'

const Homepage: React.FC = () => {
  const [ drinks , setDrinks ] = useState<IDrinks[]>([])
  const [ id, setId ] = useState('');

  useEffect(() => {
    fetchDrinks();
  }, [])

  const fetchDrinks = (): void => { 
    getDrinks()
    .then(({ data: { drinks } }: IDrinks[] | any) => setDrinks(drinks))
    .catch((err: Error) => console.log(err))
  }


  const handleSaveDrinks = (e: React.FormEvent, formData: IDrinks): void => {
    e.preventDefault()
    addDrinks(formData)
    .then(({ status, data }) => {
    if (status !== 201) {
      throw new Error('Error! Todo not saved')
    }
    setDrinks(data.drinks)
  })
  .catch((err) => {
    console.log(err);
  });
  }

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

    const handleGenerateDrinks = (_id : any): any => {
      return  setId(_id);
    }

  return (
    <main className='App'>
       <h1>Setup Your  Vending Machine</h1>
        <AddDrinks saveDrinks={handleSaveDrinks} />

        {drinks ? drinks.map((drink: IDrinks) => (
          <DrinksItem
            key={drink._id}
            updateDrinks={handleUpdateDrinks}
            deleteDrinks={handleDeleteDrinks}
            generateShop = {handleGenerateDrinks}
            drink={drink}
          />
        )):
        <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={90000} //3 secs
      />
      }

      {id ? <Shopppage id = {id}  /> : "click the button: Generate Shop" }

    </main>
  )
}

export default Homepage
