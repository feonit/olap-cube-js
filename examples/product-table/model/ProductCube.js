angular.module('demo').factory('ProductCube', ['TreeTableData', function(TreeTableData){

	function ProductCube(){
		window.Cube.default.apply(this, arguments)
	}

	ProductCube.prototype = Object.create(window.Cube.default.prototype);

	// ProductCube.prototype.constructor = ProductCube;

	Object.assign(ProductCube.prototype, {
		getFactTable: function(factTable){
			return new TreeTableData({
				headerName: "Fact Table",
				rows: factTable.map( member =>{
					return new TreeTableData({ member: member })
				}),
				//todo methods for add/remove rows of fact table
			})
		},
		getFactTableOutput: function(){
			return new TreeTableData({
				headerName: "Fact Table",
				rows: this.getFacts().map( member =>{
					return new TreeTableData({ member: member })
				})
			})
		},
		getProduct: function(){
			return new TreeTableData({
				headerName: "Product",
				rows: this.getDimensionMembers('product').map( member => {
					return new TreeTableData({ member: member })
				}),
				add: (member)=>{ this.addDimensionMember('product', member ) },
				remove: (member)=>{ this.removeDimensionMember('product', member ) }
			})
		},
		getMarket: function(){
			return new TreeTableData({
				headerName: "Market",
				rows: this.getDimensionMembers('market').map( member => {
					return new TreeTableData({ member: member })
				}),
				add: (member)=>{ this.addDimensionMember('market', member ) },
				remove: (member)=>{ this.removeDimensionMember('market', member ) }
			})
		},
		getMark: function(){
			return new TreeTableData({
				headerName: "Mark",
				rows: this.getDimensionMembers('mark').map( member => {
					return new TreeTableData({ member: member })
				}),
				remove: (member)=>{ this.removeDimensionMember('mark', member ) },
				add: (member)=>{ this.addDimensionMember('mark', member ) }
			})
		},
		getMonth: function(qr, year){
			return new TreeTableData({
				headerName: "Month",
				rows: this.getDimensionMembersBySet('month', { qr, year }).map( member => {
					return new TreeTableData({ member: member })
				}),
				remove: (member)=>{ this.removeDimensionMember('month', member ) },
				add: (member, space)=>{ this.addDimensionMember('month', member, space ) }
			})
		},
		getQr: function(year){
			return new TreeTableData({
				headerName: "Qr",
				rows: this.getDimensionMembersBySet('qr', { year }).map( member => {
					return new TreeTableData({ member: member })
				}),
				remove: (member)=>{ this.removeDimensionMember('qr', member ) },
				add: (member, space)=>{ this.addDimensionMember('qr', member, space ) }
			})
		},
		getYear: function(qr){
			return new TreeTableData({
				headerName: "Year",
				rows: this.getDimensionMembersBySet('year', {qr}).map( member => {
					return new TreeTableData({ member: member })
				}),
				remove: (member)=>{ this.removeDimensionMember('year', member ) },
				add: (member)=>{ this.addDimensionMember('year', member ) }
			})
		},
		getQrMonth: function(){
			return new TreeTableData({
				headerName: "Qr",
				categoryName: "Qr category",
				add: (member)=>{ this.addDimensionMember('qr', member ) },
				remove: (member)=>{ this.removeDimensionMember('qr', member ) },
				rows: this.getDimensionMembers('qr').map( qr => {
					const space = { qr };

					return new TreeTableData({
						headerName: "Month",
						member: qr,
						add: (member, parentSpace)=>{ this.addDimensionMember('month', member, Object.assign({}, parentSpace, space) ) },
						remove: (member)=>{ this.removeDimensionMember('month', member ) },
						rows: this.getDimensionMembersBySet('month', space).map( member => {
							return new TreeTableData({ member: member })
						})
					})
				})
			})
		},
		getYearQr: function(){
			return new TreeTableData({
				headerName: "Year",
				categoryName: "Year category",
				add: (member)=>{ this.addDimensionMember('year', member ) },
				remove: (member)=>{ this.removeDimensionMember('year', member ) },
				rows: this.getDimensionMembers('year').map( year => {
					const space = { year };

					return new TreeTableData({
						headerName: "Year Tables",
						member: year,
						add: (member)=>{ this.addDimensionMember('qr', member, space ) },
						remove: (member)=>{ this.removeDimensionMember('qr', member ) },
						rows: this.getDimensionMembersBySet('qr', space).map( member => {
							return new TreeTableData({ member: member })
						})
					});
				})
			})
		},
		getYearQrMonth: function(){
			return new TreeTableData({
				headerName: "Year",
				categoryName: "Year category",
				add: (member)=>{ this.addDimensionMember('year', member ) },
				remove: (member)=>{ this.removeDimensionMember('year', member ) },
				rows: this.getDimensionMembers('year').map( year => {
					const space = { year };

					return new TreeTableData({
						member: year,
						headerName: "Qr",
						categoryName: "Qr category",
						remove: (member)=>{ this.removeDimensionMember('qr', member) },
						add: (member)=>{ this.addDimensionMember('qr', member, space ) },
						rows: this.getDimensionMembersBySet('qr', space).map( qr => {
							const space = { qr, year };

							return new TreeTableData({
								member: qr,
								headerName: "Month",
								remove: (member)=>{ this.removeDimensionMember('month', member ) },
								add: (member)=>{ this.addDimensionMember('month', member, space ) },
								rows: this.getDimensionMembersBySet('month', space).map( month => {
									return new TreeTableData({
										member: month
									})
								})
							})
						})
					})
				})
			})
		}
	});

	return ProductCube
}]);

