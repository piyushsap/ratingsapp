import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.scss';
import Main from './Layout/Main';
import Auth from './Hoc/Auth';

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  fetchOptions:{
    credentials: 'include'
  },
  request:operation=>{
    const token = localStorage.getItem('token');
    operation.setContext({
      headers:{
        authorization:token
      }
    })
  },
  onError:({networkError})=>{
    console.log('Network Error', networkError);
  }
});

const RootWithAuth = Auth(Main)

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <RootWithAuth />
      </div>
    </ApolloProvider>
  );
}

export default App;
