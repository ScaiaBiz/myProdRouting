import React from 'react';

import classes from './ModelCard.module.css';

import Icon from '../../../utils/Icon';
import StageCard from '../Commons/StageCard';

function ModelCard({ data }) {
	let add = 'add_circle';

	// console.log(data);

	const addStage = (prevElemet = 'first') => {
		console.log(prevElemet);
	};

	const addTask = (prevElement, parent) => {
		console.log({ prevElement });
		console.log({ parent });
	};

	const writeRoutesCards = () => {
		if (data.route.stages.length > 0) {
			const visuals = data.route.stages.map(stage => {
				console.log(stage);
				return (
					<StageCard
						key={stage._id}
						data={stage}
						addStage={addStage}
						addTask={addTask}
					/>
				);
			});
			return visuals;
		}
		return (
			<div className={classes.insertFirstStage}>
				<Icon text='add_circle' action={() => addStage()} />
			</div>
		);
	};

	return (
		<div className={classes.container}>
			<div className={classes.header}>{data.name}</div>
			<div className={classes.stages}>
				{writeRoutesCards()}
				{/* <Icon text={add} /> */}
				{/* <div className={classes.stage}>
					<div className={classes.stageName}>Fase A</div>
					<div className={classes.tasks}>
						<Icon text={add} />
						<div className={classes.task}>Op 1</div>
						<Icon text={add} />
						<div className={classes.task}>Op 2</div>
						<Icon text={add} />
						<div className={classes.task}>Op 3</div>
					</div>
				</div>
				<div className={classes.stage}>
					<Icon text={add} />
				</div>
				<div className={classes.stage}>
					<div className={classes.stageName}>Fase B</div>
					<div className={classes.tasks}>
						<div className={classes.task}>Op 1</div>
						<div className={classes.task}>Op 2</div>
					</div>
				</div> */}
			</div>
		</div>
	);
}

export default ModelCard;
