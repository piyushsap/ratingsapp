import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import { Query } from "react-apollo";
import { GET_RESTAURANT, GET_RESTAURANT_RATINGS } from "../../queries";
import { Spinner } from "../../Component";
import { Rating } from "..";

const RestaurantPage = ({ match, session }) => {
  const { _id } = match.params;
  return (
    <Fragment>
      <Query query={GET_RESTAURANT} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return <div>Error</div>;
          //console.log(data);
          return (
            <div className="restaurant">
              <div className="restaurant-wrap">
                <div className="container">
                  <div className="restaurant-img">
                    <img src={data.getRestaurant.photo_url} alt="{data.getRestaurant.name}" />
                    <button onclick="goto('#addrating')" className="review">Add Review</button>
                    <button>Direction</button>
                  </div>
                  <div className="restaurant-details">
                    <div className="reviews">
                      <label className={`ratings ${data.getRestaurant.rating_text}`}>{data.getRestaurant.aggregate_rating}</label>
                      <label>{data.getRestaurant.votes}<br /> votes</label>
                    </div>
                    <div className="restaurant-data">
                      <h1>{data.getRestaurant.name}</h1>
                      <label className="cusines">{data.getRestaurant.cuisines}</label>
                      <label className="address">{data.getRestaurant.address}</label>
                      <label className="locality">{data.getRestaurant.locality}</label>
                      <label className="city">{data.getRestaurant.city + " " + data.getRestaurant.zipcode}</label>
                    </div>
                  </div>
                  <div className="restaurant-review" id="addrating">
                    <Rating session={session} restaurant={_id} />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
      <Query query={GET_RESTAURANT_RATINGS} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return <div>Error</div>;
          return (
            <div className="ratings-wrapper">
              <ul>
                {data.getRestaurantRatings.map(rating => (
                  <li key={rating._id}>
                    <h3 className="user">{rating.username}</h3>
                    <label>{rating.rating}</label>
                    <blockquote>{`"${rating.comment}"`}</blockquote>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default withRouter(RestaurantPage);
