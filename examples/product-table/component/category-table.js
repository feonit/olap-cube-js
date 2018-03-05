import Composite from '../model/Composite.js'

export default {
	bindings: {
		"table": "="
	},
	controllerAs: '$ctrl',
	controller: class CategoryTableController {
		getKeys(obj){
			const keys = Object.keys(obj).sort();
			let index;
			if (index = keys.indexOf('$$hashKey') !== -1){
				keys.splice(index, 1);
			}
			return keys;
		}
		/**
		 * @param {Member|Composite} obj
		 * */
		isComposite(obj){
			return obj instanceof Composite
		}
	},
	template: (`
		<table ng-init="memberKeys=$ctrl.getKeys($ctrl.table[0].member)">
			<thead>
				<tr>
					<td ng-repeat="memberKey in memberKeys">{{ memberKey }}</td>
					<td> - </td>
				</tr>
			</thead>
			<tbody ng-repeat="record in $ctrl.table">
				<tr>
					<td ng-repeat="memberKey in memberKeys">{{ record.member[memberKey] }}</td>
				</tr>
				<tr>
					<td ng-repeat="memberKey in memberKeys" class="cell-empty"></td>
					<td>

						<dimension-table
							ng-if="!$ctrl.isComposite(record.category[0])"
							table="record.category">
						</dimension-table>

						<category-table
							ng-if="$ctrl.isComposite(record.category[0])"
							table="record.category">
						</category-table>

					</td>
				</tr>
			</tbody>
		</table>
	`),
}