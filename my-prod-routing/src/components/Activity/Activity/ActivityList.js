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

	useEffect(() => {
		getActivitisList();
	}, []);

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
		setSelectedActivity(null);
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
		console.log({ selectedActivity });
		console.log({ activityData });
		if (selectedActivity) {
			const newActData = activityData?.map(act => {
				if (act._id == selectedActivity._id) {
					return selectedActivity;
				}
				return act;
			});
			setActivityData(newActData);
		}
	}, [selectedActivity]);

	const getActivitisList = async () => {
		const res = await sendRequest('prodRouting/Activitis/getList');
		console.log({ res });
		setActivityData(res);
	};

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
