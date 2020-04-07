import React from "react";

import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import { GETCURRENT_USER } from "../queries";

const PrivateRoute = conditionFunc => Component => props => (
  <Query query={GETCURRENT_USER}>
    {({ data, loading }) => {
      if (loading) return null;
      return conditionFunc(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      );
    }}
  </Query>
);

export default PrivateRoute;