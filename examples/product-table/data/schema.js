export default {
	dimension: 'money',
	keyProps: ['money', 'cents'],
	dependency: [
		{
			dimension: 'place',
			keyProps: ['place']
		},
		{
			dimension: 'product',
			keyProps: ['product']
		},
		{
			dimension: 'mark',
			keyProps: ['mark']
		},
		{
			dimension: 'month',
			keyProps: ['month'],
			dependency: [
				{
					dimension: 'qr',
					keyProps: ['qr'],
					dependency: [
						{
							dimension: 'year',
							keyProps: ['year']
						}
					]
				}
			]
		},
	]
};