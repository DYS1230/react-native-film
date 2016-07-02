import {
	View,
	Text,
	Navigator,
	StyleSheet,
	ListView,
	TouchableOpacity,
	Image,
	ProgressBarAndroid
} from 'react-native';
import React, { Component } from 'react';

import Header from './Header';
import FilmInfo from './FilmInfo';

//configureScene={() => {
   // return Navigator.SceneConfigs.VerticalDownSwipeJump;
  //}}

export default class HomePage extends Component {
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
			/>
		)
	}
}

class List extends Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
		/*	<ListView
				dataSource = {this.state.dataSource} 
				renderRow = {this.renderData.bind(this)} 
			/>
		*/	
			<View style={styles.container}>
				<Header />
				<ListView
				//	navigator = {this.props.navigator}   //需要给filminfo，后filminfo给backnav pop
					dataSource = {this.state.dataSource}
					renderRow = {this.renderData.bind(this)}
				/>
			</View>
		)
	}

	fetchData() {
		var url = 'http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000';
		fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((responseData) => {
			this.setState({dataSource: this.state.dataSource.cloneWithRows(responseData.data.movies)});
		});
	}

	getFilmInfo(id, name) {
		this.props.navigator.push({
			component: FilmInfo,
			params: {
				id: id,
				name: name
			}
		})
	}

	renderData(film) {
		var verText = film.ver.split(' ')[0];
		var wishOrSc = film.preSale ? film.wish + '人想看' : film.sc + '分';
		var showInfo = film.preSale ? film.rt : film.showInfo;
		var nm = film.nm.length > 11 ? film.nm.slice(0 ,11).concat('...') : film.nm;

		return (
			<TouchableOpacity onPress={() => this.getFilmInfo(film.id, film.nm)}>
				<View style={styles.nav}>
					<Image source={{uri: film.img}} style={styles.img}></Image>
					<View style={styles.info}>
						<View style={styles.title}>
							<Text style={styles.name}>{nm}</Text>
							<View style={styles.verView}>
								<Text style={styles.verText}>{verText}</Text>
							</View>
						</View>
						<Text>{film.cat}</Text>
						<Text>{film.scm}</Text>
						<Text style={styles.showInfo}>{showInfo}</Text>
						<View style={styles.saleView}>
							<Text style={styles.sc}>{wishOrSc}</Text>
							<TouchableOpacity style={film.preSale ? styles.preSale : styles.sale}>
								<Text style={film.preSale ? styles.preSaleText : styles.saleText}>{film.preSale ? '预售' : '购票'}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	img: {
		width: 80,
		height: 110,
		borderRadius: 2
	},
	nav: {
		padding: 6,
		borderBottomWidth: 1,
		borderColor: '#ddd',
		flexDirection: 'row',
	},
	info: {
		flex: 1,
		paddingLeft: 10,
	},
	title: {
		paddingTop: 6,
		flexDirection: 'row',
		alignItems: 'center'
	},
	name: {
		color: '#333',
		fontSize: 16
	},
	verView: {
		backgroundColor: "#2895db",
		borderRadius: 2,
		paddingLeft: 5,
		paddingRight: 5,
		marginLeft: 5
	},
	verText: {
		color: "#fff",
		fontSize: 10
	},
	showInfo: {
		fontSize: 12
	},
	saleView: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	preSale: {
		borderWidth: 1,
		borderColor: '#159df1',
		borderRadius: 2,
		paddingLeft: 10,
		paddingRight: 10
	},
	sale: {
		borderWidth: 1,
		borderColor: '#49d95d',
		borderRadius: 2,        
		paddingLeft: 10,
		paddingRight: 10
	},
	preSaleText: {
		color: '#159df1',
	},
	saleText: {
		color: '#49d95d',
	}	
})