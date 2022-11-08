import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

import classes from './ActivityContent.module.css';

import { millisecondsToHourMin } from '../../../lib/functrions';

import { useHttpClient } from '../../../hooks/http-hooks';
import LoadingSpinner from '../../../utils/LoadingSpinner';
import ErrorModal from '../../../utils/ErrorModal';

import ContentStage from './Content/ContentStage';
import Icon from '../../../utils/Icon';

import AddStage from '../Models/AddStage';

function ActivityContent({ data, setData }) {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [activityData, setActivityData] = useState(data);

	const [lastStageData, setLastStageData] = useState(null);
	const [showAddNewStage, setShowAddNewStage] = useState(false);
	const handleAddNewStage = () => {
		setShowAddNewStage(!showAddNewStage);
	};
	const createFirstStage = () => {
		setLastStageData('first');
		handleAddNewStage();
	};

	const addNewStage = () => {
		const formNewStage = (
			<AddStage close={handleAddNewStage} action={postNewStage} />
		);
		return ReactDom.createPortal(
			formNewStage,
			document.getElementById('modal-hook')
		);
	};

	const postNewStage = async el => {
		let sequenceNo = 9000;
		if (lastStageData !== 'first') {
			sequenceNo = lastStageData.no + 500;
		}

		console.log(sequenceNo);

		const res = await sendRequest(
			'prodRouting/Activitis/addStage',
			'POST',
			{
				activityId: data._id,
				name: el.description,
				no: sequenceNo,
			},
			{
				'Content-Type': 'application/json',
			}
		);
		setData(res);
	};

	const deleteStage = async stageId => {
		const res = await sendRequest(
			'prodRouting/Activitis/deleteStage',
			'POST',
			{ activityId: data._id, stageId: stageId },
			{
				'Content-Type': 'application/json',
			}
		);
		setData(res);
	};

	const deleteTask = async (stageId, taskId) => {
		const res = await sendRequest(
			'prodRouting/Activitis/deleteTask',
			'POST',
			{ activityId: data._id, stageId: stageId, taskId: taskId },
			{
				'Content-Type': 'application/json',
			}
		);
		setData(res);
	};

	//fixme:
	const addTask = async (el, prevElement, parent) => {
		let sequenceNo = 9000;
		if (prevElement !== 'first') {
			sequenceNo = prevElement.no + 500;
		}
		const res = await sendRequest(
			'prodRouting/Activitis/addTask',
			'POST',
			{
				activityId: data._id,
				stageId: parent._id,
				name: el.description,
				no: sequenceNo,
			},
			{
				'Content-Type': 'application/json',
			}
		);
		setData(res);
	};

	const writeRoutesCards = () => {
		const visuals = data.stages?.map(stage => {
			return (
				<ContentStage
					key={stage._id}
					data={stage}
					addStage={handleAddNewStage}
					addTask={addTask}
					setLastStageData={setLastStageData}
					deleteStage={deleteStage}
					deleteTask={deleteTask}
				/>
			);
		});
		const firstElement = (
			<div className={classes.insertFirstStage}>
				<Icon text='add_circle' action={createFirstStage} />
			</div>
		);

		visuals.unshift(firstElement);

		return visuals;
	};

	const getTotalTime = () => {
		let time = 0;
		data.stages?.map(stage => {
			console.log(stage);
			stage.tasks.map(task => {
				time += task.task.workedTime;
			});
		});
		return millisecondsToHourMin(time);
	};

	useEffect(() => {
		if (activityData) {
			writeRoutesCards();
		}
	}, [activityData]);

	return (
		<React.Fragment>
			{error && <ErrorModal error={error} onClear={clearError} />}
			{isLoading && <LoadingSpinner asOverlay />}
			{showAddNewStage && addNewStage()}
			{data && (
				<div className={classes.container}>
					<div className={classes.header}>{data.description}</div>
					<div className={classes.stages}>{writeRoutesCards()}</div>
					<div className={classes.totTime}>
						{/* Totale dedicato: {getTotalTime()} */}
					</div>
				</div>
			)}
		</React.Fragment>
	);
}

export default ActivityContent;
