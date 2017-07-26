import React from 'react';
import Player from './Player';

class Menu extends React.Component {
	render() {
		return (
			<div className="menu">
				<h1 className="menu-logo">PUCK.FM</h1>
				<Player playData={this.props.playData} />
				{/* Categories, subscriptions etc */}
			</div>
		)
	}
}

export default Menu;