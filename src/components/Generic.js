import React from 'react';

class Generic extends React.Component {
	render() {
		return (
			<div>
				{this.props.message}
			</div>
		)
	}
}

export default Generic;