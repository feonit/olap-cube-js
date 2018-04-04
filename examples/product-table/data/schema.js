angular.module('demo').constant('schema', {
	dimension: 'money',
	keyProps: ['money', 'cents'],
	dependency: [
		{
			dimension: 'market',
			keyProps: ['market']
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
});