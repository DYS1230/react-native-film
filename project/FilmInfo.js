import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	ProgressBarAndroid,
	ScrollView,
	ListView,
	TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';

import BackNav from './BackNav';
import Comment from './Comment';
import CommentList from './CommentList';

var {height, width} = Dimensions.get('window');

export default class FilmInfo extends Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			filmData: null,
			commentData: ds,
			loading: true,
		}
	//	console.log(this.props.id);
	}

	componentDidMount() {
	//	var _this = this
	//	setTimeout(function() {
	//		_this.props.navigator.pop();
	//	},2000);
		this.fetchData();
	}

	fetchData() {
		var url = 'http://m.maoyan.com/movie/' + this.props.id + '.json';
		fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((responseData) => {
	//		console.log(responseData.data.MovieDetailModel);
			this.setState({
				filmData: responseData.data.MovieDetailModel,
				commentData: this.state.commentData.cloneWithRows(responseData.data.CommentResponseModel.hcmts),
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
				<ProgressBarAndroid color='#e54847' styleAttr='Inverse' indeterminate={true} />
			</View>
		)
	}

	renderInfo() {
		var data = this.state.filmData || {};
		var wishOrSc = data.preSale ? data.wish + '人想看' : data.sc + '分' + data.snum + '人评分';
		var dra = data.dra || '';
		dra = dra.replace(/<p>/, '').replace(/<\/p>/, '');
		var star = data.star || '';
		star = star.replace(/\s*null\s*/g, '  ').replace(/\s{4,}/g, '   ');
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
						<Text>{star}</Text>
					</View>
				</View>
				<View style={styles.commentContainer}>
					<Text style={styles.commentNav}>热门短评</Text>
					<ListView 
						dataSource = {this.state.commentData}
						renderRow = {this.renderComment.bind(this)}
					/>
					<TouchableOpacity style={styles.commentButton} onPress={() => this.renderMoreComment(this.props.id)}>
						<Text style={styles.commentButtonText}>查看全部评论</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}

	renderComment(data) {
		return (
			<Comment commentData={data} />
		)
	}

	renderMoreComment(id) {
	//	console.log(id);
		this.props.navigator.push({
			component: CommentList,
			params: {
				id: id
			}
		});
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
		padding: 10,
		borderColor: '#e1e1e1',
		borderBottomWidth: 1,
		borderTopWidth: 1
	},
	star: {
		flex: 1,
		marginTop: 10,
		padding: 10,
		backgroundColor: '#fff',
		borderColor: '#e1e1e1',
		borderBottomWidth: 1,
		borderTopWidth: 1,
		marginBottom: 10
	},
	starNav: {
		lineHeight: 30,
	},
	commentContainer: {
		flex: 1,
		backgroundColor: '#fff',
		borderColor: '#e1e1e1',
		borderBottomWidth: 1,
		borderTopWidth: 1,
		marginBottom: 10
	},
	commentNav: {
		margin: 10,
	},
	commentButton: {
		borderTopWidth: 1,
		borderColor: '#e1e1e1',
		justifyContent: 'center',
		alignItems: 'center',
		height: 40,
	},
	commentButtonText: {
		color: '#e54847',
		fontSize: 14,
	}
});