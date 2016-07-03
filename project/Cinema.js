import {
	View,
	Text,
	Navigator,
	ListView,
	StyleSheet,
	ProgressBarAndroid,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	Image
} from 'react-native';
import React, { Component } from 'react';

import BackNav from './BackNav';

var {height, width} = Dimensions.get('window');

var id, name, data;
var movieIndex = 0, dateIndex = 0;
var date = new Date();
var month = date.getMonth() + 1;
month = (month) < 10 ? '0' + month : month;
var initDate = date.getFullYear() + '-' + month + '-' + date.getDate();

export default class FilmInfo extends Component {
	constructor(props) {
		super(props);
		//console.log(this.props);
		//console.log(this);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			dataSource: ds,
			loading: true,
			data: null,
			date: initDate,
			currentMovieIndex: 0,
			currentDateIndex: 0,
		}
	}

	componentDidMount() {
		this.fetchData('');
	}

	render() {
		return (
			<View> 
				<BackNav navigator={this.props.navigator} />
				{this.state.loading ? this.loadingData() : this.renderInfo() }
			</View>
		)
	}

	loadingData() {
	//	console.log('fuck');
		return (
			<View style={styles.processBar}>
				<ProgressBarAndroid color='#e54847' styleAttr='Inverse' indeterminate={true} />
			</View>
		)
	}

	renderInfo() {
		var data = this.state.data;
		var List;
	//	console.log(this.state.dataSource);
	//	console.log(this.state.dataSource.cachedRowCount);
		if (this.state.dataSource._cachedRowCount == 0) {
			List = <View style={styles.emptyList}><Text>今天已无放映场次</Text></View>
		} else {
			List = <ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderData.bind(this)}
				/>
		}
		// map 注意要bind this ，不然this变成了window 
		return ( 
			<View style={styles.cinemaContainer}>
				<View style={styles.cinemaInfo}>
					<Text>{data.cinemaDetailModel.addr}</Text>
					<Text>{data.cinemaDetailModel.tel[0] || ''}</Text>
				</View>
				<View>
					<ScrollView style={styles.scrollImage} horizontal={true} >
						{data.movies.map(this.scrollImage.bind(this))} 
					</ScrollView>
				</View>
				<View style={styles.movieNameView}>
					<Text style={styles.movieNameText}>{data.movies[this.state.currentMovieIndex].nm}</Text>
				</View>
				<View>
					<ScrollView style={styles.scrollDate} horizontal={true} showsHorizontalScrollIndicator={false}>
						{data.Dates.map(this.scrollDate.bind(this))}
					</ScrollView>
				</View>
				{List}
			</View>
	
		)

	}

	renderData(data) {
		return (
			<View style={styles.movieContainer}>
				<Text style={styles.movieDetail, {flex:2}}>{data.tm} 至 {data.end}</Text>
				<Text style={styles.movieDetail, {flex: 1, textAlign: 'center'}}>{data.lang} {data.tp}</Text>
				<Text style={styles.movieDetail, {flex: 2, textAlign: 'right'}}>{data.th}</Text>
			</View>
		)
	}

	scrollImage(item, index) {
		return (
			<TouchableOpacity key={item.img} style={styles.movieImgView} onPress={() => this.pressImg(index, item.id)}>
				<Image style={styles.movieImg} source={{uri: item.img}}></Image>
			</TouchableOpacity>
		)
	}

	pressImg(index, _id) {
		this.setState({
			currentMovieIndex: index,
			currentDateIndex: 0
		});
		this.fetchData(_id);
	}

	scrollDate(item, index) {
		if (index == this.state.currentDateIndex) {
			return (
				<TouchableOpacity key={item.text} style={[styles.movieDate, styles.movieDateCur]}>
					<Text style={styles.movieDateText}>{item.text}</Text>
				</TouchableOpacity>
			)
		} else {
			return (
				<TouchableOpacity key={item.text} style={styles.movieDate} onPress={() => this.pressDate(index, item.slug)}>
					<Text>{item.text}</Text>
				</TouchableOpacity>
			)
		}
	}

	pressDate(index, _slug) {
		this.setState({
			currentDateIndex: index,
			dataSource: this.state.dataSource.cloneWithRows(this.state.data.DateShow[_slug]),
		});
	}

	fetchData(id) {
		var url = 'http://m.maoyan.com/showtime/wrap.json?cinemaid=' + this.props.id + '&movieid=' + id;
		fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((responseData) => {
			this.setState({
				loading: false,
				data: responseData.data,
				dataSource: this.state.dataSource.cloneWithRows(responseData.data.DateShow[initDate]),
			});
		});
	}
}

var styles = StyleSheet.create({
	processBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: height-80,
		backgroundColor: '#eee',
	},
	movieImgView: {
		paddingRight: 10,
	},
	movieImg: {
		width: 75,
		height: 104,
	},
	movieImgCur: {
		width: 75,
		height: 104,
		borderWidth: 2,
		borderColor: '#fff'
	},
	cinemaContainer: {
		flex: 1,
		backgroundColor: '#eee'
	},
	cinemaInfo: {
		padding: 10,
	},
	scrollImage: {
		backgroundColor: '#333',
		height: 124,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 3,
		paddingRight: 3,
		flexDirection: 'row',	
	},
	scrollDate: {
		height: 50,
		padding: 10,
		borderColor: '#ddd',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		flexDirection: 'row',
	},
	movieNameView: {
		padding: 10,
	},
	movieNameText: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	movieContainer: {
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		borderColor: '#eee',
		borderWidth: 1,
		backgroundColor: '#fff'
	},
	movieDetail: {
		fontSize: 14,
	},
	movieDate: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 5,
		paddingBottom: 8
	},
	movieDateCur: {
		backgroundColor: '#df2d2d',
		borderRadius: 18
	},
	movieDateText: {
		color: '#fff'
	}
});