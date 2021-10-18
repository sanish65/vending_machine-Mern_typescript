import { Response, Request } from 'express'
import { IDrinks } from './../../types/drinks'
import Drinks from '../../models/drinks'

const getDrinks = async (req: Request, res: Response): Promise<void> => {
    try {
        const drinks: IDrinks[] = await Drinks.find()
        res.status(200).json({ drinks })
    } catch (error) {
        throw error
    }
}

const getDrinksById = async(req: Request , res : Response ) : Promise<void> => {
    try{
        const drinks: IDrinks | null = await Drinks.findById({ _id: req.params.id });
        res.status(200).json({ drinks })
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

const buyDrinksById = async(req: Request , res : Response ) : Promise<void> => {//this is buy amd update
    const { id  , drink , money } =  req.body; 
    try{
        const currentDrinks : IDrinks | null = await Drinks.findById(id);
        let newValue  = currentDrinks as Pick<IDrinks, '_id' | 'fund' | 'income' | 'coke' | 'pepsi' | 'dew'>
        let remainder :  number = 0;
        let numOfDrinks : number  = 0;
        let deductSum : number = 0;
        switch(drink){
            case 'coke':
                if(money < 20){
                    numOfDrinks = 0;
                    remainder = money;
                    break;
                }
                else{
                    let numOfCoke : string = (req.body.money / 20).toString();
                    numOfCoke = numOfCoke.split('.')[0];
                    numOfDrinks = <number><unknown>numOfCoke;
                    remainder = req.body.money % 20;
                    newValue.coke =  newValue.coke - (<number><unknown>numOfCoke);   
                    deductSum = req.body.money - remainder;
                    break;
                }

            case 'pepsi':
                if(money < 25){
                    numOfDrinks = 0;
                    remainder = money;
                    break;
                }
                else{
                    let numOfPepsi : string = (req.body.money / 25).toString();
                    numOfPepsi = numOfPepsi.split('.')[0];
                    numOfDrinks = <number><unknown>numOfPepsi;
                    remainder = req.body.money % 25;
                    newValue.pepsi =  newValue.pepsi - (<number><unknown>numOfPepsi);   
                    deductSum = req.body.money - remainder;
                    break;
                }

            case 'dew':
                if(money < 20){
                    numOfDrinks = 0;
                    remainder = money;
                    break;
                }
                else{
                    let numOfDew : string = (req.body.money / 30).toString();
                    numOfDew = numOfDew.split('.')[0];
                    numOfDrinks = <number><unknown>numOfDew;
                    remainder = req.body.money % 30;
                    newValue.dew =  newValue.dew - (<number><unknown>numOfDew);   
                    deductSum = req.body.money - remainder;
                    break;
                }

            default:
                newValue = newValue;
                break;
        }
        newValue.fund = newValue.fund - deductSum;
        newValue.income = newValue.income + deductSum;
        const drinks: IDrinks | null = await Drinks.findByIdAndUpdate( id , newValue, {new:true});
        res.status(200).json({ drinks, remainder , numOfDrinks })
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

const returnDrinksById = async(req: Request , res : Response ) : Promise<void> => {
    const { id  , drink , numbr } =  req.body; 
    let money : number = 0;

    try{
        const currentDrinks : IDrinks | null = await Drinks.findById(id);
        let newValue  = currentDrinks as Pick<IDrinks, '_id' | 'fund' | 'income' | 'coke' | 'pepsi' | 'dew'>
        if(newValue.income <= 0){
           money = 0;
        }
        else{
            switch(drink) {
                case 'coke':
                    newValue.coke += 1;
                    newValue.fund += 20;
                    newValue.income -=20;
                    money = 20;
                    break;
    
                case 'pepsi':
                    newValue.pepsi += 1;
                    newValue.fund += 25;
                    newValue.income -=25;
                    money = 25;
                    break;
    
                case 'dew':
                    newValue.dew += 1;
                    newValue.fund += 30;
                    newValue.income -=30;
                    money = 30;
                    break;
    
                default : 
                    newValue = newValue;
                    break;
            }
        }
        const drinks: IDrinks | null = await Drinks.findByIdAndUpdate( id , newValue, {new:true});
        res.status(200).json({ drinks , money  })
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

const addDrinks = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IDrinks, 'fund' | 'coke' | 'pepsi' | 'dew'>

        const drinks: IDrinks = new Drinks({
            fund: body.fund,
            coke: body.coke,
            pepsi: body.pepsi,
            dew: body.dew,
        }) 

        const newDrinks: IDrinks = await drinks.save()
        const allDrinks: IDrinks[] = await Drinks.find()

        res.status(201).json({ message: 'Drinks added', addedDrinks: newDrinks, drinks: allDrinks })
    } catch (error) {
        throw error
    }
}

const updateDrinks = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateDrinks: IDrinks | null = await Drinks.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allDrinks: IDrinks[] = await Drinks.find()
        res.status(200).json({
            message: 'Drinks updated',
            updatedDrinks: updateDrinks,
            drinks: allDrinks,
        })
    } catch (error) {
        throw error
    }
}

const deleteDrinks = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedDrinks: IDrinks | null = await Drinks.findByIdAndRemove(
            req.params.id
        )
        const allDrinks: IDrinks[] = await Drinks.find()
        res.status(200).json({
            message: 'Todo deleted',
            deletdDrinks: deletedDrinks,
            drinks:allDrinks,
        })
    } catch (error) {
        throw error
    }
}

export { getDrinks, returnDrinksById, getDrinksById, buyDrinksById, addDrinks, updateDrinks, deleteDrinks }
