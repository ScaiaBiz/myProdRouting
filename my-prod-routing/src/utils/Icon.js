import React from 'react';

import './Icon.css';

function Svg({ action, text, cls }) {
	if (text) {
		return (
			<span className={'material-icons ' + cls} onClick={action}>
				{text}
			</span>
		);
	}

	return <>Errore</>;
}

export default Svg;
