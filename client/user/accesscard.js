import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import PrintIcon from '@material-ui/icons/Print';
import Typography from "@material-ui/core/Typography";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";
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



export default function AccessCard({ match }) {
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
		<div style={{display: "block"}}>
        <Paper className={classes.root} elevation={4}>
			<Typography variant="h6" className={classes.title}>
				Lynx Institute of Technology
			</Typography>
			<List dense>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<Person />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={user.name} secondary={user.email} />{" "}
				</ListItem>
				<ListItem>
					<ListItemText primary={"Student Number: " + user.studentNum} />
				</ListItem>
				<ListItem>
					<ListItemText primary={"ID Number: " + user.studentIDNum} />
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText primary={"Accessed & Printed: " + new Date()} />
				</ListItem>
			</List>
            <div style={  {display: "block"}}>
            <Button  variant="contained" color="primary" onClick={() => window.print()}><PrintIcon/></Button>
            </div>
		</Paper>
        </div>
	);
}
