import React from 'react';

class Player extends React.Component {
	render() {
		return (
			<div className="player">				
				{(this.props.playUrl) ?
					<audio src={this.props.playUrl} controls></audio>
					: <p>Temp player</p>
				}
			</div>
		)
	}
}

export default Player;