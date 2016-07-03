import {
	View,
	Text,
	Image,
	StyleSheet,
} from 'react-native';
import React, {Component} from 'react';



export default class Comment extends Component {
	constructor(props) {
		super(props);
	}
	
	/*
		注意：statIcon在star此数组里，每个icon需要有unique key
	*/
	render() {
	//	console.log(this.props.commentData);
		var data = this.props.commentData;
		var score = data.score;
		var isInteger = Number.isInteger(score);
		var lightStar = Number.parseInt(score);
		var darkStar = Number.parseInt(5 - lightStar);
		var star = [];
		for (var i = 0; i < lightStar; i++) {
			var starIcon = <Image key={'lightStar'+i} source={require('../images/star.png') } style={styles.starIcon} />;
			star.push(starIcon);
		};
		if (!isInteger) {
			var starIcon = <Image key={isInteger} source={require('../images/star1.png') } style={styles.starIcon} />;
			star.push(starIcon);			
		};
		for (var i = 0; i < darkStar; i++) {
			var starIcon = <Image key={'darkStar'+i} source={require('../images/star2.png') } style={styles.starIcon} />;
			star.push(starIcon);
		};
		return (
			<View style={styles.container}>
				<View style={styles.starHeader}>
					<View style={styles.starContainer}>
						{star}
					</View>
					<Text style={styles.time}>{data.time}</Text>
				</View>
				<Text style={styles.commentText}>{data.content}</Text>
				<View style={styles.user}>
					<Image source={{ uri: data.avatarurl }} style={styles.avatar}></Image>
					<Text style={styles.name}>{data.nickName}</Text>
				</View>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	starIcon: {
		width: 10,
		height: 10,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20
	},
	container: {
		padding: 10,
		borderTopWidth: 1,
		borderColor: '#e1e1e1',
	},
	starHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	starContainer: {
		flexDirection: 'row',
	},
	time: {
		marginLeft: 5
	},
	commentText: {
		marginTop: 10,
		marginBottom: 10,
		fontSize:16,		
	},
	user: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	name: {
		marginLeft: 10
	}

})