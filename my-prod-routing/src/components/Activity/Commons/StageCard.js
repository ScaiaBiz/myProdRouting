import React from 'react';

import classes from './StageCard.module.css';

import Icon from '../../../utils/Icon';
import TaskCard from './TaskCard';

function StageCard({ data, addStage, addTask, setLastStageData }) {
	const insterStage = () => {
		setLastStageData(data);
		addStage();
	};

	const createFirstTask = () => {
		addTask('', 'first', data);
	};

	return (
		<React.Fragment>
			<div key={data._id} className={classes.stage}>
				<div className={classes.stageName}>{data.name}</div>

				<div className={classes.tasks}>
					<Icon text='add_circle' action={createFirstTask} />
					{data &&
						data.tasks.map(task => {
							return (
								<TaskCard
									key={task._id}
									data={task}
									parent={data}
									addTask={addTask}
								/>
							);
						})}
				</div>
			</div>
			<Icon text='add_circle' action={insterStage} />
		</React.Fragment>
	);
}

export default StageCard;
