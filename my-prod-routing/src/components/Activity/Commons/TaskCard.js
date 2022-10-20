import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

import classes from './TaskCard.module.css';

import Icon from '../../../utils/Icon';
import AddTask from '../Models/AddTask';

function Task({ data, parent, addTask, deleteTask }) {
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

			<div className={classes.task}>
				{!parent.isModel && (
					<div className={`${classes.controlls} ${classes.c_top}`}>
						<Icon text='app_registration' />
						<Icon text='delete' />
					</div>
				)}
				{data.name}
				{parent.isModel ? (
					<div className={`${classes.controlls} ${classes.c_bottom}`}>
						{' '}
						<Icon
							text={'delete'}
							action={() => {
								deleteTask(parent._id, data._id);
							}}
						/>
					</div>
				) : (
					<div className={`${classes.controlls} ${classes.c_bottom}`}>
						<Icon text='play_circle' />
						<Icon text='stop_circle' />
					</div>
				)}
			</div>
			<Icon text='add_circle' action={handleAddNewTask} />
		</React.Fragment>
	);
}

export default Task;
