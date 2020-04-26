import React, { Component, Fragment } from 'react';
import { Button, Input } from "../../Component";
import RestaurantItem from './restaurant';
import { Link } from "react-router-dom";

import { ApolloConsumer, graphql } from "react-apollo";

import { SEARCH_RESTAURANTS } from "../../queries";
import MapContainer from '../Map';


class Search extends Component {
  state = {
    searchResults: [],
    userLocation: {
      lat: 1,
      lng: 1
    },
    center: {
      lat: 1,
      lng: 1
    },
    flags: {
      isLoadingRestaurants: true,
      isRestSearchAllowed: true,
      isUserMarkerShown: false,
    },
  };

  componentDidMount() {
    this.locateUser()
    console.log(this.props.data.searchRestaurants, 123123);
  }

  handleChange = ({ searchRestaurants }) => {
    this.setState({
      searchResults: searchRestaurants
    });
  };


  locateUser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          // debug log
          console.log('User Successfully located', position);
          this.setState(prevState => ({
            userLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            center: {
              ...prevState.center,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            flags: {
              ...prevState.flags,
              isUserMarkerShown: true
            }
          }));
        }
      )
    }
  }
  displayDefaultRestaurant = () => {
    var data = this.props.data;
    if(data.loading){
      return(<li>Loading restaurants</li>)
    }else{
      return data.searchRestaurants.map(restaurant=>{
        return(
          <li key={restaurant.id}><Link to={`/restaurant/${restaurant._id}`}><RestaurantItem {...restaurant} /></Link></li>
        )
      })
    }
  }
  displayDefaultRestaurantMap = () => {
    var data = this.props.data;
    if(data.loading){
      return(<li>Loading restaurants</li>)
    }else{
      return <MapContainer  marker={data.searchRestaurants} defaultCenter={this.state.userLocation} />
    }
  }
  render() {
    console.log(this.state)
    const { searchResults } = this.state;

    return (
      <section className="search">
        <ApolloConsumer>
          {client => (
            <Fragment>
              <section className="search-bg">
                <section className="search-wrap">
                  <input
                    type="search"
                    className="search"
                    placeholder="Search for restaurants"
                    onChange={async event => {
                      event.persist();
                      const { data } = await client.query({
                        query: SEARCH_RESTAURANTS,
                        variables: { searchTerm: event.target.value }
                      });
                      this.handleChange(data);
                    }}
                  />
                </section>
              </section>
            </Fragment>
          )}
        </ApolloConsumer>
      <section className="search-mapview">
          {searchResults.length > 0 ? (
            <MapContainer marker={searchResults} defaultCenter={this.state.userLocation} />
          ) : (
              this.displayDefaultRestaurantMap()
          )}
            
      </section>
        <section className="search-result">
          <h1>Showing nearby restaurants</h1>
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map(restaurant => (
                <li key={restaurant._id}><Link to={`/restaurant/${restaurant._id}`}><RestaurantItem {...restaurant} /></Link></li>
              ))}
            </ul>
          ) : (
            <ul>
              {this.displayDefaultRestaurant()}
            </ul>
          )}
      </section>
      </section >
    );
  }
}


export default graphql(SEARCH_RESTAURANTS)(Search);