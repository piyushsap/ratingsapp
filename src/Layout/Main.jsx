import React from 'react';
import { Login, Search, Signup, Rating, RestaurantPage, Home } from '../Pages/';
import { Route } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';


function Main({ refetch, session }) {
  return (
    <div className="App">
      <Header session={session} />
      <div className="main-wrapper">
        <Route exact path="/" component={Search} />
        <Route path="/login" render={() => <Login refetch={refetch} />} />
        <Route path="/register" render={() => <Signup refetch={refetch} />} />
        <Route exact path="/rating" component={Rating} />
        <Route path="/restaurant/:_id" render={() => <RestaurantPage session={session} />}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Main;
