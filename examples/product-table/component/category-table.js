import Composite from '../model/Composite.js'
import TableController from "./TableController.js";

export default {
	bindings: {
		"tableData": "<",
		"editable": "<",
		"removable": "<",
		"added": "<",
		"onChange": "&"
	},
	controllerAs: '$ctrl',
	controller: class CategoryTableController extends TableController{
		constructor(){
			super();
			this.editEnabled = false;
			this.addEnabled = false;
			this.removeEnabled = false;
			this.valueToAdd = '';
		}

		$onInit(){
			this._reset();
		}

		_reset(){
			this.isCompositen = !!this.tableData.categoryName;
			this.keys = this.getSortedObjectKeys(this.tableData.rows[0].member);
		}

		$onChanges(changesObj){
			if (changesObj){
				if (changesObj.tableData.currentValue !== changesObj.tableData.previousValue){
					this.tableData = changesObj.tableData.currentValue;
					this._reset();
				}
			}
		}

		onRemove(composite, item){
			composite.remove(item);
			if (this.onChange){
				this.onChange();
			}
		}

		onAdd(composite, item){
			composite.add(item);
			if (this.onChange){
				this.onChange();
			}
		}
	},
	templateUrl: './component/category-table.html',
}