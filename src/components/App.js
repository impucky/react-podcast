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
			}
		}
	}

	// loads 20 (for now) podcasts into state given a query and renders results page
	searchPodcasts = (query) => {

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
						image: item.artworkUrl600,
						feed: item.feedUrl
					});
				});

				// update state
				const search = { results, query }
				this.setState({ search, activePage: 'search' });
		});
	};

	openSinglePodcast = (data) => {
		this.setState({ openedPodcast: data, activePage: 'podcast' });
	};

	openPage = (page) => {
		this.setState({ activePage: page });
	};

	render() {
		
		const pages = {
			default: <Generic message="Search for a podcast to get started !" />,
			search: <SearchResults data={this.state.search} openSingle={this.openSinglePodcast} />,
			podcast: <Podcast data={this.state.openedPodcast} openPage={this.openPage} />,
			load: <div className="page-load"><Loader color="#fff" size="32px" /></div>
		}

		return (
			<div className="podpuck">
				<Menu />
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