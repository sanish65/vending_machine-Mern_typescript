import React, { useState } from 'react'

type Props = { 
  saveDrinks: (e: React.FormEvent, formData: IDrinks | any) => void 
}

const AddTodo: React.FC<Props> = ({ saveDrinks }) => {
  const [formData, setFormData] = useState<IDrinks | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => saveDrinks(e, formData)}>
      <div>
        <div>
          <label htmlFor='fund'>Fund</label>
          <input onChange={handleForm} type='text' id='fund' placeholder="Rs.00.00" />
        </div>

        <div>
          <label htmlFor='coke'>Coke</label>
          <input onChange={handleForm} type='text' id='coke' placeholder="0 units"  />
        </div>

        <div>
          <label htmlFor='pepsi'>Pepsi</label>
          <input onChange={handleForm} type='text' id='pepsi' placeholder="0 units"  />
        </div>

        <div>
          <label htmlFor='dew'>Dew</label>
          <input onChange={handleForm} type='text' id='dew' placeholder="0 units"  />
        </div>

      </div>
      <button disabled={formData === undefined ? true: false} >Add Initial Scenario</button>
    </form>
  )
}

export default AddTodo
