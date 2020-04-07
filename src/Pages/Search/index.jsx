import React, { Component, Fragment } from 'react';
import { Button, Input } from "../../Component";
import RestaurantItem from './restaurant';
import { Link } from "react-router-dom";

import { ApolloConsumer } from "react-apollo";

import { SEARCH_RESTAURANTS } from "../../queries";


class Search extends Component {
  state = {
    searchResults: []
  };

  handleChange = ({ searchRestaurants }) => {
    this.setState({
      searchResults: searchRestaurants
    });
  };
  render() {
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
              <section className="search-result">
                <h1>Showing nearby restaurants</h1>
                <ul>
                  {searchResults.map(restaurant => (
                    <li key={restaurant._id}><Link to={`/restaurant/${restaurant._id}`}><RestaurantItem {...restaurant} /></Link></li>
                  ))}
                </ul>
              </section>
            </Fragment>
          )}
        </ApolloConsumer>
      </section>
    );
  }
}


export default Search;