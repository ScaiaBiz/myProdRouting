import React from 'react';

import classes from './StageCard.module.css';

import Icon from '../../../utils/Icon';
import TaskCard from './TaskCard';

function StageCard({ data, addStage, addTask }) {
	return (
		<React.Fragment>
			<div key={data._id} className={classes.stage}>
				<div className={classes.stageName}>{data.name}</div>

				<div className={classes.tasks}>
					<Icon
						text='add_circle'
						action={() => {
							addTask('first', data);
						}}
					/>
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
			<Icon
				text='add_circle'
				action={() => {
					addStage(data);
				}}
			/>
		</React.Fragment>
	);
}

export default StageCard;
