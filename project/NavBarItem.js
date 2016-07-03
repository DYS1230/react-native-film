import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Image,
} from 'react-native';
import React, { Component } from 'react';


export default class NavBarItem extends Component {
	constructor (props) {
		super(props);
	}
	render() {
		var title = this.props.title;
		var img = this.props.img;
		var itemTitle = (
			<Text style={styles.word}>{title}</Text>
		);
		var itemImg = (
			<Image style={styles.img} source={img}></Image>
		)
	
		return (
			<TouchableHighlight style={styles.container} onPress={this.props.onPress} underlayColor='#B5B5B5'>
				<View style={styles.item}>
					{itemImg}
					{itemTitle}
				</View>
			</TouchableHighlight>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	item: {
		alignItems: 'center',
		paddingTop: 5,
		paddingBottom: 5,
	},
	word: {
		fontSize: 12
	},
	img: {
		width: 20,
		height: 20,
	}
})