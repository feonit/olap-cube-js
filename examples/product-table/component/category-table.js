import Composite from '../model/Composite.js'
import TableController from "./TableController.js";

export default {
	bindings: {
		"tableData": "=",
		"editable": "=",
		"removable": "=",
		"added": "=",
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
			this.tableKeys = this.getSortedObjectKeys(this.tableData[0].member);
			this.isCompositen = this.isComposite(this.tableData[0].category[0]);

			this.header = this.tableData[0].headerName;
			this.categoryName = this.tableData[0].categoryName;
			this.category = this.tableData[0].category;
        }
		/**
		 * @param {Member|Composite} obj
		 * */
		isComposite(obj){
			return obj instanceof Composite
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