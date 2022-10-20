import React from 'react';

import classes from './ActivityCard.module.css';

function ActivityCard({ data }) {
	return (
		<div className={classes.container}>
			<div className={classes.name}>{data.name}</div>
			<div className={classes.description}>{data.description}</div>
		</div>
	);
}

export default ActivityCard;
