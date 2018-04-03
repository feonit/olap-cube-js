import TreeTable from './component/tree-table.js'
import ProductTable from './model/ProductTable.js'
import factTable from './data/factTable.js'
import schema from './data/schema.js'
import Cube from '../../src/Cube.js'

const ProductTableCube = ProductTable(window.Cube ? window.Cube.default : Cube);

window.angular.module('demo', [])
	.component('treeTable', TreeTable)
	.controller('AppController', ['$scope', class DimensionTableController{
		constructor($scope){
			$scope.schema = schema;
			$scope.cube = new ProductTableCube(factTable, schema);
			$scope.factTable = $scope.cube.getFactTable(factTable);

			$scope.qr_selectedYear = "";
			$scope.$watch('qr_selectedYear', (year)=>{
				year = angular.copy(year);
				$scope.qrTable = $scope.cube.getQr(year);
				$scope.fotQrTable = { year: year };
			});

			$scope.month_selectedQr = "";
			$scope.monthYearTableRows = $scope.cube.getYear().rows;
			$scope.$watch('month_selectedQr', (month_selectedQr)=>{
				month_selectedQr = angular.copy(month_selectedQr);
				if (month_selectedQr){
					$scope.monthYearTableRows = $scope.cube.getYear(month_selectedQr).rows;
					// if ($scope.monthYearTableRows.length === 1){
					// 	$scope.month_selectedYear = $scope.monthYearTableRows[0].member
					// }
				}
				$scope.monthTable = $scope.cube.getMonth(month_selectedQr, $scope.month_selectedYear);
				$scope.forMonthTable = { qr: month_selectedQr, year: angular.copy($scope.month_selectedYear) }
			});

			$scope.month_selectedYear = "";
			$scope.monthQrTableRows = $scope.cube.getQr().rows;
			$scope.$watch('month_selectedYear', (month_selectedYear)=>{
				month_selectedYear = angular.copy(month_selectedYear)
				if (month_selectedYear){
					$scope.monthQrTableRows = $scope.cube.getQr(month_selectedYear).rows;
				}
				$scope.monthTable = $scope.cube.getMonth($scope.month_selectedQr, month_selectedYear);
				$scope.forMonthTable = { qr: angular.copy($scope.month_selectedQr), year: month_selectedYear }
			});

			const reset = () => {
				$scope.marketTable = $scope.cube.getMarket();
				$scope.productTable = $scope.cube.getProduct();
				$scope.markTable = $scope.cube.getMark();
				$scope.monthTable = $scope.cube.getMonth();
				$scope.yearTable = $scope.cube.getYear();
				$scope.qrMonthTable = $scope.cube.getQrMonth();
				$scope.qrTable = $scope.cube.getQr();
				$scope.yearQrMonthTable = $scope.cube.getYearQrMonth();
				$scope.yearQrTable = $scope.cube.getYearQr();
			};

			$scope.reset = reset;
			reset();

			$scope.$watch('cube', () => {
				$scope.outputData = $scope.cube.getFactTableOutput();
			}, true);
		}
	}]);

window.angular.bootstrap(document, ['demo']);