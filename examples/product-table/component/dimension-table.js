import TableController from "./TableController.js";

export default {
	bindings: {
		"table": "=",
		"editable": "="
	},
	controllerAs: '$ctrl',
	controller: class DimensionTableController extends TableController{
		constructor(){
            super();
            this.isEdit = false;
		}
		$onInit(){
            this.tableKeys = this.getSortedObjectKeys(this.table[0]);
		}
	},
	templateUrl: './component/dimension-table.html',
}