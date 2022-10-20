import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

import classes from './StageCard.module.css';

import Icon from '../../../utils/Icon';
import TaskCard from './TaskCard';
import AddTask from '../Models/AddTask';

function StageCard({
	data,
	addStage,
	addTask,
	setLastStageData,
	deleteStage,
	deleteTask,
}) {
	const insterStage = () => {
		setLastStageData(data);
		addStage();
	};

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

	const createFirstTask = () => {
		addTask(newTask, 'first', data);
	};

	useEffect(() => {
		if (newTask) {
			createFirstTask();
		}
	}, [newTask]);

	return (
		<React.Fragment>
			{showAddNewTask && addNewTask()}
			<div key={data._id} className={classes.stage}>
				<div className={classes.stageName}>
					{data.name}{' '}
					<Icon
						text={'delete'}
						action={() => {
							deleteStage(data._id);
						}}
					/>
				</div>

				<div className={classes.tasks}>
					<Icon text='add_circle' action={handleAddNewTask} />
					{data &&
						data.tasks.map(task => {
							return (
								<TaskCard
									key={task._id}
									data={task}
									parent={data}
									addTask={addTask}
									deleteTask={deleteTask}
								/>
							);
						})}
				</div>
			</div>
			<Icon text='add_circle' action={insterStage} />
		</React.Fragment>
	);
}

export default StageCard;
