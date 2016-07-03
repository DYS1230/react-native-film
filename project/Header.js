import {
	View,
	Image,
	StyleSheet,
} from 'react-native';
import React, { Component } from 'react';


export default class Header extends Component {
	render() {
		return (
			<View style={styles.header}>
				<Image source={require('../images/logo.png') } style={styles.logo}></Image>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	header: {
		height: 40,
		backgroundColor: '#e54847'
	},
	logo: {
		width:30,
		height:30,
		marginLeft:10,
		marginTop: 5
	}
});
/*
        backgroundColor: '#e54847',
        alignItems: 'center'

  ,
        flexDirection: 'row',

*/