import Cube from './Cube.js';
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	it('fact table can have custom primaryKey', () => {
		const factTable = {
			facts: [
				{ factId: 1, direction: 'left', date: '01' },
				{ factId: 2, direction: 'right', date: '02' },
			],
			primaryKey: 'factId'
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
		const cube = Cube.create(factTable, dimensionHierarchies);
		expect(cube.getCells()[0]["factId"]).toBeDefined();
		isEqualObjects(cube.getFacts(), factTable.facts);
	})
};
