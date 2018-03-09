import Composite from '../model/Composite.js'

export default {
	bindings: {
		"table": "="
	},
	controllerAs: '$ctrl',
	controller: class CategoryTableController {
		getKeys(obj){
			return Object.keys(obj).sort();
		}
		/**
		 * @param {Member|Composite} obj
		 * */
		isComposite(obj){
			return obj instanceof Composite
		}
	},
	template: (`
		<label style="color:#ccc">
			<input type="checkbox" ng-init="isEdit=false" ng-model="isEdit"/>
			Enable edit mode
		</label>
		<table ng-init="memberKeys=$ctrl.getKeys($ctrl.table[0].member)">
			<thead>
				<tr>
					<td ng-repeat="memberKey in memberKeys track by $index">{{ memberKey }}</td>
					<td> - </td>
				</tr>
			</thead>
			<tbody ng-repeat="record in $ctrl.table">
				<tr>
					<td ng-repeat="memberKey in memberKeys track by $index">
						<span ng-if="$index===0 || ($index!==0 && !isEdit)">{{ record.member[memberKey] }}</span>
						<input ng-if="$index!==0 && isEdit" ng-model="record.member[memberKey]">
					</td>
				</tr>
				<tr>
					<td ng-repeat="memberKey in memberKeys track by $index" class="cell-empty"></td>
					<td>
						<div 
							ng-if="!$ctrl.isComposite(record.category[0])"
							ng-init="table=record.category"
						>
							<dimension-table table="table"></dimension-table>
						</div>
						
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