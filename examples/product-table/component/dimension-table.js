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
		<label style="color:#ccc">
			<input type="checkbox" ng-init="isEdit=false" ng-model="isEdit"/>
			Enable edit mode
		</label>
		<table ng-init="keys=$ctrl.getKeys($ctrl.table[0])">
			<thead>
				<tr>
					<td ng-repeat="key in keys track by $index">{{ key }}</td>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="record in $ctrl.table track by $index">
					<td ng-repeat="key in keys track by $index">
						<span ng-if="$index===0">{{record[key]}}</span>
						<input ng-if="$index!==0 && isEdit" ng-model="record[key]">
						<span ng-if="$index!==0 && !isEdit">{{record[key]}}</span>
					</td>
				</tr>
			</tbody>
		</table>
	`),
}