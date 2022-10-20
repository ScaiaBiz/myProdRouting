import React, { useState } from 'react';
import ReactDom from 'react-dom';

import classes from './ModelCard.module.css';

import { useHttpClient } from '../../../hooks/http-hooks';
import LoadingSpinner from '../../../utils/LoadingSpinner';
import ErrorModal from '../../../utils/ErrorModal';

import Icon from '../../../utils/Icon';
import StageCard from '../Commons/StageCard';
import AddStage from './AddStage';

// function ModelCard({ data, addNewStage, resData }) {
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
		console.log('here');
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
		console.log({ prevElement });
		console.log({ parent });
		let sequenceNo = 9000;
		if (prevElement !== 'first') {
			sequenceNo = prevElement.no + 500;
		}

		console.log(sequenceNo);

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

	const createActivity = async () => {
		console.log('Mando richiesta');
		const res = await sendRequest(
			'prodRouting/Models/createActivity',
			'POST',
			{
				modelId: data._id,
				description: data.name,
				dueDate: new Date(),
			},
			{
				'Content-Type': 'application/json',
			}
		);
		console.log(res);
	};

	return (
		<React.Fragment>
			{error && <ErrorModal error={error} onClear={clearError} />}
			{isLoading && <LoadingSpinner asOverlay />}
			{showAddNewStage && addNewStage()}
			<div className={classes.container}>
				<div className={classes.header}>
					{data.name}
					<div className={classes.icons}>
						<Icon text='delete' action={deleteModel} cls='stopped' />
						{/* <Icon text='content_copy' cls='todo' /> */}
						<Icon text='start' action={createActivity} cls='ongoing' />
					</div>
				</div>
				<div className={classes.stages}>{writeRoutesCards()}</div>
			</div>{' '}
		</React.Fragment>
	);
}

export default ModelCard;
