import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { NavLink } from 'react-router-dom';

import classes from './Stages.module.css';

import { useHttpClient } from '../../hooks/http-hooks';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorModal from '../../utils/ErrorModal';

import Icon from './../../utils/Icon';
import AddElement from '../../utils/AddElement';
import CardActivitySettings from './Commons/CardActivitySettings';
import FormAddSettings from './Commons/FormAddSettings';

function Stages() {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [stageCards, setStageCards] = useState(null);
	const [stagesData, setStagesData] = useState(null);

	const [showAddStage, setShowAddStage] = useState(false);
	const handleAddStage = () => {
		setShowAddStage(!showAddStage);
	};

	const addNewStage = () => {
		console.log('here');
		const newStage = (
			<FormAddSettings
				label='Aggiungi Fase'
				action={postNewStage}
				close={handleAddStage}
			/>
		);
		return ReactDom.createPortal(
			newStage,
			document.getElementById('modal-hook')
		);
	};

	const postNewStage = async value => {
		const data = await sendRequest(
			'prodRouting/Stages/addToSettings',
			'POST',
			{
				value: { description: value, isActive: true, creationDate: new Date() },
			},
			{
				'Content-Type': 'application/json',
			}
		);
		setStagesData(data);
	};

	const toggleVisibility = async id => {
		const data = await sendRequest(`prodRouting/Stages/toggleVisibility/${id}`);
		return data;
	};

	const getStages = async () => {
		const stagesList = await sendRequest(
			'prodRouting/Stages/getListFromSettings'
		);
		setStagesData(stagesList);
	};

	const writeStagesCards = () => {
		const visual = stagesData.map(t => {
			return (
				<CardActivitySettings data={t} toggleVisibility={toggleVisibility} />
			);
		});
		setStageCards(visual);
	};

	useEffect(() => {
		if (stagesData) {
			writeStagesCards();
		}
	}, [stagesData]);

	useEffect(() => {
		getStages();
	}, []);

	return (
		<React.Fragment>
			{error && <ErrorModal error={error} onClear={clearError} />}
			{isLoading && <LoadingSpinner asOverlay />}
			{showAddStage && addNewStage()}
			<div className={classes.container}>
				<div className={classes.header}>
					<NavLink to={'/Activity'}>
						<div className={classes.backArrow}>
							<Icon text='arrow_back' />
						</div>
					</NavLink>
					| Fasi
				</div>
				<AddElement action={handleAddStage}>Aggiungi fase</AddElement>
				<section className={classes.cardList}>{stageCards}</section>
			</div>
		</React.Fragment>
	);
}

export default Stages;
