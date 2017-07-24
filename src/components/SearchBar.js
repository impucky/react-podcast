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
					spellCheck="false"
					placeholder="Search podcasts" 
					ref={(input) => this.query = input}
					onKeyPress={this.handleKeyPress}
				/>
			</div>
		)
	}
}

export default SearchBar;
//<button onClick={() => this.props.search(this.query.value)}><Icon name='search'/></button>