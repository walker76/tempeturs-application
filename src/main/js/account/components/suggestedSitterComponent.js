import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/api/usersAPI';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	card: {
		maxWidth: 400,
        minWidth: 400
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	actions: {
		display: 'flex',
	}
});

class SuggestedSitterComponent extends React.Component {

	render() {
		const { classes } = this.props;

		let rating = 'No rating available';
		if(this.props.sitter.rating !== null && this.props.sitter.rating > 0){
			rating = this.props.sitter.rating;
		}

		return (
			<Card className={classes.card}>
				<CardHeader
					title={this.props.sitter.userDto['name']}
				/>
				<CardContent>
					<Typography component='p'>
						Rating: {rating}
					</Typography>
					<Typography component='p'>
						Email: {this.props.sitter.userDto['principal']}
					</Typography>
					<Typography component='p'>
						Phone Number: {this.props.sitter.userDto['phoneNumber']}
					</Typography>
					<Typography component='p'>
						Distance: {this.props.sitter.distance}
					</Typography>
				</CardContent>
			</Card>
		);
	}
}

SuggestedSitterComponent.propTypes = {
	classes: PropTypes.object.isRequired,
};


{/* Connect to the Redux store to have access to the user data */}
SuggestedSitterComponent = connect(
	state => ({
		user: Users.State.getUser(state),
	})
)(SuggestedSitterComponent);

export default withStyles(styles)(SuggestedSitterComponent);