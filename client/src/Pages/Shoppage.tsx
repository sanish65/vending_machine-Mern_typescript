import React ,{ useEffect, useState }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import coke from '../images/coke2.svg';
import pepsi from '../images/pepsi.svg';
import dew from '../images/dew.png';
import { 
  getDrinksById ,
   buyDrinksById , 
   returnDrinksById 
  } from '../API'
import TextField  from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IShopID  {
  id : string,
}
const Shopppage = ( id : IShopID ) => {
  const styles = makeStyles(() => ({
    main : {
      marginTop : 20,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection : 'row',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    card: {
      borderRadius : 25,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginTop :2,
      marginRight: 15,
      transition: "0.3s",
      height: '40vh',
      maxWidth : 500,
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      }
    },
    media: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '15vh',
      width: 200,
      objectFit: 'cover'
    },
    button : {
      margin : '15px 15px',
    },
    textfield : {
      padding : '0px 35px',
    },

  }));

  const classes = styles();
  const [drinks, setDrinks] = useState<IDrinks>();
  const [money , setMoney] = useState<string>('');

  useEffect(()=> {
    fetchDrinkById(id);
  },[]);

  const fetchDrinkById = (id : any ): void => {   
    getDrinksById(id.id)
    .then(({ data: { drinks } }: IDrinks | any) => setDrinks(drinks))
    .catch((err: Error) => console.log(err))
  }

  const handleMoney  = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setMoney(e.currentTarget.value);
  }

  const buyNow = ( drink : string , money: string, id : any) => {
    const params = {
      drink,
      id,
      money,
     }
      buyDrinksById(params)
      .then(({ data: { drinks , remainder , numOfDrinks  } }: IDrinks[] | any) =>
        { 
          setDrinks(drinks);
          notify(drink , remainder , numOfDrinks);
          fetchDrinkById(id);
        })
      .catch((err: Error) => console.log(err))
    }

  const refundNow = ( drink : string ,  id: any ) => {
    const params = {
      drink,id
    }
    returnDrinksById(params)
    .then(({ data: { drinks , money } }: IDrinks[] | any) =>
      { 
        if(drinks == 0 && money === 0 ){
          notifyReturn(drink , money);
        }
        else{
          setDrinks(drinks);
          notifyReturn(drink , money);
          fetchDrinkById(id);
        }
      })
    .catch((err: Error) => console.log(err))
  }

  const notify = (drink : string , remainder : number , numOfDrinks : number) => {
    if(numOfDrinks === 0){
      toast(`Not sufficient balance.`);
      toast(`Money returned : ${remainder} `)
    }
    else{
      toast(`${numOfDrinks} units of ${drink} purchased.`);
      toast(`Money returned : ${remainder} `);
    }
  }

  const notifyReturn = (drink : string , money : number) => {
    if(money === 0){
      toast("Unable to return the drink");      
    }
    else{
      toast(` 1 unit of ${drink} returned.`);
      toast(`Money returned ${money} `);
    }
  }

  return (
    <>
      <main className={classes.main }>
        { drinks ? (
          <>
           <Card className={classes.card}>
           <CardActionArea>
             <CardMedia
               className={classes.media}
               image={coke}
               title="Contemplative Reptile"
             />
             <CardContent>
               <Typography gutterBottom variant="h5" component="h2">
                 Coca-cola
               </Typography>
               <Typography component="p">
                 Remaining : {drinks.coke} &nbsp;
               </Typography>
               <Typography component="p">
                 price : 20Rs
               </Typography>
             </CardContent>
           </CardActionArea>
           <CardActions>
           </CardActions>
       </Card>

       <Card className={classes.card}>
           <CardActionArea>
             <CardMedia
               className={classes.media}
               image={pepsi}
               title="Contemplative Reptile"
             />
             <CardContent>
               <Typography gutterBottom variant="h5" component="h2">
                 Pepsi
               </Typography>
               <Typography component="p">
                 Remaining : {drinks.pepsi} &nbsp;
               </Typography>
               <Typography component="p">
                 price : 25Rs
               </Typography>
             </CardContent>
           </CardActionArea>
           <CardActions>
           </CardActions>
       </Card>

       <Card className={classes.card}>
           <CardActionArea>
             <CardMedia
               className={classes.media}
               image={dew}
               title="Contemplative Reptile"
             />
             <CardContent>
               <Typography gutterBottom variant="h5" component="h2">
                 Mountain Dew
               </Typography>
               <Typography component="p">
                Remaining : {drinks.dew} &nbsp;
               </Typography>
               <Typography component="p">
                price : 30Rs
               </Typography>
             </CardContent>
           </CardActionArea>
           <CardActions>
           </CardActions>
       </Card>
       </>
        ) : "something went wrong" }

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
      </main>

    <main className={classes.main }>
     
      <Card className={classes.card}>
          <Typography gutterBottom variant="h5" component="h2">
              Insert coins
          </Typography>
          <TextField 
          className = {classes.textfield}
            type="number"
            id="money'"
            value={money} 
            onChange={handleMoney} 
            placeholder="put money here"
            />
          <Button 
              className={classes.button}
              size="medium" 
              variant="contained" 
              color="inherit"  
              onClick={() => buyNow('coke', money,  drinks?._id) 
              }>
              coke
          </Button>
          <Button 
              className={classes.button}
              size="medium" 
              variant="contained" 
              color="inherit" 
              onClick={() => buyNow('pepsi', money,  drinks?._id) 
              }>
              pepsi
          </Button>
          <Button 
              className={classes.button}
              size="medium" 
              variant="contained" 
              color="inherit"  
              onClick={() => buyNow('dew' , money, drinks?._id) 
              }>
              dew
          </Button>
        </Card>

        <Card className={classes.card}>
          <Typography gutterBottom variant="h5" component="h2">
              Return & Refund
          </Typography>
          <Button 
              className={classes.button}
              size="medium" 
              variant="contained" 
              color="inherit"  
              onClick={() => refundNow('coke',  drinks?._id) 
              }>
              coke
          </Button>
          <Button 
              className={classes.button}
              size="medium" 
              variant="contained" 
              color="inherit" 
              onClick={() => refundNow('pepsi',   drinks?._id) 
              }>
              pepsi
          </Button>
          <Button 
              className={classes.button}
              size="medium" 
              variant="contained" 
              color="inherit"  
              onClick={() => refundNow('dew' ,  drinks?._id) 
              }>
              dew
          </Button>
        </Card>
    </main>
    </>
  )
}

export default Shopppage
