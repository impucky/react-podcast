import React from 'react';
import Loader from 'halogen/ClipLoader';


class SearchItem extends React.Component {	
	constructor() {
    super();
    this.state = { 
			imageStatus: <Loader className="results-item-load" size="128px" color="white" margin="33px" />,
			imageStyle: { opacity: '0' }
		};
  }

	handleImageLoad = () => {
		this.setState({ 
			imageStatus: null, 
			imageStyle: { opacity: '1' }
		});
	};

	render() {
		const data = this.props.data;
		return (
			<div className="results-item" onClick={() => this.props.openSingle(data, this.props.prevPage)}>
				<img src={data.image} alt={data.title} onLoad={this.handleImageLoad} style={this.state.imageStyle} />
				{this.state.imageStatus}
				<div className="results-item-overlay">
					<h3>{data.title}</h3>
				</div>
			</div>
		)
	}
}

export default SearchItem;