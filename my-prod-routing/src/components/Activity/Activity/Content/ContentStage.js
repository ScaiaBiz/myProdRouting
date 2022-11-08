import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

import classes from './ContentStage.module.css';

import { millisecondsToHourMin } from '../../../../lib/functrions';

import Icon from '../../../../utils/Icon';
import ContentTask from './ContentTask';
import AddTask from '../../Models/AddTask';

function ContentStage({
	data,
	addStage,
	addTask,
	setLastStageData,
	deleteStage,
	deleteTask,
	start,
}) {
	const insterStage = () => {
		setLastStageData(data);
		addStage();
	};

	// const [stageData, setStageData] = useState(data);

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

	const getDedicatedTime = () => {
		let time = 0;
		data.tasks.map(task => {
			time += task.task.workedTime;
		});
		return millisecondsToHourMin(time);
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
					{data?.stage?.description}
					<div className={classes.stageDedicatedTime}>
						{/* Dedicato: {getDedicatedTime()} */}
					</div>
					<Icon
						text={'delete'}
						action={() => {
							deleteStage(data.stage._id);
						}}
					/>
				</div>

				<div className={classes.tasks}>
					<Icon text='add_circle' action={handleAddNewTask} />
					{data &&
						data.tasks.map(task => {
							return (
								<ContentTask
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

export default ContentStage;
