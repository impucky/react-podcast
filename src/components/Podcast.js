import React from 'react';
const Icon = require('react-fontawesome');

class Podcast extends React.Component {	
	render() {
		const search = this.props.data.search
		const details = this.props.data.meta;
		const episodes = this.props.data.entries;
		const episodeList = episodes.slice(0, 5).map((e) => {
			const date = new Date(e.date_ms)
			const dateString = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
			return (
				<li key={e.date_ms} onClick={() => this.props.playPodcast(e.enclosures[0].url)}>
					<h3>{e.title}</h3>
					<h3>{dateString}</h3>
					<p>{`${e.description.substr(0, 300)} [...]`}</p>
				</li>
			)
		});
		return (
			<div className="podcast-single">
				<button className="btn-back" onClick={() => this.props.openPage('search')}><Icon name='times' size="2x"/></button>
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
						{episodeList}
					</ul>
				</div>
			</div>
		)
	}
}

export default Podcast;