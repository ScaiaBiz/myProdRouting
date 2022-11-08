import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

import classes from './ContentTask.module.css';

import { millisecondsToHourMin } from '../../../../lib/functrions';

import { useHttpClient } from '../../../../hooks/http-hooks';
import LoadingSpinner from '../../../../utils/LoadingSpinner';
import ErrorModal from '../../../../utils/ErrorModal';

import Icon from '../../../../utils/Icon';
import AddTask from '../../Models/AddTask';

function ContentTask({ data, parent, addTask, deleteTask }) {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [taskStatus, setTaskStatus] = useState(data);

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
		addTask(newTask, taskStatus, parent);
	};

	useEffect(() => {
		if (newTask) {
			doAction();
		}
	}, [newTask]);

	const postPlay = async () => {
		const res = await sendRequest(
			`prodRouting/Tasks/play/${taskStatus.task._id}`
		);

		console.log(res);
		setTaskStatus({ ...taskStatus, task: res });
	};
	const postPause = async () => {
		const res = await sendRequest(
			`prodRouting/Tasks/pause/${taskStatus.task._id}`
		);
		setTaskStatus({ ...taskStatus, task: res });
	};

	const postDone = async () => {
		const res = await sendRequest(
			`prodRouting/Tasks/done/${taskStatus.task._id}`
		);
		setTaskStatus({ ...taskStatus, task: res });
	};

	const postManual = async () => {
		console.log(taskStatus);
	};

	const getTaskContent = () => {
		if (parent.isModel) {
			// --------> MODELLO
			return (
				<div className={`${classes.task} ${classes[taskStatus.task.status]}`}>
					<div className={classes.description}>{taskStatus.description}</div>
					<div className={`${classes.controlls} ${classes.c_bottom}`}>
						<Icon
							text={'delete'}
							action={() => {
								deleteTask(parent._id, taskStatus._id);
							}}
						/>
					</div>
				</div>
			);
		} else {
			//-----------> Attività in corso
			//fixme: Rimunovere _ nella valutazione classe del controllo top
			return (
				<div className={`${classes.task} ${classes[taskStatus.task.status]}`}>
					<div
						className={`${classes.controlls} ${classes.c_top} ${
							classes[taskStatus.task.status + 'b_']
						}`}
					>
						<Icon text='app_registration' action={postManual} cls={'todo'} />
						<Icon
							text='delete'
							cls='everStopped'
							action={() => {
								deleteTask(parent._id, taskStatus.task?._id);
							}}
						/>
					</div>
					<div className={classes.description}>
						{taskStatus.task?.description}
					</div>
					<div className={classes.dedicatedTime}>
						Dedicato: {millisecondsToHourMin(taskStatus.task?.workedTime)}
					</div>
					<div
						className={`${classes.controlls} ${classes.c_bottom} ${
							classes[taskStatus.task.status + 'b']
						}`}
					>
						{taskStatus.task.status == 'ONGOING' ? (
							<Icon text='pause_circle' action={postPause} cls={'paused'} />
						) : (
							<Icon text='play_circle' action={postPlay} cls={'ongoing'} />
						)}
						<Icon text='check_circle' action={postDone} cls={'stopped'} />
					</div>
				</div>
			);
		}
	};

	return (
		<React.Fragment>
			{error && <ErrorModal error={error} onClear={clearError} />}
			{isLoading && <LoadingSpinner asOverlay />}
			{showAddNewTask && addNewTask()}
			{getTaskContent()}
			<Icon text='add_circle' action={handleAddNewTask} />
		</React.Fragment>
	);
}

export default ContentTask;
