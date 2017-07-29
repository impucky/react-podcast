import React from 'react';
import Player from './Player';

class Menu extends React.Component {
	render() {
		return (
			<div className="menu">
				<div className="menu-logo">
					<h1>PUCK.FM</h1>
				</div>
				<ul className="menu-items">
					<li onClick={() => this.props.openPage('categories')}>
						<h2>Popular Podcasts</h2>
					</li>
				</ul>
				<Player playData={this.props.playData} />
			</div>
		)
	}
}

export default Menu;