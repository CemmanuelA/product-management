import React from 'react';
import './App.css';
import Products from './components/productList';
import { Switch,
  Route,
  Redirect
  } from 'react-router-dom';
import ProductForm from './components/formProduct';
import Header from './components/header';
import Cart from './components/cart';

function App() {
  return (
     <div>
        <Header />
        <Switch>
          <Route path="/products" component={Products} />
          <Route path="/product-form" component={ProductForm} />
          <Route path="/cart" component={Cart} />
          <Route exact path="/">
            <Redirect to="/products" />
          </Route>
      </Switch>
     </div>
  );
}

export default App;
