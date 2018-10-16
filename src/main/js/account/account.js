import React from 'react';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/api/usersAPI';
import {NavComponent} from 'js/account/components/navcomponent';
import {Logout} from 'js/account/logout';
import { Redirect } from 'react-router-dom';

class Account extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			component: ''
		};
		//subcomponent lets you switch between different states
		this.setSubComponent = this.setSubComponent.bind(this);
        this.renderSubComponent = this.renderSubComponent.bind(this);
	}

	renderSubComponent(){
	    let component = (<div></div>);
		if (this.state.component === 'Update User'){
		    component = (<Redirect to='/account/updateUser' />);
		} else if (this.state.component === 'Calendar'){
            component = (<Redirect to='/account/calendar' />);
		} else if (this.state.component === 'Availability'){
            component = (<Redirect to='/account/availability' />);
		} else if (this.state.component === 'Pets') {
            component = (<Redirect to='/account/pets'/>);
        }else if (this.state.component === 'Appointment'){
		    component = (<Redirect to='/account/appointment'/>);
		} else if (this.state.component === 'Notifications'){
			component = (<Redirect to='/account/notifications'/>);
		}else if (this.state.component === 'Logout'){
            component = (<Redirect to='/' />);
		}
		return component;
	}

	setSubComponent(variable){
		this.setState({
			component: variable
		});
	}

	render() {
		return (
			<div>
                {this.renderSubComponent()}
				<div className='accContainer'>
					<div className='innerAccContainer'>
						{_.isDefined(this.props.user) &&
						<div>
							<label>Name: {this.props.user.name}</label>
							<br/>
							<label>Email: {this.props.user.principal}</label>
							<br/>
							<label>Phone: {this.props.user.phoneNumber}</label>
						</div>
						}
					</div>

                    {/*this gives back subcomponent*/}
					<div className='innerBodyContainer'>
                        {this.props.children}
					</div>

					<div className='innerNavContainer'>
                        {_.isDefined(this.props.user) && this.props.user.type === 'OWNER' &&
                            <NavComponent callBack={this.setSubComponent} name='Pets'/>
                        }
                        {_.isDefined(this.props.user) && this.props.user.type === 'SITTER' &&
                        <NavComponent callBack={this.setSubComponent} name='Availability'/>
                        }
                        <NavComponent callBack={this.setSubComponent} name='Calendar'/>
                        <NavComponent callBack={this.setSubComponent} name='Update User'/>
                        <NavComponent callBack={this.setSubComponent} name='Appointment'/>
						<NavComponent callBack={this.setSubComponent} name='Notifications'/>

                        <Logout callBack={this.setSubComponent} name='Logout'/>
					</div>
				</div>
			</div>

		);
	}
}

Account = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state),
	}),
    dispatch => ({
        refresh: () => dispatch(Users.Actions.refresh())
    })
)(Account);

export { Account };