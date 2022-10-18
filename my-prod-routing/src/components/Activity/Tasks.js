import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Tasks.module.css';

import { useHttpClient } from '../../hooks/http-hooks';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorModal from '../../utils/ErrorModal';

import Icon from './../../utils/Icon';

function Tasks() {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [taskCards, setTaskCards] = useState(null);
	const [tasksData, setTasksData] = useState(null);

	const [showAddTask, setShowAddTask] = useState(null);
	const handleAddTask = () => {
		setShowAddTask(!showAddTask);
		postNewTask({
			description: ' Prova 2',
		});
	};

	const postNewTask = async value => {
		const data = await sendRequest(
			'prodRouting/Task/addToSettings',
			'POST',
			{
				value: value,
			},
			{
				'Content-Type': 'application/json',
			}
		);
		setTasksData(data);
	};

	const getTasks = async () => {
		const taskList = await sendRequest('prodRouting/Task/getListFromSettings');
		setTasksData(taskList);
	};

	const writeTaskCards = () => {
		const visual = tasksData.map(t => {
			return <p>{t.description}</p>;
		});
		setTaskCards(visual);
	};

	useEffect(() => {
		if (tasksData) {
			writeTaskCards();
		}
	}, [tasksData]);

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<React.Fragment>
			{error && <ErrorModal error={error} onClear={clearError} />}
			{isLoading && <LoadingSpinner asOverlay />}
			<div className={classes.container}>
				<div className={classes.header}>
					<div className={classes.backArrow}>
						<NavLink to={'/Activity'}>
							<Icon text='arrow_back' />{' '}
						</NavLink>
					</div>
					| Tasks
				</div>
				<div className={classes.addTask} onClick={handleAddTask}>
					Aggiungi task
				</div>
				{taskCards}
			</div>
		</React.Fragment>
	);
}

export default Tasks;
