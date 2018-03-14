import Cube from '../../../src/Cube.js'
import Composite from './Composite.js'

// todo: add some functional in Cube
export default class ProductTable extends Cube{
	getFactTable(){
		return [
			new Composite({
				headerName: "Fact Table",
				category: this.facts,
				//todo methods for add/remove rows of fact table
			})
		]
	}
	getDataArray(){
		return [
			new Composite({
				headerName: "Fact Table",
				category: super.getDataArray()
			})
		]
	}
	getProduct(){
		return [
			new Composite({
				headerName: "Product",
				category: this.query('product'),
				remove: (member)=>{ this.removeMember('product', member ) },
				add: (member)=>{ this.addMember('product', member ) }
			})
		]
	}
	getMarket(){
		return [
			new Composite({
				headerName: "Market",
				category: this.query('market'),
				remove: (member)=>{ this.removeMember('market', member ) },
				add: (member)=>{ this.addMember('market', member ) }
			})
		]
	}
	getMark(){
		return [
			new Composite({
				headerName: "Mark",
				category: this.query('mark'),
				remove: (member)=>{ this.removeMember('mark', member ) },
				add: (member)=>{ this.addMember('mark', member ) }
			})
		]
	}
	getMonth(qr, year){
		return [
			new Composite({
				headerName: "Month",
				category: this.query('month', { 'qr': qr, 'year': year }),
				remove: (member)=>{ this.removeMember('month', member ) },
				add: (member)=>{ this.addMember('month', member ) }
			})
		]
	}
	getQr(year){
		return [
			new Composite({
				headerName: "Qr",
				category: this.query('qr', { 'year': year }),
				remove: (member)=>{ this.removeMember('qr', member ) },
				add: (member)=>{ this.addMember('qr', member ) }
			})
		]
	}
	getYear(){
		return [
			new Composite({
				headerName: "Year",
				category: this.query('year'),
				remove: (member)=>{ this.removeMember('year', member ) },
				add: (member)=>{ this.addMember('year', member ) }
			})
		]
	}
	getQrMonth(){
		return [
			new Composite({
				headerName: "Qr",
				category: this.query('qr').map( qr => {
					return new Composite({
						headerName: "Month",
						member: qr,
						category: this.query('month', { qr: qr }),
						remove: (member)=>{ this.removeMember('market', member ) },
						add: (member)=>{ this.addMember('market', member ) }
					})
				})
			})
		]
	}
	getYearQr(){
		return [
			new Composite({
				headerName: "Year",
				category: this.query('year').map( year => {
					return new Composite({
						headerName: "Year Tables",
						member: year,
						category: this.query('qr', { year: year }),
						remove: (member)=>{ this.removeMember('qr', member ) },
						add: (member)=>{ this.addMember('qr', member ) }
					});
				}),
				remove: (member)=>{ this.removeMember('year', member ) },
				add: (member)=>{ this.addMember('year', member ) }
			})
		]
	}
	getYearQrMonth(){
		return [
			new Composite({
				headerName: "Year",
				categoryName: "Year category",
				remove: (member)=>{ this.removeMember('year', member ) },
				add: (member)=>{ this.addMember('year', member ) },
				category: this.query('year').map( year => {
					const space = { year: year };

					return new Composite({
						headerName: "Qr",
						categoryName: "Qr category",
						member: year,
						remove: (member)=>{ this.removeMember('qr', member) },
						add: (member)=>{ this.addMember('qr', member, space ) },
						category: this.query('qr', space).map( qr => {
							const space = { qr: qr, year: year };

							return new Composite({
								headerName: "Month",
								member: qr,
								category: this.query('month', space),
								remove: (member)=>{ this.removeMember('month', member ) },
								add: (member)=>{ this.addMember('month', member, space ) }
							})
						})
					})
				})
			})
		]
	}
}