import React from 'react';

import './Icon.css';

function Svg({ action, text }) {
	if (text) {
		return (
			<span className='material-icons' onClick={action}>
				{text}
			</span>
		);
	}

	return <>Errore</>;
}

export default Svg;
