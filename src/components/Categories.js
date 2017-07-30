import React from 'react';
import SearchItem from './SearchItem';
import Loader from 'halogen/PulseLoader';

class Categories extends React.Component {
	sortCategories = (a, b) => {
    const one = a.categoryName.toUpperCase();
    const two = b.categoryName.toUpperCase();
    return (one < two) ? -1 : (one > two) ? 1 : 0;
	}

	renderCategories = (category) => {
		return (
			<div className="results" key={category.categoryName}>
				<h3>{category.categoryName}</h3>
				<div className="results-grid">
					{category.results.map((p) => {
						return (	
							<SearchItem data={p} key={p.id} openSingle={this.props.openSingle} prevPage="categories"/>
						)
					})}
				</div>
			</div>
		)
	}

	render() {
		const categories = this.props.data;
		let loaded = (categories.length === 16) ? true : false;
		return (
			<div className={(loaded) ? "" : "page-load"}>
				{(loaded) 
				? categories.sort(this.sortCategories).map(this.renderCategories)
				: <Loader color="#fff" size="32px" />
				}
			</div>
			
		)
	}
}

export default Categories;