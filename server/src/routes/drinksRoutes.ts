import { Router } from 'express'
import { getDrinks, buyDrinksById, returnDrinksById, getDrinksById, addDrinks, updateDrinks, deleteDrinks } from '../controllers/drinks'
 
const router: Router = Router()

router.get('/drinks', getDrinks)

router.get('/drinks/:id', getDrinksById)

router.post('/update-drinks' ,buyDrinksById)

router.post('/update-drinks-return' ,returnDrinksById)

router.post('/add-drinks', addDrinks)

router.put('/edit-drinks/:id', updateDrinks)

router.delete('/delete-drinks/:id', deleteDrinks)

export default router
