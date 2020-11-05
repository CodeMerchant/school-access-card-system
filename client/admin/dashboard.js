import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import auth from "./../auth/auth-helper";
import { Redirect, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: theme.mixins.gutters({
		maxWidth: 600,
		margin: "auto",
		padding: theme.spacing(3),
		marginTop: theme.spacing(5),
	}),
	title: {
		marginTop: theme.spacing(3),
		color: theme.palette.protectedTitle,
	},
}));

export default function Admin({ match }) {
	const classes = useStyles();
	const [user, setUser] = useState({});
	const [redirectToSignin, setRedirectToSignin] = useState(false);
	const jwt = auth.isAuthenticated();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		read(
			{
				userId: match.params.userId,
			},
			{ t: jwt.token },
			signal
		).then((data) => {
			if (data && data.error) {
				setRedirectToSignin(true);
			} else {
				setUser(data);
			}
		});

		return function cleanup() {
			abortController.abort();
		};
	}, [match.params.userId]);

	if (redirectToSignin) {
		return <Redirect to="/signin" />;
	}
	return (
		<Paper className={classes.root} elevation={4}>
			<Typography variant="h4" className={classes.title}>
				Dashboard
			</Typography>
			<List dense>
				<ListItem>
					<Link to="/users">
						<Button style={isActive(history, "/users")}>Users</Button>
					</Link>
				</ListItem>
				<Divider />
				<ListItem>
					<Link to={"/user/" + auth.isAuthenticated().user._id}>
						<Button
							style={isActive(
								history,
								"/user/" + auth.isAuthenticated().user._id
							)}
						>
							My Profile
						</Button>
					</Link>
				</ListItem>
			</List>
		</Paper>
	);
}
