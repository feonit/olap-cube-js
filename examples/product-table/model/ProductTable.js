import Cube from '../../../src/Cube.js'
import Composite from './Composite.js'

// todo: add some functional in Cube
export default class ProductTable extends Cube{
	getPlace(){
		return this.query('place')
	}
	getProduct(){
		return this.query('product')
	}
	getMark(){
		return this.query('mark')
	}
	getMonth(qr, year){
		return this.query('month', { 'qr': qr, 'year': year })
	}
	getQr(year){
		return this.query('qr', { 'year': year })
	}
	getYear(){
		return this.query('year')
	}
	getQrMonth(){
		return this.getQr().map( qr => {
			return new Composite({
				member: qr,
				category: this.getMonth(qr)
			})
		})
	}
	getYearQr(){
		return this.getYear().map( year => {
			return new Composite({
				member: year,
				category: this.getQr(year)
			});
		})
	}
	getYearQrMonth(){
		return this.getYearQr().map( composite => {
			return {
				member: composite.member,
				category: composite.category.map( qr => {
					return new Composite({
						member: qr,
						category: this.getMonth(qr, composite.member)
					});
				})
			};
		})
	}
}