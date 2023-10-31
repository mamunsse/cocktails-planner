import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
import IngredientDetails from './pages/IngredientDetails';
import AvailableCocktails from './pages/AvailableCocktails';
function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/">
              <AvailableCocktails />
            </Route>
            <Route path="/ingredients">
              <IngredientDetails />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
