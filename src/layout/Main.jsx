import React from 'react';
import { routes } from '../routes';
import { Route } from 'react-router-dom';

const Main = () => {
	return (
		<main className="container">
			{routes.map(({ path, Component }, i) => (
				<Route key={i} exact path={path} component={() => <Component />} />
			))}
		</main>
	);
};

export default Main;
