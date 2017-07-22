import React from 'react';

class SearchBar extends React.Component {
	
	handleKeyPress = (e) => {
		if(e.charCode === 13){
			this.props.search(this.query.value);   
    }
	};

	render() {
		return (
			<div className="searchbar">
				<input 
					type="text" 
					placeholder="Search podcasts" 
					ref={(input) => this.query = input}
					onKeyPress={this.handleKeyPress}
				/>
				<button onClick={() => this.props.search(this.query.value)}>Go</button>
			</div>
		)
	}
}

export default SearchBar;