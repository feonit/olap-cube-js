angular.module('demo').factory('ProductCube', ['TreeTableData', function(TreeTableData) {

	var Cube = window.Cube;

	function ProductCube() {
		const cube = Cube.apply(this, arguments);
		return cube;
	}

	ProductCube.prototype = Object.create(Cube.prototype);
	ProductCube.prototype.constructor = ProductCube;
	Object.setPrototypeOf(ProductCube, Cube);

	var productCubePrototype = {
		constructor: ProductCube,

		getFactTable: function(factTable){
			return new TreeTableData({
				headerName: 'Fact Table',
				rows: factTable.map(function(member) {
					return new TreeTableData({ member: member })
				}),
				//todo methods for add/remove rows of fact table
			})
		},
		getFactTableOutput: function() {
			var self = this;
			return new TreeTableData({
				headerName: 'Fact Table',
				rows: self.getFacts().map(function(member) {
					return new TreeTableData({ member: member })
				})
			})
		},
		getProduct: function() {
			var self = this;
			return new TreeTableData({
				headerName: 'Product',
				rows: self.getDimensionMembers('product').map(function(member) {
					return new TreeTableData({ member: member })
				}),
				add: function(member) { self.addDimensionMember('product', member) },
				remove: function(member) { self.removeDimensionMember('product', member) }
			})
		},
		getMarket: function() {
			var self = this;
			return new TreeTableData({
				headerName: 'Market',
				rows: self.getDimensionMembers('market').map(function(member) {
					return new TreeTableData({ member: member })
				}),
				add: function(member) { self.addDimensionMember('market', member) },
				remove: function(member) { self.removeDimensionMember('market', member) }
			})
		},
		getMark: function() {
			var self = this;
			return new TreeTableData({
				headerName: 'Mark',
				rows: self.getDimensionMembers('mark').map(function(member) {
					return new TreeTableData({ member: member })
				}),
				remove: function(member) { self.removeDimensionMember('mark', member) },
				add: function(member) { self.addDimensionMember('mark', member) }
			})
		},
		getMonth: function(qr) {
			var self = this;
			var space = {};
			if (qr) {
				space.qr = qr;
			}
			return new TreeTableData({
				headerName: 'Month',
				rows: self.dice(space).getDimensionMembers('month').map(function(member) {
					return new TreeTableData({ member: member })
				}),
				remove: function(member) { self.removeDimensionMember('month', member) },
				add: function(member, space) { self.addDimensionMember('month', member, space) }
			})
		},
		getQr: function(year) {
			var self = this;
			var space = {};
			if (year) {
				space.year = year;
			}
			return new TreeTableData({
				headerName: 'Qr',
				rows: self.dice(space).getDimensionMembers('qr').map(function(member) {
					return new TreeTableData({ member: member })
				}),
				remove: function(member) { self.removeDimensionMember('qr', member) },
				add: function(member, space) { self.addDimensionMember('qr', member, space) }
			})
		},
		getYear: function(qr) {
			var self = this;
			var space = {};
			if (qr) {
				space.qr = qr;
			}
			return new TreeTableData({
				headerName: 'Year',
				rows: self.dice(space).getDimensionMembers('year').map(function(member) {
					return new TreeTableData({ member: member })
				}),
				remove: function(member) { self.removeDimensionMember('year', member) },
				add: function(member) { self.addDimensionMember('year', member) }
			})
		},
		getQrMonth: function() {
			var self = this;
			return new TreeTableData({
				headerName: 'Qr',
				categoryName: 'Qr category',
				add: function(member) { self.addDimensionMember('qr', member) },
				remove: function(member) { self.removeDimensionMember('qr', member) },
				rows: self.getDimensionMembers('qr').map(function(qr) {
					var space = {};
					if (qr) {
						space.qr = qr
					}

					return new TreeTableData({
						headerName: 'Month',
						member: qr,
						add: function(member, parentSpace) {
							//todo remove it may be
							var insideSpace = {};
							var key;
							for (key in parentSpace) {
								insideSpace[key] = parentSpace[key]
							}
							for (key in space) {
								insideSpace[key] = space[key]
							}
							self.addDimensionMember('month', member, insideSpace)
						},
						remove: function(member){ self.removeDimensionMember('month', member) },
						rows: self.dice(space).getDimensionMembers('month').map(function(member) {
							return new TreeTableData({ member: member })
						})
					})
				})
			})
		},
		getYearQr: function() {
			var self = this;
			return new TreeTableData({
				headerName: 'Year',
				categoryName: 'Year category',
				add: function(member) { self.addDimensionMember('year', member) },
				remove: function(member) { self.removeDimensionMember('year', member) },
				rows: self.getDimensionMembers('year').map(function(year) {
					var space = {};
					if (year) {
						space.year = year;
					}

					return new TreeTableData({
						headerName: 'Year Tables',
						member: year,
						add: function(member) { self.addDimensionMember('qr', member, space) },
						remove: function(member) { self.removeDimensionMember('qr', member) },
						rows: self.dice(space).getDimensionMembers('qr').map(function(member) {
							return new TreeTableData({ member: member })
						})
					});
				})
			})
		},
		getYearQrMonth: function() {
			var self = this;
			return new TreeTableData({
				headerName: 'Year',
				categoryName: 'Year category',
				add: function(member){ self.addDimensionMember('year', member) },
				remove: function(member){ self.removeDimensionMember('year', member) },
				rows: self.getDimensionMembers('year').map(function(year) {
					var space = {};
					if (year){
						space.year = year;
					}

					return new TreeTableData({
						member: year,
						headerName: 'Qr',
						categoryName: 'Qr category',
						remove: function(member) { self.removeDimensionMember('qr', member) },
						add: function(member) { self.addDimensionMember('qr', member, space) },
						rows: self.dice(space).getDimensionMembers('qr').map(function(qr) {
							var space = {};
							if (qr) {
								space.qr = qr
							}

							return new TreeTableData({
								member: qr,
								headerName: 'Month',
								remove: function(member) { self.removeDimensionMember('month', member) },
								add: function(member) { self.addDimensionMember('month', member, space) },
								rows: self.dice(space).getDimensionMembers('month').map(function(month) {
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
	};

	for (var key in productCubePrototype) {
		if (productCubePrototype.hasOwnProperty(key)) {
			ProductCube.prototype[key] = productCubePrototype[key]
		}
	}

	return ProductCube
}]);

