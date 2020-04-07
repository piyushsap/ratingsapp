import React from "react";
import { withRouter } from "react-router-dom";

import { Query } from "react-apollo";
import { GET_RESTAURANT } from "../../queries";
import { Spinner } from "../../Component";
import { Rating } from "..";

const RestaurantPage = ({ match,session }) => {
  console.log(session,121)
  const { _id } = match.params;
  return (
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
                  <button className="review">Add Review</button>
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
                <div className="restaurant-review">
                  <Rating session={session} restaurant={_id}/>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(RestaurantPage);
