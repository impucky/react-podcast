import React from 'react';
import SearchBar from './SearchBar';
import Menu from './Menu';
import Generic from './Generic';
import SearchResults from './SearchResults';
import Podcast from './Podcast';
import Categories from './Categories';
import Loader from 'halogen/PulseLoader';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			activePage: 'load',
			search: {},
			playData: {},
			topPodcasts: []
		}
	}

	componentDidMount() {
		this.getCategories();
	}

	// loads 20 (for now) podcasts into state given a query and renders results page
	searchPodcasts = (query) => {
		// temporary fix, everything breaks if you search while a podcast is loading
		if (this.state.activePage === 'load') return;
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
			.then((json) => {
				const results = this.cleanItunesResults(json.results)
				const search = { results, query }
				this.setState({ search, activePage: 'search' });
		});
	};

	getCategories = () => {
		const genreIds = [1301, 1303, 1304, 1305, 1307, 1309, 1310, 1311, 1314, 1315, 1316, 1318, 1321, 1323, 1324, 1325];
		const urls = genreIds.map((id) => `https://itunes.apple.com/us/rss/topaudiopodcasts/genre=${id}/json`);
		this.setState({ activePage: 'load' });
		Promise
			.all(urls.map(this.getSingleCategory))
			.then(() => {
				this.setState({
					activePage: 'categories',
				});
				console.log('finished getting toplists')
			});
	};

	// get top podcasts in category
	getSingleCategory = (url) => {
		const category = {};
		// first category name and a list of ids
		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				const name = json.feed.title.label.split(' ');
				category.categoryName = name[name.length - 1];
				const ids = json.feed.entry.map((e) => e.id.attributes['im:id']).join(',')
				const lookupUrl = `https://itunes.apple.com/lookup?id=${ids}`
				// then lookup ids and put podcasts in state
				return fetch(lookupUrl)
			})
			.then((res) => res.json())
			.then((json) => {
				category.results = this.cleanItunesResults(json.results);
				const topPodcasts = this.state.topPodcasts;
				topPodcasts.push(category);
				this.setState({ topPodcasts });
			});
	};

	openSinglePodcast = (searchData, prevPage) => {
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
				activePodcast.prevPage = prevPage;
				this.setState({
					activePodcast,
					activePage: 'podcast'
				});
		});
	}

	playPodcast = (playData) => {
		this.setState({ playData });
	};

	openPage = (page) => {
		this.setState({ activePage: page });
	};

	// keep it tidy
	cleanItunesResults = (results) => {
		const trimmed = [];
		results.map((item) => {
			return trimmed.push({
				title: item.collectionName,
				id: item.collectionId,
				// switch url to https, quick and dirty for now
				image: item.artworkUrl600.replace('http', 'https').replace('.mzstatic', '-ssl.mzstatic'),
				feed: item.feedUrl,
				itunesUrl: item.collectionViewUrl
			});
		});
		return trimmed;
	};

	render() {
		
		const pages = {
			default: <Generic message="Search for a podcast to get started !" />,
			search: <SearchResults data={this.state.search} openSingle={this.openSinglePodcast} />,
			podcast: <Podcast data={this.state.activePodcast} openPage={this.openPage} playPodcast={this.playPodcast} />,
			load: <div className="page-load"><Loader color="#fff" size="32px" /></div>,
			categories: <Categories data={this.state.topPodcasts} openSingle={this.openSinglePodcast} />
		}

		return (
			<div className="podpuck">
				<Menu playData={this.state.playData} openPage={this.openPage} />
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