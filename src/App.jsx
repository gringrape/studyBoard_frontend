import React from 'react';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import './App.scss';
import Main from './layout/Main.jsx';
import Nav from './layout/Nav.jsx';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
	uri: process.env.BACK_URL
});

const App = () => {
	
	return (
		<ApolloProvider client={client}>
			<React.Fragment>
				<Router history={browserHistory}>
					<Nav className="nav" />
					<Main className="container" />
				</Router>
			</React.Fragment>
		</ApolloProvider>
	);
};

export default App;
