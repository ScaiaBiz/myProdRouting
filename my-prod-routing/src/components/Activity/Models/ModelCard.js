import React, { useState } from 'react';
import ReactDom from 'react-dom';

import classes from './ModelCard.module.css';

import { useHttpClient } from '../../../hooks/http-hooks';
import LoadingSpinner from '../../../utils/LoadingSpinner';
import ErrorModal from '../../../utils/ErrorModal';

import Icon from '../../../utils/Icon';
import StageCard from '../Commons/StageCard';
import AddStage from './AddStage';
import AddTask from './AddTask';

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
		let sequenceNo = 10000;
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
		let sequenceNo = 10000;
		if (prevElement !== 'first') {
			sequenceNo = prevElement.no + 500;
		}

		let body = {
			modelId: data._id,
			stageId: parent._id,
			name: el.description,
			no: sequenceNo,
		};

		console.log(body);

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
		if (data.route.stages.length > 0) {
			const visuals = data.route.stages.map(stage => {
				return (
					<StageCard
						key={stage._id}
						data={stage}
						addStage={handleAddNewStage}
						addTask={addTask}
						setLastStageData={setLastStageData}
					/>
				);
			});
			return visuals;
		}
		return (
			<div className={classes.insertFirstStage}>
				<Icon text='add_circle' action={createFirstStage} />
			</div>
		);
	};

	return (
		<React.Fragment>
			{error && <ErrorModal error={error} onClear={clearError} />}
			{isLoading && <LoadingSpinner asOverlay />}
			{showAddNewStage && addNewStage()}
			<div className={classes.container}>
				<div className={classes.header}>{data.name}</div>
				<div className={classes.stages}>{writeRoutesCards()}</div>
			</div>{' '}
		</React.Fragment>
	);
}

export default ModelCard;
