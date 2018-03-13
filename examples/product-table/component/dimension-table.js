import TableController from "./TableController.js";

export default {
	bindings: {
		"table": "=",
		"editable": "=",
		"removable": "=",
		"added": "=",
		"onRemove": "&",
		"onAdd": "&",
	},
	controllerAs: '$ctrl',
	controller: class DimensionTableController extends TableController{
		constructor(){
            super();
            this.editEnabled = false;
            this.addEnabled = false;
            this.removeEnabled = false;
            this.valueToAdd = '';
		}
		$onInit(){
            this.tableKeys = this.getSortedObjectKeys(this.table[0]);
		}
	},
	templateUrl: './component/dimension-table.html',
}