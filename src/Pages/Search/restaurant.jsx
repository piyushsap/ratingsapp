import React from 'react';
import { Button } from "../../Component";

const RestaurantItem = props => {
    return (
        <div className="restaurant-item">
            <div className="image">
                <img src={props.photo_url}  alt={props.name} />
            </div>
            <div className="restaurant-item-details">
                <h3>{props.name}</h3>
                <div className="details">
                    <div className="cusines">{props.cuisines}</div>
                    <div className="address">{props.address}</div>
                </div>
                <div className="rating">
                    <div className={`stars ${props.rating_text}`}><label className={props.rating_text}>{props.aggregate_rating}</label>{props.rating_text}</div>
                    <div className="votes">{props.votes+" Votes"}</div>
                </div>
                <div className="actions">
                    <Button {...{ text: "Write a review" }} />
                </div>
            </div>
        </div>
    );
}

export default RestaurantItem;
