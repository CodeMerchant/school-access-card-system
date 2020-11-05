import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Library from "@material-ui/icons/LocalLibrary";
import PeopleIcon from "@material-ui/icons/People";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
	if (history.location.pathname == path) return { color: "#ff4081" };
	else return { color: "#ffffff" };
};

const isPartActive = (history, path) => {
	if (history.location.pathname.includes(path))
		return { color: "#FFFFFF", backgroundColor: "#000000", marginRight: 10 };
	else
		return {
			color: "#FFFFFF",
			backgroundColor: "#000000",
			border: "#000000",
			marginRight: 10,
		};
};

const Menu = withRouter(({ history }) => (
	<AppBar position="static">
		<Toolbar>
			<Typography variant="h6" color="inherit">
				LACS
			</Typography>
			<Link to="/">
				<IconButton aria-label="Home" style={isActive(history, "/")}>
					<HomeIcon />
				</IconButton>
			</Link>

			{!auth.isAuthenticated() && (
				<span>
					<Link to="/signin">
						<Button style={isActive(history, "/signin")}>Sign In</Button>
					</Link>
				</span>
			)}
			{auth.isAuthenticated() && (
				<span>
					{auth.isAuthenticated().user.admin && (
						<Link>
							<Button style={isPartActive(history, "/admin/")}>
								<VisibilityIcon /> Admin View
							</Button>
						</Link>
					)}
					{auth.isAuthenticated().user.admin && (
						<Link to="/users">
							<Button style={isPartActive(history, "/admin/")}>
								<PeopleIcon /> Users
							</Button>
						</Link>
					)}
					{auth.isAuthenticated().user.admin && (
						<Link to="/signup">
							<Button style={isPartActive(history, "/admin/")}>
								{" "}
								{/*try /signup/ */}
								<PersonAddIcon /> Add new User
							</Button>
						</Link>
					)}
					{!auth.isAuthenticated().user.admin && (
						<Link>
							<Button
								style={isActive(
									history,
									"/user/" + auth.isAuthenticated().user._id
								)}
							>
								<VisibilityIcon /> Student View
							</Button>
						</Link>
					)}

					{!auth.isAuthenticated().user.admin && (
						<Link to={"/student/" + auth.isAuthenticated().user._id}>
							<Button
								style={isActive(
									history,
									"/user/" + auth.isAuthenticated().user._id
								)}
							>
								My Profile
							</Button>
						</Link>
					)}

					{auth.isAuthenticated().user.admin && (
						<Link to={"/admin/" + auth.isAuthenticated().user._id}>
							<Button
								style={isActive(
									history,
									"/user/" + auth.isAuthenticated().user._id
								)}
							>
								Profile
							</Button>
						</Link>
					)}

					<Button
						color="inherit"
						onClick={() => {
							auth.clearJWT(() => history.push("/"));
						}}
					>
						Sign out
					</Button>
				</span>
			)}
		</Toolbar>
	</AppBar>
));

export default Menu;
