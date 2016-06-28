import {
	View,
	Image,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';


export default class BackNav extends Component {
	constructor(props) {
		super(props);
		//console.log(this.props.navigator);
	}

	render() {
		return (
			<View style={styles.header}>
				<TouchableOpacity onPress={() => {
					return this.props.navigator.pop();
				}}>
					<View style={styles.backicon}></View>
				</TouchableOpacity>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	header: {
		height: 40,
		backgroundColor: '#e54847'
	},
	backicon: {
		borderWidth: 1,
        height: 12,
        width: 12,
        borderColor: "#fff",
        marginLeft: 20,
        marginTop: 5,
	}
})
/*
        borderLeftWidth: 1,
        borderTopWidth: 1,
        height: 12,
        width: 12,
        borderColor: "#fff",
        marginLeft: 20,
        transform: [{ rotate: "-45deg" }] */