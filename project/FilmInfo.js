import {
	View,
	Text,
	Navigator,
} from 'react-native';
import React, { Component } from 'react';

import BackNav from './BackNav';


export default class FilmInfo extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
	//	var _this = this
	//	setTimeout(function() {
	//		_this.props.navigator.pop();
	//	},2000);
	}
	render() {
		return (
			<View>
				<BackNav navigator={this.props.navigator}/>
				<Text>12212</Text>
			</View>
		)
	}
}