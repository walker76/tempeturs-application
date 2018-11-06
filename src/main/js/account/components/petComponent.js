import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getPet} from 'js/api/petAPI';
import {UpdatePetForm} from 'js/forms/updatePetForm';
import * as Bessemer from 'js/alloy/bessemer/components';

const styles = theme => ({
	card: {
		maxWidth: 400,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	actions: {
		display: 'flex',
	},
	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
		marginLeft: 'auto',
		[theme.breakpoints.up('sm')]: {
			marginRight: -8,
		},
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
});

class PetComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {id: '', name: '', type: '', expanded: false};
		this.deletePet = this.deletePet.bind(this);
		this.makeAppointment = this.makeAppointment.bind(this);
	}

	componentDidMount() {
		getPet(this.props.petKey)
			.then(
				(response) => {
					this.setState({
						id: response['id'],
						name: response['name'],
						type: response['type']
					});
				}).catch((error) => {
			alert(error);
		});
	}

	deletePet(){
		let updatedUser = this.props.user;

		for( let i = 0; i < updatedUser['petIds'].length - 1; i++){
			if ( updatedUser['petIds'][i] === this.props.petKey) {
				updatedUser['petIds'].splice(i, 1);
			}
		}

		return this.props.updateUser(updatedUser);
	}

	makeAppointment(){
		this.props.callBack(this.props.petKey);
	}

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	render() {
		const { classes } = this.props;

		return (
			<Card className={classes.card}>
				<CardHeader
					title={this.state.name}
					subheader={this.state.type}
				/>
				<CardContent>
					<Typography component="p">
						This impressive paella is a perfect party dish and a fun meal to cook together with your
						guests. Add 1 cup of frozen peas along with the mussels, if you like.
					</Typography>
				</CardContent>
				<CardActions className={classes.actions} disableActionSpacing>
					<IconButton
						className={classnames(classes.expand, {
							[classes.expandOpen]: this.state.expanded,
						})}
						onClick={this.handleExpandClick}
						aria-expanded={this.state.expanded}
						aria-label="Show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography paragraph>Method:</Typography>
						<UpdatePetForm petKey={this.props.petKey}/>
						<Bessemer.Button onClick={this.makeAppointment}>Make an Appointment</Bessemer.Button>
						<Bessemer.Button onClick={this.deletePet}>Delete</Bessemer.Button>
					</CardContent>
				</Collapse>
			</Card>
		);
	}
}

PetComponent.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PetComponent);