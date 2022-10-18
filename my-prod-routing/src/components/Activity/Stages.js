import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Stages.module.css';

import { useHttpClient } from '../../hooks/http-hooks';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorModal from '../../utils/ErrorModal';

import Icon from './../../utils/Icon';

function Stages() {
	const [stageCards, setStageCards] = useState(null);
	const [stagesData, setStagesData] = useState(null);

	const getTasks = () => {
		//todo: SendRequest
		setStagesData([{ description: 'Fase 1', isActive: true, notes: [] }]);
	};

	const get = () => {
		const visual = stagesData.map(t => {
			return <p>{t.description}</p>;
		});
		setStageCards(visual);
	};

	useEffect(() => {
		if (stagesData) {
			get();
		}
	}, [stagesData]);

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
				| Fasi
			</div>
			<div>Aggiungi fase</div>
			{stageCards}
		</div>
	);
}

export default Stages;
