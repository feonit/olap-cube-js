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
			rows: super.denormalize().map( member =>{
				return new Composite({ member: member })
			})
		})
	}
	getProduct(){
		return new Composite({
			headerName: "Product",
			rows: this.getDimensionMembers('product').map( member => {
				return new Composite({ member: member })
			}),
			add: (member)=>{ this.addDimensionMember('product', member ) },
			remove: (member)=>{ this.removeDimensionMember('product', member ) }
		})
	}
	getMarket(){
		return new Composite({
			headerName: "Market",
			rows: this.getDimensionMembers('market').map( member => {
				return new Composite({ member: member })
			}),
			add: (member)=>{ this.addDimensionMember('market', member ) },
			remove: (member)=>{ this.removeDimensionMember('market', member ) }
		})
	}
	getMark(){
		return new Composite({
			headerName: "Mark",
			rows: this.getDimensionMembers('mark').map( member => {
				return new Composite({ member: member })
			}),
			remove: (member)=>{ this.removeDimensionMember('mark', member ) },
			add: (member)=>{ this.addDimensionMember('mark', member ) }
		})
	}
	getMonth(qr, year){
		return new Composite({
			headerName: "Month",
			rows: this.getDimensionMembersBySet('month', { qr, year }).map( member => {
				return new Composite({ member: member })
			}),
			remove: (member)=>{ this.removeDimensionMember('month', member ) },
			add: (member, space)=>{ this.addDimensionMember('month', member, space ) }
		})
	}
	getQr(year){
		return new Composite({
			headerName: "Qr",
			rows: this.getDimensionMembersBySet('qr', { year }).map( member => {
				return new Composite({ member: member })
			}),
			remove: (member)=>{ this.removeDimensionMember('qr', member ) },
			add: (member, space)=>{ this.addDimensionMember('qr', member, space ) }
		})
	}
	getYear(qr){
		return new Composite({
			headerName: "Year",
			rows: this.getDimensionMembersBySet('year', {qr}).map( member => {
				return new Composite({ member: member })
			}),
			remove: (member)=>{ this.removeDimensionMember('year', member ) },
			add: (member)=>{ this.addDimensionMember('year', member ) }
		})
	}
	getQrMonth(){
		return new Composite({
			headerName: "Qr",
			categoryName: "Qr category",
			add: (member)=>{ this.addDimensionMember('qr', member ) },
			remove: (member)=>{ this.removeDimensionMember('qr', member ) },
			rows: this.getDimensionMembers('qr').map( qr => {
				const space = { qr };

				return new Composite({
					headerName: "Month",
					member: qr,
					add: (member, parentSpace)=>{ this.addDimensionMember('month', member, Object.assign({}, parentSpace, space) ) },
					remove: (member)=>{ this.removeDimensionMember('month', member ) },
					rows: this.getDimensionMembersBySet('month', space).map( member => {
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
			add: (member)=>{ this.addDimensionMember('year', member ) },
			remove: (member)=>{ this.removeDimensionMember('year', member ) },
			rows: this.getDimensionMembers('year').map( year => {
				const space = { year };

				return new Composite({
					headerName: "Year Tables",
					member: year,
					add: (member)=>{ this.addDimensionMember('qr', member, space ) },
					remove: (member)=>{ this.removeDimensionMember('qr', member ) },
					rows: this.getDimensionMembersBySet('qr', space).map( member => {
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
			add: (member)=>{ this.addDimensionMember('year', member ) },
			remove: (member)=>{ this.removeDimensionMember('year', member ) },
			rows: this.getDimensionMembers('year').map( year => {
				const space = { year };

				return new Composite({
					member: year,
					headerName: "Qr",
					categoryName: "Qr category",
					remove: (member)=>{ this.removeDimensionMember('qr', member) },
					add: (member)=>{ this.addDimensionMember('qr', member, space ) },
					rows: this.getDimensionMembersBySet('qr', space).map( qr => {
						const space = { qr, year };

						return new Composite({
							member: qr,
							headerName: "Month",
							remove: (member)=>{ this.removeDimensionMember('month', member ) },
							add: (member)=>{ this.addDimensionMember('month', member, space ) },
							rows: this.getDimensionMembersBySet('month', space).map( month => {
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