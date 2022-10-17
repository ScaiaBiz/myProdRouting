export const MenuElements = [
	{
		_id: 1000,
		description: 'Attività',
		path: '/Activity',
		element: 'Activity',
		auth: 0,
		subMenu: [
			{
				_id: 2010,
				description: 'Modelli',
				path: '/Models',
				element: 'Models',
				auth: 0,
			},
			{
				_id: 2020,
				description: 'Fasi',
				path: '/Stages',
				element: 'Stages',
				auth: 0,
			},
			{
				_id: 2030,
				description: 'Operazioni',
				path: '/Tasks',
				element: 'Tasks',
				auth: 0,
			},
		],
	},
	// {
	// 	_id: 2000,
	// 	description: 'Impostazioni',
	// 	path: '/Impostazioni',
	// 	element: 'Impostazioni',
	// 	auth: 0,
	// },
];
