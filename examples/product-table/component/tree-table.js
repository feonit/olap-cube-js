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
	controller: class TreeTableController {
		constructor(){
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
		/**
		 * remove member handler
		 * */
		handleRemove(composite, item){
			composite.remove(item);
			if (this.onChange){
				this.onChange();
			}
		}
		/**
		 * add member handler
		 * */
		handleAdd(composite, item){
			composite.add(item, this.selectedData);
			this.valuesToAdd = {};
			if (this.onChange){
				this.onChange();
			}
		}
		/**
		 * Sort where param id placed in first column
		 * */
		getSortedObjectKeys (obj) {
			const keys = Object.keys(obj).sort((key1, key2)=>{
				return key1 === 'id' ? false : key1 > key2;
			});
			return keys;
		}
	},
	templateUrl: './component/tree-table.html',
}