import React, { useState } from 'react';

import classes from './AddTask.module.css';

import Find from '../../../utils/Inputs/Find';
import Button from '../../../utils/Button/Button';

function AddTask({ action, close }) {
	const [selected, setSelected] = useState(null);

	const doAction = () => {
		action(selected);
		close();
	};

	return (
		<React.Fragment>
			<div className={classes.background} onClick={close} />
			<div className={classes.container}>
				Aggiungi OPERAZIONE
				<Find
					url={`prodRouting/Tasks/getListFromSettings`}
					setRes={setSelected}
					label='Operazione'
					inputId='task'
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

export default AddTask;
