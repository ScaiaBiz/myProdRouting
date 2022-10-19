import React from 'react';

import classes from './AddElement.module.css';

function AddElement({ action, children }) {
	return (
		<div className={classes.add} onClick={action}>
			{children}
		</div>
	);
}

export default AddElement;
