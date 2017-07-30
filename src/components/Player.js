import React from 'react';
import Icon from 'react-fontawesome';
import moment from 'moment';
import Slider from 'react-rangeslider'

class Player extends React.Component {
	constructor() {
		super();
		this.state = {
			playing: false,
			time: '00:00 / 00:00',
			speed: 1,
			secs: 0,
			volume: 1,
			oldVolume: 1,
			progStyle: { width: '0'},
			loadStyle: {},
			volumeIcon: 'volume-up',
			muted: false
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
		if (!audio.duration) {
			this.setState({ time: '00:00 / 00:00' });
			return;
		}
		const hourDisplay = (audio.duration >= 3600) ? 'HH:' : '';
		const formatStr = `${hourDisplay}mm:ss`;
		const secs = Math.round(audio.currentTime);
		this.updateProgress();
		if (secs === this.state.secs) {
			return;
		}
		const ct = moment.utc(Math.round(audio.currentTime) * 1000).format(formatStr);
		const duration = moment.utc(Math.round(audio.duration) * 1000).format(formatStr);
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
		const pos = e.pageX - bar.offsetLeft;
		const pct = (pos / bar.offsetWidth) * 100
		const targetTime = (pct / 100) * audio.duration;
		audio.currentTime = targetTime;
	};

	updateSpeed = () => {
		const speed = (this.state.speed === 2) ? 0.75 : this.state.speed + 0.25;
		this.setState({ speed });
		this.audioEl.playbackRate = speed;
	};

	updateVolume = (volume) => {
		let newIcon = 'volume-down';
		if (volume === 0) newIcon = 'volume-off';
		if (volume >= 0.5) newIcon = 'volume-up';
		this.audioEl.volume = volume;
		this.setState({ volume, oldVolume: volume, volumeIcon: newIcon });
	};

	handleDurationChange = () => {
		this.audioEl.play();
		console.log(this.audioEl.playbackRate)
		this.displayTime();
		if (!this.state.playing) {
			this.setState({ playing: true });	
		}
	};

	handleMute = () => {
		const oldVolume = this.state.oldVolume
		const newIcon = (oldVolume >= 0.5) ? 'volume-up' : 'volume-down';
		if (!this.state.muted) {
			this.audioEl.volume = 0;
			this.setState({ volume: 0, muted:true, volumeIcon:'volume-off' });
		} else {
			this.audioEl.volume = oldVolume;
			this.setState({ volume: oldVolume, muted:false, volumeIcon: newIcon});
		}
	};

	render() {
		const data = this.props.playData;
		const playerStyle = (this.props.playData.url) ? {opacity: '1'} : {opacity: '0'}
		return (
			<div className="player" style={playerStyle}>	
				<audio 
					src={data.url} 
					ref={(audio) => this.audioEl = audio}
					onTimeUpdate={this.displayTime}
					onDurationChange={this.handleDurationChange}
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
					<div className="time">
						<span>{this.state.time}</span>
					</div>
				</div>
				<div className="player-controls">
					<div className="play-pause">
						{(this.state.playing) ?
							<Icon name="pause" size="2x" onClick={this.playPause} />
							: <Icon name="play" size="2x" onClick={this.playPause} />
						}
					</div>	
					<div className="speed" onClick={this.updateSpeed}>
						<span>SPEED</span>
						<span>{this.state.speed + 'x'}</span>
					</div>
					<div className="volume">
						<Icon name={this.state.volumeIcon} onClick={this.handleMute} />
						<div className="slider">
							<Slider
								min={0}
								max={1}
								step={0.05}
								value={this.state.volume}
								onChange={this.updateVolume}
								tooltip={false}
							/>
						</div>
					</div>
				</div>
					<div className="slider">
						
					</div>
			</div>
		)
	}
}

export default Player;