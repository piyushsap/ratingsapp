import React from "react";

import { Query } from "react-apollo";
import { GETCURRENT_USER } from "../queries";

const Auth = Component => props => (
  <Query query={GETCURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      // console.log(data);
      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);

export default Auth;
