import React from 'react';

class Podcast extends React.Component {
	render() {
		const data = this.props.data;
		return (
			<div>
				<button onClick={() => this.props.openPage('search')}>Back to search</button>
				<h1>{data.title}</h1>
				<img src={data.image} alt={data.title}/>
				<p>Episodes go here</p>
				<p>Also links and buttons and stuff</p>
			</div>
		)
	}
}

export default Podcast;