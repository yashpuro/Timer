import React from 'react';
import './styles.css';
import { timeConvert } from './utils';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			time: '',
			sec: 60,
			secId: 0,
			width: 100,
			originalTime: '',
		};
	}

	componentDidUpdate(pre, cur) {
		if (cur.sec === 0) {
			this.setState({ sec: 60 });
		}
	}

	buttonStyle = {
		margin: '2px',
	};
	handleTimeChange = () => {
		const { time } = this.state;
		if (isNaN(Number(time)) || !time.length || Number(time) === 0) {
			alert('Invalid Time');
		} else {
			this.setState({ active: true });
			this.setState({
				secId: setInterval(() => {
					if (this.state.time !== this.state.originalTime) {
						this.setState({
							width:
								(Number(this.state.time) / Number(this.state.originalTime)) *
								100,
						});
					}
					if (this.state.sec === 60 || this.state.sec === 0) {
						this.setState({ time: (Number(this.state.time) - 1).toString() });
					}
					if (this.state.time === '' || this.state.time === '-1') {
						clearInterval(this.state.secId);
						this.setState({ time: '0', sec: 0 });
					}
					this.setState({ sec: this.state.sec - 1 });
				}, 1000),
			});
		}
	};
	render() {
		return (
			<div className="App">
				<h1>Timer</h1>
				<input
					placeholder="Enter time(in minutes)"
					onChange={(e) => {
						this.setState({
							time: e.target.value,
							sec: 60,
							originalTime: e.target.value,
						});
					}}
					onKeyUp={(e) => {
						if (e.keyCode > 57 || e.keyCode < 48) {
							e.preventDefault();
						}
					}}
					value={this.state.time}
					disabled={this.state.active}
				/>
				<div style={{ marginTop: '5px' }}>
					<button
						onClick={this.handleTimeChange}
						disabled={this.state.active}
						style={this.buttonStyle}
					>
						Start
					</button>
					<button
						onClick={(e) => {
							window.alert('TIMER Stopped');
							this.setState({ active: !this.state.active });
							this.setState({ time: this.state.time });
							clearInterval(this.state.secId);
						}}
						style={this.buttonStyle}
						disabled={!this.state.active || this.state.time === '0'}
					>
						Stop
					</button>
					<button
						onClick={(e) => {
							this.setState({ time: '' });
							clearInterval(this.state.secId);
							this.setState({ active: false, sec: 60, width: 100 });
						}}
						style={this.buttonStyle}
					>
						Reset
					</button>
				</div>
				<div
					style={{
						width: '100%',
						height: '20px',
						border: '1px solid black',
						margin: '5px',
						textAlign: 'center',
						color: 'white',
						background: 'black',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							width: `${this.state.width}%`,
							background: 'green',
							height: '20px',
						}}
					>
						<span>
							{timeConvert(this.state.time) +
								':' +
								(this.state.sec === 60
									? '00'
									: this.state.sec < 10
									? '0' + this.state.sec
									: this.state.sec)}
						</span>
					</div>
				</div>
			</div>
		);
	}
}

