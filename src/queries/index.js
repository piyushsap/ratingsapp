import { gql } from "apollo-boost";

/* Restaurants Query */
export const GET_ALL_RESTAURANTS = gql`
  query {
    getAllRestaurants{
      _id
      name
      cuisines
      photo_url
      all_reviews_count
      address
      locality
      city
      latitude
      longitude
      zipcode
      locality_verbose
      aggregate_rating
      rating_text
      votes
    }
  }
`;

export const SEARCH_RESTAURANTS = gql`
  query($searchTerm: String) {
    searchRestaurants(searchTerm: $searchTerm) {
      _id
      name
      cuisines
      photo_url
      all_reviews_count
      address
      locality
      city
      latitude
      longitude
      zipcode
      locality_verbose
      aggregate_rating
      rating_text
      votes
    }
  }
`;

export const GET_RESTAURANT = gql`
  query($_id: ID!) {
    getRestaurant(_id: $_id) {
      _id
      name
      cuisines
      photo_url
      all_reviews_count
      address
      locality
      city
      latitude
      longitude
      zipcode
      locality_verbose
      aggregate_rating
      rating_text
      votes
    }
  }
`;


export const GET_RESTAURANT_RATINGS = gql`
  query($_id: String){
    getRestaurantRatings(restaurantid: $_id){
      _id
      comment
      rating
      username
      joinDate
    }
  }
`;

export const GETCURRENT_USER = gql`
  query{
    getCurrentUser{
      username
      joinDate
      email
    }
  }
`;

/* User Mutations */
export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;


export const ADD_RATING = gql`
  mutation($comment: String!, $rating: String!, $username: String!, $restaurantid: String!) {
    addRating(comment: $comment, rating: $rating, username: $username, restaurantid: $restaurantid) {
      comment
    }
  }
`;