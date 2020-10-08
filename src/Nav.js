import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
	const [scroll, setScroll] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScroll(window.scrollY > 100);
		});
	}, []);

	return (
		<div className={`nav ${scroll && "nav__black"}`}>
			<img
				className="nav__logo"
				src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
				alt=""
			/>
			<img
				className="nav__avatar"
				src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
				alt="Netflix Logo"
			/>
		</div>
	);
}

export default Nav;
