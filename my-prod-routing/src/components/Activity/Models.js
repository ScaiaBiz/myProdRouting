import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { NavLink } from 'react-router-dom';

import classes from './Tasks.module.css';

import { useHttpClient } from '../../hooks/http-hooks';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorModal from '../../utils/ErrorModal';

import Icon from './../../utils/Icon';
import AddElement from '../../utils/AddElement';
import FormAddSettings from './Commons/FormAddSettings';

import ModelCard from './Models/ModelCard';

function Models() {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [modelsData, setModelsData] = useState(null);
	const [modelsCard, setModelsCard] = useState(null);

	const [showAddNewModel, setShowAddNewModel] = useState(false);
	const handleAddNewModel = () => {
		setShowAddNewModel(!showAddNewModel);
	};

	const addNewModel = () => {
		const newModel = (
			<FormAddSettings
				label='Crea Nuovo Modello'
				action={postNewModel}
				close={handleAddNewModel}
			/>
		);
		return ReactDom.createPortal(
			newModel,
			document.getElementById('modal-hook')
		);
	};

	const postNewModel = async value => {
		const data = await sendRequest(
			'prodRouting/Models/create',
			'POST',
			{
				name: value,
				isActive: true,
			},
			{
				'Content-Type': 'application/json',
			}
		);
		console.log(data);
		getModels();
	};

	const getModels = async () => {
		const data = await sendRequest('prodRouting/Models/getList');
		setModelsData(data);
	};

	const writeModelsCards = () => {
		const visual = modelsData.map(t => {
			return <ModelCard key={t._id} data={t} reload={getModels} />;
		});
		setModelsCard(visual);
	};

	useEffect(() => {
		if (modelsData) {
			writeModelsCards();
		}
	}, [modelsData]);

	useEffect(() => {
		getModels();
	}, []);

	return (
		<React.Fragment>
			{error && <ErrorModal error={error} onClear={clearError} />}
			{isLoading && <LoadingSpinner asOverlay />}
			{showAddNewModel && addNewModel()}
			<div className={classes.container}>
				<div className={classes.header}>
					<div className={classes.backArrow}>
						<NavLink to={'/Activity'}>
							<Icon text='arrow_back' />{' '}
						</NavLink>
					</div>
					| Modelli
				</div>
				<AddElement action={handleAddNewModel}>Crea nuovo modello</AddElement>
				{modelsCard}
			</div>
		</React.Fragment>
	);
}

export default Models;
