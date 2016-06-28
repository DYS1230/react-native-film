import {
	View,
	Text,
	Navigator,
	ListView,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';

import Header from './Header';
import Cinema from './Cinema';
import TopButton from './TopButton';

var i = 0;

export default class MiddlePage extends Component {
	render() {
		return (
			<Navigator
				initialRoute = {{ component: List }}
			//	configureScene = {() => {
			//		return Navigator.SceneConfigs.HorizontalSwipeJump;
			//	}}
				renderScene = {(route, navigator) => {
					let Component = route.component;
					return <Component {...route.params} navigator={navigator} />
				}}
				onStartShouldSetResponder={(event)=>false}
				onMoveShouldSetResponder={(event)=>false}
			/>
		)
	}
}

class List extends Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2
		});
		this.state = {
			dataSource: ds,
			backTop: false,
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
			<View style={styles.container}>
				<Header />
				<ListView
					dataSource = {this.state.dataSource}
					renderRow = {this.renderData.bind(this)}
					renderSectionHeader = {this.renderSection.bind(this)}
					onScroll = {this.changeVisibleRows.bind(this)}
				/>
				{this.state.backTop ? <TopButton /> : null}
			</View>
		)
	}

	fetchData() {
		var url = 'http://m.maoyan.com/cinemas.json';
		fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((responseData) => {
			this.setState({dataSource: this.state.dataSource.cloneWithRowsAndSections(responseData.data)});
		})
	}

	changeVisibleRows(event) {
		if (event.nativeEvent.contentOffset.y > 500) {
			this.setState({
				backTop: true
			})
		} else {
			this.setState({
				backTop: false
			})			
		}
	}

	getCinemaInfo(id, name) {
		this.props.navigator.push({
			component: Cinema,
			params: {
				id: id,
				name: name
			}
		})
	}

	renderData(cinema) {
	//	console.log('cinema');
	//	console.log(cinema);
		return (
			<TouchableOpacity style={styles.cinemaContainer} onPress={() => this.getCinemaInfo(cinema.id,cinema.nm)}>
				<Text style={styles.cinemaName}>{cinema.nm}</Text>
				<Text style={styles.cinemaAddr}>{cinema.addr}</Text>
			</TouchableOpacity>
		)
	}

	renderSection(cinemaHeader, sectionId) {
		return (
			<View style={styles.cinemaHeader}>
				<Text style={styles.cinemaArea}>{cinemaHeader[0].area}</Text>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	cinemaContainer: {
		borderColor: '#ddd',
		borderTopWidth: 1, 
		padding: 15,
		backgroundColor: '#eee',
	},
	cinemaName: {
		fontSize: 17
	},
	cinemaAddr: {
		color: '#999',
		marginTop: 10,
	},
	cinemaHeader: {
		height: 40,
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 20
	},
	cinemaArea: {
		fontSize: 16,
	}
})