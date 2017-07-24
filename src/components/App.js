import React from 'react';
import SearchBar from './SearchBar';
import Menu from './Menu';
import Generic from './Generic';
import SearchResults from './SearchResults';
import Podcast from './Podcast';
import Loader from 'halogen/PulseLoader';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			activePage: 'default',
			search: {
			},
			playUrl: '' 
		}
	}

	// loads 20 (for now) podcasts into state given a query and renders results page
	searchPodcasts = (query) => {
		// getting back to search from another page
		if (query === this.state.search.query && this.state.activePage !== 'search') {
			this.setState({ activePage: 'search' });
		}
		// don't repeat search or send empty request
		if (!query || query === this.state.search.query) {
			return;
		}
		// spin2win
		this.setState({ activePage: 'load' })
		const url = `https://itunes.apple.com/search?term=${query.split(' ').join('%20')}&entity=podcast&limit=20`;
		
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				// Only keep relevant data from itunes lookup
				const results = [];
				data.results.map((item) => {
					return results.push({
						title: item.collectionName,
						id: item.collectionId,
						// switch url to https, quick and dirty for now
						image: item.artworkUrl600.replace('http', 'https').replace('.mzstatic', '-ssl.mzstatic'),
						feed: item.feedUrl,
						itunesUrl: item.collectionViewUrl
					});
				});
				const search = { results, query }
				this.setState({ search, activePage: 'search' });
		});
	};

	openSinglePodcast = (searchData) => {
		// don't query if podcast is already in state
		if (this.state.activePodcast && this.state.activePodcast.meta.title === searchData.title) {
			this.setState({ activePage: 'podcast' });
			return;
		}
		this.setState({ activePage: 'load' });
		const url = `https://api.feednami.com/api/v1/feeds/load/?url=${searchData.feed}`
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				const activePodcast = data.feed;
				activePodcast.search = searchData;
				this.setState({
					activePodcast,
					activePage: 'podcast'
				});
		});
	}

	playPodcast = (url) => {
		this.setState({ playUrl: url });
	};

	openPage = (page) => {
		this.setState({ activePage: page });
	};

	render() {
		
		const pages = {
			default: <Generic message="Search for a podcast to get started !" />,
			search: <SearchResults data={this.state.search} openSingle={this.openSinglePodcast} />,
			podcast: <Podcast data={this.state.activePodcast} openPage={this.openPage} playPodcast={this.playPodcast} />,
			load: <div className="page-load"><Loader color="#fff" size="32px" /></div>
		}

		return (
			<div className="podpuck">
				<Menu playUrl={this.state.playUrl} />
				<div className="content">
					<SearchBar search={this.searchPodcasts} />
					<div className="content-inner">
						{pages[this.state.activePage]}
					</div>
				</div>
			</div>
		)
	}
}

export default App;