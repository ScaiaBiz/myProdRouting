import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { NavLink } from 'react-router-dom';

import classes from './Tasks.module.css';

import { useHttpClient } from '../../hooks/http-hooks';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorModal from '../../utils/ErrorModal';

import Icon from './../../utils/Icon';
import AddElement from '../../utils/AddElement';
import CardActivitySettings from './Commons/CardActivitySettings';
import FormAddSettings from './Commons/FormAddSettings';

function Tasks() {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [taskCards, setTaskCards] = useState(null);
	const [tasksData, setTasksData] = useState(null);

	const [showAddTask, setShowAddTask] = useState(null);
	const handleAddTask = () => {
		setShowAddTask(!showAddTask);
	};

	const addNewTask = () => {
		const newTask = (
			<FormAddSettings
				label='Aggiungi Task'
				action={postNewTask}
				close={handleAddTask}
			/>
		);
		return ReactDom.createPortal(
			newTask,
			document.getElementById('modal-hook')
		);
	};

	const postNewTask = async value => {
		const data = await sendRequest(
			'prodRouting/Tasks/addToSettings',
			'POST',
			{
				value: { description: value, isActive: true, id: Date.now() },
			},
			{
				'Content-Type': 'application/json',
			}
		);
		setTasksData(data);
	};

	const toggleVisibility = async id => {
		const data = await sendRequest(`prodRouting/Tasks/toggleVisibility/${id}`);
		return data;
	};

	const getTasks = async () => {
		const taskList = await sendRequest('prodRouting/Tasks/getListFromSettings');
		setTasksData(taskList);
	};

	const writeTaskCards = () => {
		const visual = tasksData.map(t => {
			return (
				<CardActivitySettings data={t} toggleVisibility={toggleVisibility} />
			);
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
			{showAddTask && addNewTask()}
			<div className={classes.container}>
				<div className={classes.header}>
					<NavLink to={'/Activity'}>
						<div className={classes.backArrow}>
							<Icon text='arrow_back' />{' '}
						</div>
					</NavLink>
					| Tasks
				</div>
				<AddElement action={handleAddTask}>Aggiungi task</AddElement>
				<section className={classes.cardList}>{taskCards}</section>
			</div>
		</React.Fragment>
	);
}

export default Tasks;
