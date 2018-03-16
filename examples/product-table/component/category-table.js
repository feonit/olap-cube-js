import TableController from "./TableController.js";

export default {
	bindings: {
		"tableData": "<",
		"editable": "<",
		"removable": "<",
		"added": "<",
		"onChange": "&",
		"selectedData": "<"
	},
	controllerAs: '$ctrl',
	controller: class CategoryTableController extends TableController{
		constructor(){
			super();
			this.editEnabled = false;
			this.addEnabled = false;
			this.removeEnabled = false;
		}

		$onInit(){
			this._reset();
		}

		_reset(){
			this.isCompositen = !!this.tableData.categoryName;
			this.keys = this.getSortedObjectKeys(this.tableData.rows[0].member);
		}

		$onChanges(changesObj){
			if (changesObj.tableData){
				if (changesObj.tableData.currentValue !== changesObj.tableData.previousValue){
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
			composite.add(item, this.selectedData);
            this.valuesToAdd = {};
            if (this.onChange){
				this.onChange();
			}
		}
	},
	templateUrl: './component/category-table.html',
}