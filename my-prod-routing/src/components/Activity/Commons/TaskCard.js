import React from 'react';

import classes from './TaskCard.module.css';

import Icon from '../../../utils/Icon';

function Task({ data, parent, addTask }) {
	return (
		<React.Fragment>
			<div className={classes.task}>{data.name}</div>
			<Icon
				text='add_circle'
				action={() => {
					addTask(data, parent);
				}}
			/>
		</React.Fragment>
	);
}

export default Task;
