import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

import classes from './TaskCard.module.css';

import Icon from '../../../utils/Icon';
import AddTask from '../Models/AddTask';

function Task({ data, parent, addTask }) {
	const [newTask, setNewTask] = useState(null);

	const [showAddNewTask, setShowAddNewTask] = useState(false);
	const handleAddNewTask = () => {
		setShowAddNewTask(!showAddNewTask);
	};

	const addNewTask = () => {
		const formNewTask = (
			<AddTask close={handleAddNewTask} action={setNewTask} />
		);
		return ReactDom.createPortal(
			formNewTask,
			document.getElementById('modal-hook')
		);
	};

	const doAction = () => {
		addTask(newTask, data, parent);
	};

	useEffect(() => {
		if (newTask) {
			doAction();
		}
	}, [newTask]);

	return (
		<React.Fragment>
			{showAddNewTask && addNewTask()}

			<div className={classes.task}>{data.name}</div>
			<Icon text='add_circle' action={handleAddNewTask} />
		</React.Fragment>
	);
}

export default Task;
