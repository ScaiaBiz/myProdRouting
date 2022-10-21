import React, { useEffect, useState } from 'react';
import { Outlet, useOutlet } from 'react-router-dom';

import classes from './Activity.module.css';

import { useHttpClient } from '../../hooks/http-hooks';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorModal from '../../utils/ErrorModal';

import ActivityList from './Activity/ActivityList';
import ActivityContent from './Activity/ActivityContent';

import Icon from '../../utils/Icon';

function Activity() {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [selectedActivity, setSelectedActivity] = useState(null);

	useEffect(() => {
		console.log({ selectedActivity });
	}, [selectedActivity]);

	let child = useOutlet();

	return (
		<React.Fragment>
			{error && <ErrorModal error={error} onClear={clearError} />}
			{isLoading && <LoadingSpinner asOverlay />}
			<div className={classes.container}>
				{!child && (
					<React.Fragment>
						<ActivityList
							selectedActivity={selectedActivity}
							setSelectedActivity={setSelectedActivity}
						/>
						<ActivityContent data={selectedActivity} />
					</React.Fragment>
				)}
				<Outlet />
			</div>
		</React.Fragment>
	);
}

export default Activity;
