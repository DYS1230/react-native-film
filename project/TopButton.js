import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import React, { Component } from 'react';


export default class TopButton extends Component {
	render() {
		return (
			<View style={styles.button}>
				<Text>BackTop</Text>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	button: {
		height: 20,
		width: 60,
		bottom:50,
		right: 50,
		borderWidth: 1,
		borderColor: 'black',
		position: 'absolute',
	}
})