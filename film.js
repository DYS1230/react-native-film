import {
	View,
	Text,
	Navigator,
	StyleSheet
} from 'react-native';
import React, { Component } from 'react';

import HomePage from './project/HomePage';
import MiddlePage from './project/MiddlePage';
import NavBarItem from './project/NavBarItem';

var ROUTE = [
	{'component': HomePage},
	{'componsent': MiddlePage},
];

export default class film extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tabIndex: 0
		};
	}

	render() {
		let defaultName = 'HomePage'; //name似乎可以随便弄，不一定要其，这只是传递给子元素的属性值罢了
		let defaultComponent = HomePage;
		let routeIndex = this.state.tabIndex;
		return (
			<Navigator 
				initialRoute = { ROUTE[0] }
			//	configureScene = {(route) => {
			//		return Navigator.SceneConfigs.VerticalDownSwipeJump;
			//	}}
				initialRouteStack = { ROUTE }
				navigationBar = {
					this.tabBar()
				}
				renderScene = {(route, navigator) => {
					
					let page = [
						<HomePage {...route.params} />,
						<MiddlePage {...route.params} />,
					]
					return page[routeIndex];
				}}
			/>
		)
	}

	tabBar() {
		return (
			<View style={styles.nav}>
				<NavBarItem
					title="影片"
					img={require("./images/film.png") }
					onPress={() => {
						this.changeIndex(0);
					}}
				></NavBarItem>
				<NavBarItem 
					title="影院"
					img={require("./images/cinema.png") }
					onPress={() => {
						this.changeIndex(1)
					}}
				></NavBarItem>
			</View>
		)
	}

	changeIndex(index) {
		this.setState({
			tabIndex: index
		})
	}
}

var styles = StyleSheet.create({
	nav: {
		flexDirection: 'row',
	},
	tabItem: {
		flex: 1,
		borderWidth: 2,
		width:40,
		height: 40,
	}
});