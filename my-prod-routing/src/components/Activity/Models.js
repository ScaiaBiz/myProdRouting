import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Tasks.module.css';

import { useHttpClient } from '../../hooks/http-hooks';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorModal from '../../utils/ErrorModal';

import Icon from './../../utils/Icon';

function Models() {
	const [modelsCard, setModelsCard] = useState(null);
	const [modelsData, setModelsData] = useState(null);

	const getTasks = () => {
		//todo: SendRequest
		setModelsData([{ description: 'Modello 1', isActive: true, notes: [] }]);
	};

	const getTaskCards = () => {
		const visual = modelsData.map(t => {
			return <p>{t.description}</p>;
		});
		setModelsCard(visual);
	};

	useEffect(() => {
		if (modelsData) {
			getTaskCards();
		}
	}, [modelsData]);

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<div className={classes.backArrow}>
					<NavLink to={'/Activity'}>
						<Icon text='arrow_back' />{' '}
					</NavLink>
				</div>
				| Modelli
			</div>
			<div>Aggiungi modello</div>
			{modelsCard}
		</div>
	);
}

export default Models;
