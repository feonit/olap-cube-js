import Cube from '../../../src/Cube.js'
import Composite from './Composite.js'

// todo: add some functional in Cube
export default class ProductTable extends Cube{
	getProduct(){
		return [
			new Composite({
				name: "Product",
				category: this.query('product'),
				remove: (product)=>{ this.removeMember('product', product ) },
				add: (value)=>{ this.addMember('product', value ) }
			})
		]
	}
    getMarket(){
		return [
			new Composite({
				name: "Market",
				category: this.query('market'),
				remove: (market)=>{ this.removeMember('market', market ) },
				add: (value)=>{ this.addMember('product', value ) }
			})
		]
	}
	getMark(){
		return [
			new Composite({
				name: "Mark",
				category: this.query('mark'),
				remove: (mark)=>{ this.removeMember('mark', mark ) },
				add: (value)=>{
					this.addMember('mark', value )
				}
			})
		]
	}
	getMonth(qr, year){
		return [
			new Composite({
				name: "Month",
				category: this.query('month', { 'qr': qr, 'year': year }),
				remove: (month)=>{ this.removeMember('month', month ) },
				add: (value)=>{ this.addMember('month', value ) }
			})
		]
	}
	getQr(year){
		return [
			new Composite({
				name: "Qr",
				category: this.query('qr', { 'year': year }),
				remove: (qr)=>{ this.removeMember('qr', qr ) },
				add: (value)=>{ this.addMember('qr', value ) }
			})
		]
	}
	getYear(){
		return [
			new Composite({
				name: "Year",
				category: this.query('year'),
				remove: (year)=>{ this.removeMember('year', year ) },
				add: (value)=>{ this.addMember('year', value ) }
			})
		]
	}
	getQrMonth(){
		return this.query('qr').map( qr => {
			return new Composite({
				name: "Month Tables",
				member: qr,
				category: this.query('month', { qr: qr }),
				remove: (market)=>{ this.removeMember('market', market ) },
				add: (value)=>{ this.addMember('product', value ) }
			})
		})
	}
	getYearQr(){
		return [
			new Composite({
				name: "Year for Qr",
				category: this.query('year').map( year => {
					return new Composite({
						name: "Year Tables",
						member: year,
						category: this.query('qr', { year: year }),
						remove: (market)=>{
							this.removeMember('market', market )
						},
						add: (value)=>{
							this.addMember('product', value )
						}
					});
				})
			})
		]
	}
	getYearQrMonth(){
		return this.query('year').map( year => {
			return new Composite({
				name: "Year Tables",
				member: year,
				category: this.query('qr', { year: year }).map( qr => {
					return new Composite({
						name: "Qr Tables",
						member: qr,
						category: this.query('month', { qr: qr, year: year }),
						remove: (market)=>{
							this.removeMember('market', market )
						},
						add: (value)=>{
							this.addMember('product', value )
						}
					});
				}),
				remove: (market)=>{
					this.removeMember('market', market )
				},
				add: (value)=>{
					this.addMember('product', value )
				}
			});
		})
	}
}