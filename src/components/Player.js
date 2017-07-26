import React from 'react';
import Icon from 'react-fontawesome';
import moment from 'moment';

class Player extends React.Component {
	constructor() {
		super();
		this.state = {
			playing: false,
			time: '00:00 / 00:00',
			secs: 0,
			progStyle: { width: '0'}
		}
	}

	playPause = () => {
		const audio = this.audioEl;
		let playing;
		if (this.state.playing) {
			playing = false;
			audio.pause();
		} else {
			playing = true;
			audio.play()
		}
		this.setState({ playing });
	};

	displayTime = () => {
		const audio = this.audioEl;
		const secs = Math.round(audio.currentTime);
		this.updateProgress();
		if (secs === this.state.secs) {
			return;
		}
		const ct = moment.utc(Math.round(audio.currentTime) * 1000).format("mm:ss");
		const duration = moment.utc(Math.round(audio.duration) * 1000).format("mm:ss");
		const time = `${ct} / ${duration}`;
		this.setState({ time, secs });
	};

	updateProgress = () => {
		const prog = (this.audioEl.currentTime / this.audioEl.duration) * 100;
		const progStyle = { width: `${prog}%` };
		this.setState({ progStyle, prog });
	};

	scrub = (e) => {
		const audio = this.audioEl;
		const bar = this.progBar;
		const pos = e.pageX - bar.offsetParent.offsetLeft;
		const pct = (pos / bar.offsetWidth) * 100
		const targetTime = (pct / 100) * audio.duration;
		console.info('clicked on ', pos, ' thats ', pct, '%, go to ', targetTime)
		audio.currentTime = targetTime;
	};

	updateSpeed = () => {
		this.audioEl.playbackRate = this.speed.value;
	};

	render() {
		const data = this.props.playData;
		return (
			<div className="player">	
				<audio 
					src={data.url} 
					ref={(audio) => this.audioEl = audio}
					onTimeUpdate={this.displayTime}
					onLoadedMetadata={this.displayTime}
					onPlay={this.playPause}
					autoPlay
				>
					
				</audio>			
				<div className="player-main">
					<img src={data.image} alt={data.epTitle}/>
					<div className="image-placeholder"></div>
					<h4>{data.title}</h4>
					<h4>{data.epTitle}</h4>
				</div>
				<div className="player-bar" onClick={(e) => this.scrub(e)} ref={(bar) => this.progBar = bar}>
					<div className="progress" style={this.state.progStyle}></div>
				</div>
				<div className="player-controls">
					<div className="play-pause">
						{(this.state.playing) ?
							<Icon name="pause" size="2x" onClick={this.playPause} />
							: <Icon name="play" size="2x" onClick={this.playPause} />
						}
					</div>
					<div className="time">
						{this.state.time}
					</div>
					<div className="speed">
						<select ref={(input) => this.speed = input} onChange={this.updateSpeed}>
							<option value="0.75">0.75x</option>
							<option value="1" selected="selected">1x</option>
							<option value="1.25">1.25x</option>
							<option value="1.5">1.5x</option>
							<option value="1.75">1.75x</option>
							<option value="2">2x</option>
						</select>
					</div>
				</div>
			</div>
		)
	}
}

export default Player;