import React, { useState } from 'react';
import ReactDom from 'react-dom';

import classes from './ModelCard.module.css';

import { useHttpClient } from '../../../hooks/http-hooks';
import LoadingSpinner from '../../../utils/LoadingSpinner';
import ErrorModal from '../../../utils/ErrorModal';

import Icon from '../../../utils/Icon';
import StageCard from '../Commons/StageCard';
import AddStage from './AddStage';
import NewActivity from '../Activity/NewActivity';

function ModelCard({ data, reload }) {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

		await sendRequest(
			'prodRouting/Models/addStage',
			'POST',
			{
				modelId: data._id,
				name: el.description,
				no: sequenceNo,
			},
			{
				'Content-Type': 'application/json',
			}
		);

		reload();
	};

	const addTask = async (el, prevElement, parent) => {
		let sequenceNo = 9000;
		if (prevElement !== 'first') {
			sequenceNo = prevElement.no + 500;
		}
		await sendRequest(
			'prodRouting/Models/addTask',
			'POST',
			{
				modelId: data._id,
				stageId: parent._id,
				name: el.description,
				no: sequenceNo,
			},
			{
				'Content-Type': 'application/json',
			}
		);

		reload();
	};

	const [showCreateActivity, setShowCreateActivity] = useState(false);
	const handleShowCreateActivity = () => {
		setShowCreateActivity(!showCreateActivity);
	};

	const addNewActivity = () => {
		const formNewActivity = (
			<NewActivity
				modelData={data}
				close={handleShowCreateActivity}
				action={createActivity}
			/>
		);
		return ReactDom.createPortal(
			formNewActivity,
			document.getElementById('modal-hook')
		);
	};

	const createActivity = async (modelId, description, dueDate) => {
		console.log('Mando richiesta');
		const res = await sendRequest(
			'prodRouting/Models/createActivity',
			'POST',
			{
				modelId: modelId,
				description: description,
				dueDate: new Date(dueDate),
			},
			{
				'Content-Type': 'application/json',
			}
		);
		console.log(res);
	};

	const writeRoutesCards = () => {
		const visuals = data.route.stages.map(stage => {
			return (
				<StageCard
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

	const deleteModel = async () => {
		await sendRequest(
			'prodRouting/Models/deleteModel',
			'POST',
			{ modelId: data._id },
			{
				'Content-Type': 'application/json',
			}
		);
		reload();
	};

	const deleteStage = async stageId => {
		await sendRequest(
			'prodRouting/Models/deleteStage',
			'POST',
			{ modelId: data._id, stageId: stageId },
			{
				'Content-Type': 'application/json',
			}
		);
		reload();
	};
	const deleteTask = async (stageId, taskId) => {
		await sendRequest(
			'prodRouting/Models/deleteTask',
			'POST',
			{ modelId: data._id, stageId: stageId, taskId: taskId },
			{
				'Content-Type': 'application/json',
			}
		);
		reload();
	};

	return (
		<React.Fragment>
			{error && <ErrorModal error={error} onClear={clearError} />}
			{isLoading && <LoadingSpinner asOverlay />}
			{showAddNewStage && addNewStage()}
			{showCreateActivity && addNewActivity()}
			<div className={classes.container}>
				<div className={classes.header}>
					{data.name}
					<div className={classes.icons}>
						<Icon text='delete' action={deleteModel} cls='stopped' />
						<Icon
							text='start'
							action={handleShowCreateActivity}
							cls='ongoing'
						/>
					</div>
				</div>
				<div className={classes.stages}>{writeRoutesCards()}</div>
			</div>
		</React.Fragment>
	);
}

export default ModelCard;
