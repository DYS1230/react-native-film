import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	ProgressBarAndroid,
	ScrollView
} from 'react-native';
import React, { Component } from 'react';

import BackNav from './BackNav';

var {height, width} = Dimensions.get('window');

export default class FilmInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filmData: null,
			commentData: null,
			loading: true,
		}
	}

	componentDidMount() {
	//	var _this = this
	//	setTimeout(function() {
	//		_this.props.navigator.pop();
	//	},2000);
		this.fetchData();
	}

	fetchData() {
		var url = "http://m.maoyan.com/movie/" + this.props.id + ".json";
		fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((responseData) => {
			console.log(responseData);
			this.setState({
				filmData: responseData.data.MovieDetailModel,
				commentData: responseData.data.CommentResponseModel,
				loading: false
			})
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<BackNav navigator={this.props.navigator}/>
				{this.state.loading ? this.loadingData() : this.renderInfo() }
			</View>
		)
	}

	loadingData() {
		return (
			<View style={styles.processBar}>
				<ProgressBarAndroid color="#e54847" styleAttr="Inverse" indeterminate={true} />
			</View>
		)
	}

	renderInfo() {
		var data = this.state.filmData || {};
		var wishOrSc = data.preSale ? data.wish + '人想看' : data.sc + '分' + data.snum + '人评分';
		var dra = data.dra || "";
		dra = dra.replace(/<p>/, '').replace(/<\/p>/, '');
		/*
			data.ver不知道要怎么设置
		*/
		return (
			<ScrollView style={styles.infoContainer}>
				<View style={styles.filmContainer}>
					<View style={styles.filmDetail}>
						<Image source={{uri: data.img}} style={styles.filmImg} />
						<View style={styles.filmInfo}>
							<Text style={styles.name}>{data.nm}</Text>
							<View style={styles.verWrap}>
								<View style={styles.verView}>
									<Text style={styles.verText}>{data.ver}</Text>
								</View>
							</View>
							<Text style={styles.wishOrSc}>{wishOrSc}</Text>
							<Text style={styles.textLineHeight}>{data.cat}</Text>
							<Text style={styles.textLineHeight}>{data.src}/{data.dur}分钟</Text>
							<Text style={styles.textLineHeight}>{data.rt}</Text>
						</View>
					</View>
					<View style={styles.dra}>
						<Text>{dra}</Text>
					</View>
					<View style={styles.star}>
						<Text style={styles.starNav}>演员表</Text>
						<Text>{data.star}</Text>
					</View>
				</View>
				<View style={styles.commentContainer}></View>
			</ScrollView>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	processBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: height-80,
		backgroundColor: '#eee',
	},
	infoContainer: {
		flex: 1,
		backgroundColor: '#eee',
	},
	filmContainer: {
		flex: 1,
	},
	filmImg: {
		width: 108,
		height: 148,
		borderWidth: 1,
		borderColor: '#fff',
	},
	filmDetail: {
		flexDirection: 'row',
		height: 170,
		padding: 10,
		backgroundColor: '#55514c',
	},
	filmInfo: {
		flex: 1,
		paddingLeft: 10,
		flexDirection: 'column',		
	},
	name: {
		fontSize: 18,
		color: '#fff',
	},
	verWrap: {
		flexDirection: 'row',
	},
	verView: {
		backgroundColor: '#2895db',
		borderRadius: 2,
		paddingLeft: 5,
		paddingRight: 5,	
	},
	verText: {
		color: '#fff',
		fontSize: 10,		
	},
	wishOrSc: {
		color: '#ff9a00',
		fontSize: 18,
	},
	textLineHeight: {
		color: '#fff',
		lineHeight: 24		
	},
	dra: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 5,
		borderColor: '#e1e1e1',
		borderBottomWidth: 1,
		borderTopWidth: 1
	},
	star: {
		flex: 1,
		marginTop: 10,
		padding: 5,
		backgroundColor: '#fff',
		borderColor: "#e1e1e1",
		borderBottomWidth: 1,
		borderTopWidth: 1,
		flexDirection: 'column',
		marginBottom: 10
	},
	starNav: {
		lineHeight: 30
	},
	commentContainer: {
		flex: 1,
	},
});