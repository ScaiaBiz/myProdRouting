import React, { useState, useEffect } from 'react';

import classes from './NewActivity.module.css';

import Find from '../../../utils/Inputs/Find';
import Button from '../../../utils/Button/Button';

import { useForm } from '../../../hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../../utils/validators';
import Input from '../../../utils/Inputs/Input';

function NewActivity({ modelData = null, action, close }) {
	const [selected, setSelected] = useState(modelData);

	const [formState, inputHandler, setFormData] = useForm({
		dueDate: {
			value: '',
			isValid: false,
			el: 'date',
			type: 'date',
			label: 'Data esecuzione',
			validator: [VALIDATOR_REQUIRE()],
			initValue: '',
			initIsValid: false,
			errorText: 'Selezionare una data valida',
		},
		description: {
			value: '',
			isValid: false,
			el: 'input',
			type: 'text',
			label: 'Descrizione',
			validator: [VALIDATOR_REQUIRE()],
			initValue: '',
			initIsValid: false,
		},
	});

	const evalInputs = () => {
		let inputs = formState.inputs;
		let keys = Object.keys(formState.inputs);

		const inputsVisual = keys.map(k => {
			let i = inputs[k];
			return (
				<Input
					key={k}
					id={k}
					element={i.el}
					type={i.type}
					label={i.label}
					validators={i.validator}
					errorText={i.errorText || 'Campo obbligatorio'}
					onInput={inputHandler}
					initValue={i.initValue}
					initIsValid={i.initIsValid}
				/>
			);
		});
		return inputsVisual;
	};

	const doAction = () => {
		action(
			selected._id,
			formState.inputs.description.value,
			formState.inputs.dueDate.value
		);
		close();
	};

	return (
		<React.Fragment>
			<div className={classes.background} onClick={close} />
			<div className={classes.container}>
				Crea nuova attività
				<Find
					url={`prodRouting/Models/getList`}
					setRes={setSelected}
					label='Modello'
					inputId='model'
					initialValue={modelData?.name}
					driver={'name'}
					resName={null}
					isArray={true}
					width='100%'
				/>
				{evalInputs()}
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

export default NewActivity;
