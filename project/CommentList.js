import {
	View,
	Text,
	StyleSheet,
	ProgressBarAndroid,
	Dimensions,
	ListView
} from 'react-native';
import React, {Component} from 'react';

import BackNav from './BackNav';
import Comment from './Comment';

var {height, width} = Dimensions.get('window');

var commentNum = 15;

export default class CommentList extends Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			loading: true,
			dataSource: ds
		}
	}
	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		var url = 'http://m.maoyan.com/mmdb/comments/movie/' + this.props.id + '.json?_v_=yes&offset=' + commentNum;
		fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((responseData) => {
			console.log(responseData.cmts);
			this.setState({
				loading: false,
				dataSource: this.state.dataSource.cloneWithRows(responseData.cmts)
			})
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<BackNav navigator={this.props.navigator}/>
				{this.state.loading ? this.loadingData() : this.renderInfo()}
			</View>
		)
	}

	loadingData() {
		return(
			<View style={styles.processBar}>
				<ProgressBarAndroid color='#e54847' styleAttr='Inverse' indeterminate={true} />
			</View>
		)
	}

	renderInfo() {
		return (
			<View style={styles.commentContainer}>
				<View style={styles.nav}>
					<Text>最新短评</Text>
				</View>
				<ListView
					dataSource = {this.state.dataSource}
					renderRow = {this.renderComment.bind(this)}
					onEndReached={this.renderMoreComment.bind(this)}
				/>
			</View>
		)
	}

	renderComment(data) {
		return (
			<Comment commentData={data} />
		)
	}

	renderMoreComment() {
		commentNum += 15;
		this.fetchData();
	}

};

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	processBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: height-80,
		backgroundColor: '#eee',
	},
	commentContainer: {
		flex: 1,
		backgroundColor: '#fff',
	},
	nav: {
		height: 30,
		padding: 10,
		justifyContent: 'center',
		backgroundColor: '#fff'
	},

})