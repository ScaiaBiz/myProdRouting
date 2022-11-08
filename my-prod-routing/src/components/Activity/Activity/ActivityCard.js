import React, { useState } from 'react';

import classes from './ActivityCard.module.css';

import Icon from '../../../utils/Icon';

function ActivityCard({ data, deleteActivity, setSelectedActivity }) {
	const doAction = () => {
		setSelectedActivity(null);
		deleteActivity(data._id);
	};

	const select = () => {
		// setHide(classes.isSelected);
		setSelectedActivity(data);
	};

	return (
		<div
			id={data._id}
			className={`${classes.container} ${
				data.isSelected && classes.isSelected
			}`}
			onClick={select}
		>
			<div className={classes.description}>{data.description}</div>
			<div className={classes.modelName}>{data.modelName}</div>
			<div className={classes.controlls}>
				<Icon text='delete' action={doAction} cls={'stopped'} />
				{/* <Icon text='flag' action={select} /> */}
			</div>
		</div>
	);
}

export default ActivityCard;
