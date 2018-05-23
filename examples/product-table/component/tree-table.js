function TreeTableController() {
	this.editEnabled = false;
	this.addEnabled = false;
	this.removeEnabled = false;
	this.isCompositen = void 0;
	this.removable = void 0;
	this.added = void 0;
	this.selectedData = void 0;
}
TreeTableController.prototype = {
	$onInit: function() {
		this._reset();
	},

	_reset: function() {
		this.isCompositen = !!this.tableData.categoryName;
		this.keys = this.getSortedObjectKeys(this.tableData.rows[0].member);
		// this.keys = this.tableData.rows.length ? this.getSortedObjectKeys(this.tableData.rows[0].member) : [];
	},

	$onChanges: function(changesObj) {
		if (changesObj.tableData) {
			if (changesObj.tableData.currentValue !== changesObj.tableData.previousValue) {
				this._reset();
			}
		}
	},
	/**
	 * remove member handler
	 * */
	handleRemove: function(composite, item) {
		composite.remove(item);
		if (this.onChange){
			this.onChange();
		}
	},
	/**
	 * add member handler
	 * */
	handleAdd: function(composite, item) {
		composite.add(item, this.selectedData);
		this.valuesToAdd = {};
		if (this.onChange) {
			this.onChange();
		}
	},
	/**
	 * Sort where param id placed in first column
	 * */
	getSortedObjectKeys: function(obj) {
		const keys = Object.keys(obj).sort(function(key1, key2) {
			return key1 === 'id' ? false : key1 > key2;
		});
		return keys;
	}
}
angular.module('demo').component('treeTable', {
	bindings: {
		tableData: '<',
		editable: '<',
		removable: '<',
		added: '<',
		onChange: '&',
		selectedData: '<'
	},
	controllerAs: '$ctrl',
	templateUrl: './component/tree-table.html',
	controller: TreeTableController
});
