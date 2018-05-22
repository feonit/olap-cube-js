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
		dependency: [
			{
				dimensionTable: {
					dimension: 'qr',
					keyProps: ['qr']
				},
				dependency: [
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