import React from 'react'
import { BrowserRouter , Switch, Route } from 'react-router-dom';
import  HomePage  from './Pages/Homepage';
import  ShopPage from './Pages/Shoppage';

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/shop"  component={ShopPage} exact/>
          </Switch>
    </BrowserRouter>
  )
}

export default App
