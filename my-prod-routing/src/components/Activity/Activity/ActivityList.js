import React, { useState, useEffect } from 'react';

import classes from './ActivityList.module.css';

import { useHttpClient } from '../../../hooks/http-hooks';
import LoadingSpinner from '../../../utils/LoadingSpinner';
import ErrorModal from '../../../utils/ErrorModal';

import ActivityCard from './ActivityCard';

function ActivityList({ selectedActivity, setSelectedActivity }) {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [activityElements, setActivityElements] = useState(null);
	const [activityData, setActivityData] = useState(null);
	//[
	// {
	// 	name: 'Attività 1',
	// 	description: 'descrizione',
	// 	stages: [],
	// 	tasks: [],
	// 	dueDate:
	// 		'Thu Oct 20 2022 18:12:59 GMT+0200 (Ora legale dell’Europa centrale)',
	// },
	// {
	// 	name: 'Attività 2',
	// 	description: 'descrizione',
	// 	stages: [],
	// 	tasks: [],
	// 	dueDate:
	// 		'Thu Oct 20 2022 19:12:59 GMT+0200 (Ora legale dell’Europa centrale)',
	// },
	// {
	// 	name: 'Attività 3',
	// 	description: 'descrizione',
	// 	stages: [],
	// 	tasks: [],
	// 	dueDate:
	// 		'Thu Oct 20 2022 20:12:59 GMT+0200 (Ora legale dell’Europa centrale)',
	// },
	// {
	// 	name: 'Attività 4',
	// 	description: 'descrizione',
	// 	stages: [],
	// 	tasks: [],
	// 	dueDate:
	// 		'Thu Oct 21 2022 07:12:59 GMT+0200 (Ora legale dell’Europa centrale)',
	// },
	// {
	// 	name: 'Attività 5',
	// 	description: 'descrizione',
	// 	stages: [],
	// 	tasks: [],
	// 	dueDate:
	// 		'Thu Oct 21 2022 08:12:59 GMT+0200 (Ora legale dell’Europa centrale)',
	// },
	// {
	// 	name: 'Attività 6',
	// 	description: 'descrizione',
	// 	stages: [],
	// 	tasks: [],
	// 	dueDate:
	// 		'Thu Oct 21 2022 09:12:59 GMT+0200 (Ora legale dell’Europa centrale)',
	// },
	// {
	// 	name: 'Attività 7',
	// 	description: 'descrizione',
	// 	stages: [],
	// 	tasks: [],
	// 	dueDate:
	// 		'Thu Oct 21 2022 10:12:59 GMT+0200 (Ora legale dell’Europa centrale)',
	// },
	// {
	// 	name: 'Attività 8',
	// 	description: 'descrizione',
	// 	stages: [],
	// 	tasks: [],
	// 	dueDate:
	// 		'Thu Oct 21 2022 11:12:59 GMT+0200 (Ora legale dell’Europa centrale)',
	// },
	// {
	// 	name: 'Attività 9',
	// 	description: 'descrizione',
	// 	stages: [],
	// 	tasks: [],
	// 	dueDate:
	// 		'Thu Oct 22 2022 07:12:59 GMT+0200 (Ora legale dell’Europa centrale)',
	// },
	// {
	// 	name: 'Attività 10',
	// 	description: 'descrizione',
	// 	stages: [],
	// 	tasks: [],
	// 	dueDate:
	// 		'Thu Oct 22 2022 08:12:59 GMT+0200 (Ora legale dell’Europa centrale)',
	// },
	// {
	// 	name: 'Attività 11',
	// 	description: 'descrizione',
	// 	stages: [],
	// 	tasks: [],
	// 	dueDate:
	// 		'Thu Oct 22 2022 09:12:59 GMT+0200 (Ora legale dell’Europa centrale)',
	// },
	// ]);

	useEffect(() => {
		if (activityData) {
			writeActivitys();
		}
	}, [activityData]);

	const deleteActivity = async actId => {
		const data = await sendRequest(
			`prodRouting/Activitis/deleteActivity/${actId}`
		);
		if (data) {
			getActivitisList();
		}
	};

	const writeActivitys = async () => {
		let lastDate = '';
		const elements = activityData.map(activity => {
			const act_Date = new Date(activity.dueDate);
			const currentDate = `${act_Date.getDate()} - ${
				act_Date.getMonth() + 1
			} - ${act_Date.getFullYear()}`;

			activity.isSelected = false;
			if (selectedActivity?._id == activity._id) {
				activity.isSelected = true;
			}

			const element = (
				<ActivityCard
					key={activity._id}
					data={activity}
					deleteActivity={deleteActivity}
					setSelectedActivity={setSelectedActivity}
				/>
			);
			if (lastDate !== currentDate) {
				lastDate = currentDate;

				return (
					<React.Fragment>
						<div className={classes.dateCard}> {currentDate} </div>
						{element}
					</React.Fragment>
				);
			}

			return element;
		});
		setActivityElements(elements);
	};

	useEffect(() => {
		writeActivitys();
	}, [selectedActivity]);

	const getActivitisList = async () => {
		const res = await sendRequest('prodRouting/Activitis/getList');
		setActivityData(res);
	};

	useEffect(() => {
		getActivitisList();
	}, []);

	return (
		<React.Fragment>
			{error && <ErrorModal error={error} onClear={clearError} />}
			{isLoading && <LoadingSpinner asOverlay />}
			<div className={classes.container}>
				<div className={classes.list}>{activityElements}</div>
			</div>
		</React.Fragment>
	);
}

export default ActivityList;
