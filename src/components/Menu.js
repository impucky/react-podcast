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
					<li onClick={() => this.props.openPage('categories')} className={(this.props.activePage === 'categories') ? 'active' : ''}>
						<h2>POPULAR PODCASTS</h2>
					</li>
					<li className={(this.props.activePage === 'subs') ? 'active' : ''}>
						<h2>SUBSCRIPTIONS</h2>
					</li>
				</ul>
				<Player playData={this.props.playData} />
			</div>
		)
	}
}

export default Menu;