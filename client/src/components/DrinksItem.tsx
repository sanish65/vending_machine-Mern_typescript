import React from 'react'

type Props = DrinksProps & {
    updateDrinks: (drinks: IDrinks) => void
    deleteDrinks: (_id: string) => void
    generateShop : (_id : string ) => void
}

const Drink: React.FC<Props> = ({ drink, updateDrinks, deleteDrinks, generateShop }) => {
  const checkDrinks: string = drink.status ? `line-through` : ''
  return (
    <div className='Card'>
      <div className='Card--text'>
        <h1 className={checkDrinks}> Fund : Rs.{drink.fund}</h1>
        <h2 className={checkDrinks}> Income: Rs. {drink?.income} </h2>
        <span className={checkDrinks}>Coke: {drink.coke} units</span><br/>
        <span className={checkDrinks}>Pepsi: {drink.pepsi} units</span><br/>
        <span className={checkDrinks}>Dew: {drink.dew} units</span>

      </div>
      <div className='Card--button'>
        <button
          onClick={() => updateDrinks(drink)}
          className={drink.status ? `hide-button` : 'Card--button__done'}
        >
          Complete
        </button>

        <button
          onClick={() => deleteDrinks(drink._id)}
          className='Card--button__delete'
        >
          Delete
        </button>

        <button 
          onClick = {() => generateShop(drink._id)}
          className='Card--button'
          >
            Generate Shop
          </button>

      </div>
    </div>
  )
}

export default Drink
