import React from 'react';

export class Landing extends React.Component {
	render() {
		return (
			<header className="header" id="header">
				{/* This is the HTML that gets rendered on the screen
			  	  * href is how you tell the a tag where to redirect (hyperlink reference)
			      * In React these hrefs get mapped into urls in the HashRouter
			      */}
				<a className="loginlink link animated fadeInUp delay-1s servicelink" href="#login">Login</a>

				<div className="container">
					<figure className="logo animated fadeInDown delay-07s">

					</figure>
					<h1 className="animated fadeInDown delay-07s">Welcome To Tempeturs</h1>
					<ul className="we-create animated fadeInUp delay-1s">
						<li>Tailored to the modern pet owner.</li>
					</ul>
					<a className="link animated fadeInUp delay-1s servicelink" href="#registerOwner">Register Owner</a>
					<a className="link animated fadeInUp delay-1s servicelink" href="#registerSitter">Register Sitter</a>
				</div>
			</header>
		);
	}
}