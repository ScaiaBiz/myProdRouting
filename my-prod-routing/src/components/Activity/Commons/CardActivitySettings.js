import React, { useState } from 'react';

import classes from './CardActivitySettings.module.css';

import Icon from '../../../utils/Icon';

function CardActivitySettings({ data, toggleVisibility }) {
	const [tData, setTData] = useState(data);

	const handelVisibility = async () => {
		let res = await toggleVisibility(tData._id);
		setTData(res);
	};

	// 	const handleEdit = async () => {
	// 		let res = await edit(tData._id)
	// setTData(res)
	// 	}

	return (
		<div
			key={tData._id}
			className={`${classes.container} ${!tData.isActive && classes.disabled}`}
		>
			<div className={classes.description}>{tData.description}</div>
			<div className={classes.controls}>
				<Icon
					cls='paused'
					text={tData.isActive ? 'visibility_off' : 'visibility'}
					action={handelVisibility}
				/>
				<Icon cls='todo' text='edit' />
				<Icon cls='stopped' text='delete' />
			</div>
		</div>
	);
}

export default CardActivitySettings;
