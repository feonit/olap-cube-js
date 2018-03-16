import Cube from '../../../src/Cube.js'
import Composite from './Composite.js'

// todo: add some functional in Cube
export default class ProductTable extends Cube{
	getFactTable(){
		return new Composite({
			headerName: "Fact Table",
			rows: this.facts.map( member =>{
				return new Composite({ member: member })
			}),
			//todo methods for add/remove rows of fact table
		})
	}
	getFactTableOutput(){
		return new Composite({
			headerName: "Fact Table",
			rows: super.getDataArray().map( member =>{
				return new Composite({ member: member })
			})
		})
	}
	getProduct(){
		return new Composite({
			headerName: "Product",
			rows: this.query('product').map( member => {
				return new Composite({ member: member })
			}),
			add: (member)=>{ this.addMember('product', member ) },
			remove: (member)=>{ this.removeMember('product', member ) }
		})
	}
	getMarket(){
		return new Composite({
			headerName: "Market",
			rows: this.query('market').map( member => {
				return new Composite({ member: member })
			}),
			add: (member)=>{ this.addMember('market', member ) },
			remove: (member)=>{ this.removeMember('market', member ) }
		})
	}
	getMark(){
		return new Composite({
			headerName: "Mark",
			rows: this.query('mark').map( member => {
				return new Composite({ member: member })
			}),
			remove: (member)=>{ this.removeMember('mark', member ) },
			add: (member)=>{ this.addMember('mark', member ) }
		})
	}
	getMonth(qr, year){
		return new Composite({
			headerName: "Month",
			rows: this.query('month', { 'qr': qr, 'year': year }).map( member => {
				return new Composite({ member: member })
			}),
			remove: (member)=>{ this.removeMember('month', member ) },
			add: (member)=>{ this.addMember('month', member ) }
		})
	}
	getQr(year){
		return new Composite({
			headerName: "Qr",
			rows: this.query('qr', { 'year': year }).map( member => {
				return new Composite({ member: member })
			}),
			remove: (member)=>{ this.removeMember('qr', member ) },
			add: (member)=>{ this.addMember('qr', member ) }
		})
	}
	getYear(){
		return new Composite({
			headerName: "Year",
			rows: this.query('year').map( member => {
				return new Composite({ member: member })
			}),
			remove: (member)=>{ this.removeMember('year', member ) },
			add: (member)=>{ this.addMember('year', member ) }
		})
	}
	getQrMonth(){
		return new Composite({
			headerName: "Qr",
			categoryName: "Qr category",
			add: (member)=>{ this.addMember('qr', member ) },
			remove: (member)=>{ this.removeMember('qr', member ) },
			rows: this.query('qr').map( qr => {
				const space = { qr };

				return new Composite({
					headerName: "Month",
					member: qr,
					add: (member)=>{ this.addMember('market', member, space ) },
					remove: (member)=>{ this.removeMember('market', member ) },
					rows: this.query('month', space).map( member => {
						return new Composite({ member: member })
					})
				})
			})
		})
	}
	getYearQr(){
		return new Composite({
			headerName: "Year",
			categoryName: "Year category",
			add: (member)=>{ this.addMember('year', member ) },
			remove: (member)=>{ this.removeMember('year', member ) },
			rows: this.query('year').map( year => {
				const space = { year };

				return new Composite({
					headerName: "Year Tables",
					member: year,
					add: (member)=>{ this.addMember('qr', member, space ) },
					remove: (member)=>{ this.removeMember('qr', member ) },
					rows: this.query('qr', space).map( member => {
						return new Composite({ member: member })
					})
				});
			})
		})
	}
	getYearQrMonth(){
		return new Composite({
			headerName: "Year",
			categoryName: "Year category",
			add: (member)=>{ this.addMember('year', member ) },
			remove: (member)=>{ this.removeMember('year', member ) },
			rows: this.query('year').map( year => {
				const space = { year };

				return new Composite({
					member: year,
					headerName: "Qr",
					categoryName: "Qr category",
					remove: (member)=>{ this.removeMember('qr', member) },
					add: (member)=>{ this.addMember('qr', member, space ) },
					rows: this.query('qr', space).map( qr => {
						const space = { qr, year };

						return new Composite({
							member: qr,
							headerName: "Month",
							remove: (member)=>{ this.removeMember('month', member ) },
							add: (member)=>{ this.addMember('month', member, space ) },
							rows: this.query('month', space).map( month => {
								return new Composite({
									member: month
								})
							})
						})
					})
				})
			})
		})
	}
}