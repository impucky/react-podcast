import React from 'react';
import SearchItem from './SearchItem';

class SearchResults extends React.Component {	
	render() {
		const data = this.props.data;
		const list = data.results.map((p) => {
			return (	
				<SearchItem data={p} key={p.id} openSingle={this.props.openSingle} />
			)
		})
		const message = (data.results.length) ? `Results for "${data.query}" :` : `Sorry, nothing found for "${data.query}" :(`; 
		return (
			<div className="results">
				<h2>{message}</h2>
				<div className="results-grid">
					{list}
				</div>
			</div>
			
		)
	}
}

export default SearchResults;