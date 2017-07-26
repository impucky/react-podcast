import React from 'react';
import moment from 'moment';
import Icon from 'react-fontawesome';

class Episode extends React.Component {
	constructor() {
		super();
		this.state = { expanded: false };
	}

	expandCollapse = () => {
		const expanded = (this.state.expanded) ? false : true;
		this.setState({ expanded });
	};

	handlePlay = (data) => {
		const playData = {
			url: data.enclosures[0].url.replace('http:', 'https:'),
			title: this.props.title,
			epTitle: data.title,
			image: this.props.image
		};
		this.props.playPodcast(playData);
	};

	render() {
		const data = this.props.data;
		const dateString = moment(data.date_ms).format('MMMM Do YYYY');
		const duration = data['itunes:duration']['#'].substring(3, 8);
		return (
			<li className="episode">
				<div className="episode-header" onClick={() => this.handlePlay(data)}>
						<Icon name="play-circle-o" size="2x" className="episode-play" />
					<h3>
						{data.title}
					</h3>
					<h3 className="episode-date">{dateString}</h3>
				</div>
				
				<div className={(this.state.expanded) ? 'episode-details expanded' : 'episode-details collapsed'}>
					<p>{data.summary.replace(/<[^>]*>?/g, '')}</p>
				</div>
				<Icon 
					onClick={this.expandCollapse}
					name="caret-down" 
					size="2x" 
					className={(this.state.expanded) ? 'episode-toggle up' : 'episode-toggle down'}
				/>
			</li>
		)
	}
}

export default Episode;