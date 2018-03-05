export default {
	bindings: {
		"table": "="
	},
	controllerAs: '$ctrl',
	controller: class DimensionTableController {
		getKeys(obj){
			const keys = Object.keys(obj).sort();
			let index;
			if (index = keys.indexOf('$$hashKey') !== -1){
				keys.splice(index, 1);
			}
			return keys;
		}
	},
	template: (`
		<table ng-init="keys=$ctrl.getKeys($ctrl.table[0])">
			<thead>
				<tr>
					<td ng-repeat="key in keys">{{ key }}</td>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="record in $ctrl.table">
					<td ng-repeat="key in keys">{{ record[key] }}</td>
				</tr>
			</tbody>
		</table>
	`),
}