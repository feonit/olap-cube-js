import Composite from '../model/Composite.js'
import TableController from "./TableController.js";

export default {
	bindings: {
		"table": "="
	},
	controllerAs: '$ctrl',
	controller: class CategoryTableController extends TableController{
        constructor(){
        	super();
            this.isEdit = false;
        }
        $onInit(){
            this.tableKeys = this.getSortedObjectKeys(this.table[0].member);
        }
		/**
		 * @param {Member|Composite} obj
		 * */
		isComposite(obj){
			return obj instanceof Composite
		}
	},
	templateUrl: './component/category-table.html',
}