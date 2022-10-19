import React from 'react';

import classes from './FormAddSettings.module.css';

import { useForm } from '../../../hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../../utils/validators';
import Input from '../../../utils/Inputs/Input';
import Button from '../../../utils/Button/Button';

function FormAddSettings({ label, val, action, close }) {
	const [formState, inputHandler, setFormData] = useForm({
		description: {
			value: val,
			isValid: false,
		},
	});

	const doAction = () => {
		action(formState.inputs.description.value);
		close();
	};

	return (
		<React.Fragment>
			<div className={classes.background} onClick={close}></div>
			<div className={classes.container}>
				<div className={classes.description}>{label}</div>
				<Input
					id='description'
					element='input'
					type='text'
					label='Descrizione'
					validators={[VALIDATOR_REQUIRE()]}
					errorText={'Campo non può essere vuoto'}
					onInput={inputHandler}
					initValue={val ? val : ''}
					initIsValid={val ? true : false}
				/>
				<Button clname='confirm' onClick={doAction}>
					Inserisci
				</Button>
				<Button clname='reverseDanger' onClick={close}>
					Annulla
				</Button>
			</div>
		</React.Fragment>
	);
}

export default FormAddSettings;
