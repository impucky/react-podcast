import React from 'react';
import Player from './Player';

class Menu extends React.Component {
	render() {
		return (
			<div className="menu">
				<Player />
				<h1>Menu</h1>
				{/* Categories, subscriptions etc */}
			</div>
		)
	}
}

export default Menu;