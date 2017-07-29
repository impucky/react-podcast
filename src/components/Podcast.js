import React from 'react';
import Episode from './Episode';
const Icon = require('react-fontawesome');

class Podcast extends React.Component {	
	constructor() {
		super();
		this.state = {
			loadedEpisodes: 5,
		}
	}

	componentWillMount() {
		this.renderEpisodes();
	}

	renderEpisodes = () => {
		const loaded = this.state.loadedEpisodes;
		const episodes = this.props.data.entries
		const episodeList = episodes.slice(0, loaded).map((e) => {
			return (
				<Episode 
					key={e.date_ms} 
					data={e} 
					title={this.props.data.meta.title} 
					image={this.props.data.search.image} 
					playPodcast={this.props.playPodcast}
				/>
			)
		});

		this.setState({ episodeList, loadedEpisodes: loaded + 5 });
	};

	render() {
		const search = this.props.data.search
		const details = this.props.data.meta;

		return (
			<div className="podcast-single">
				<button className="btn-back" onClick={() => this.props.openPage(this.props.data.prevPage)}><Icon name='times' size="2x"/></button>
				<div className="podcast-single-hero">
					<img src={search.image} alt={search.title}/>
					<div>
						<h1>{details.title}</h1>
						<p>{details.description}</p>
						<a href={details.link}>Homepage</a><br/>
						<a href={search.itunesUrl}>View on Itunes</a>
					</div>
				</div>
				<div>
					<h2>Latest Episodes :</h2>
					<ul className="episode-list">
						{this.state.episodeList}
					</ul>
					<button onClick={this.renderEpisodes}>Load More</button>
				</div>
			</div>
		)
	}
}

export default Podcast;