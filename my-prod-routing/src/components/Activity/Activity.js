import React from 'react';
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

	let child = useOutlet();

	return (
		<React.Fragment>
			{error && <ErrorModal error={error} onClear={clearError} />}
			{isLoading && <LoadingSpinner asOverlay />}
			<div className={classes.container}>
				{!child && (
					<React.Fragment>
						<ActivityList />
						<ActivityContent />
					</React.Fragment>
				)}
				<Outlet />
			</div>
		</React.Fragment>
	);
}

export default Activity;
