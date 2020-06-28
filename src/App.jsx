import React, { Suspense } from 'react';
import routes from './router';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

const App = () => {
	const navStyle = {
		display: 'flex',
		flexDirection: 'column'
	};
	return (
		<React.Fragment>
			<Router>
				<div className="nav" style={navStyle}>
					<Link to="/add">add post</Link>
					<Link to="/list">list</Link>
					<Link to="/1">single</Link>
				</div>
				<Suspense fallback={<div>loading...</div>}>
					<Switch>
						{routes.map(({ path, Component }, i) => (
							<Route key={i} path={path} exact render={() => <Component />} />
						))}
					</Switch>
				</Suspense>
			</Router>
		</React.Fragment>
	);
};

export default App;
