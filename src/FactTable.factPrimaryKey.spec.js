import Cube from './Cube.js';
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	it('fact table can have custom factPrimaryKey', () => {
		const factTable = {
			facts: [
				{ factId: 1, direction: 'left', date: '01' },
				{ factId: 2, direction: 'right', date: '02' },
			],
			factPrimaryKey: 'factId'
		};
		const dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'direction',
					keyProps: ['direction']
				},
				level: [
					{
						dimensionTable: {
							dimension: 'date',
							keyProps: ['date']
						},
					}
				]
			}
		];
		const cube = Cube.create(dimensionHierarchies, factTable);
		expect(cube.getCells()[0]["factId"]).toBeDefined();
		isEqualObjects(cube.getFacts(), factTable.facts);
	})
};
