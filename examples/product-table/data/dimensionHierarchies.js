angular.module('demo').constant('dimensionHierarchies', [
	{
		dimensionTable: {
			dimension: 'market',
			keyProps: ['market']
		}
	},
	{
		dimensionTable: {
			dimension: 'product',
			keyProps: ['product']
		}
	},
	{
		dimensionTable: {
			dimension: 'mark',
			keyProps: ['mark']
		}
	},
	{
		dimensionTable: {
			dimension: 'month',
			keyProps: ['month']
		},
		level: [
			{
				dimensionTable: {
					dimension: 'qr',
					keyProps: ['qr']
				},
				level: [
					{
						dimensionTable: {
							dimension: 'year',
							keyProps: ['year']
						}
					}
				]
			}
		]
	},
]);
