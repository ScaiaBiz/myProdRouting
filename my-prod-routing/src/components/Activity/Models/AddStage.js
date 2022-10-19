import React, { useState } from 'react';

import classes from './AddStage.module.css';

import Find from '../../../utils/Inputs/Find';
import Button from '../../../utils/Button/Button';

function AddStage({ action, close }) {
	const [selected, setSelected] = useState(null);

	const doAction = () => {
		action(selected);
		close();
	};

	return (
		<React.Fragment>
			<div className={classes.background} onClick={close} />
			<div className={classes.container}>
				Aggiungi FASE
				<Find
					url={`prodRouting/Stages/getListFromSettings`}
					setRes={setSelected}
					label='Fase'
					inputId='stage'
					driver={'description'}
					resName={null}
					isArray={true}
					width='100%'
				/>
				<Button clname='confirm' onClick={doAction}>
					Inserisci
				</Button>
				<Button clname='danger' onClick={close}>
					Annulla
				</Button>
			</div>
		</React.Fragment>
	);
}

export default AddStage;
