import Composite from '../model/Composite.js'
import TableController from "./TableController.js";

export default {
	bindings: {
		"tableData": "=",
		"editable": "=",
		"removable": "=",
		"added": "=",
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
			this.tableKeys = this.getSortedObjectKeys(this.tableData[0].member);
			this.hasOnlyOneColumn = !!this.tableKeys.length;
        }
		/**
		 * @param {Member|Composite} obj
		 * */
		isComposite(obj){
			return obj instanceof Composite
		}

		onRemove(composite, item){
			composite.remove(item)
		}

		onAdd(composite, item){
			composite.add(item)
		}
	},
	templateUrl: './component/category-table.html',
}