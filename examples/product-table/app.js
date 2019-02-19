angular.module('demo', []).controller('AppController', ['$scope', 'ProductCube', 'factTable', 'dimensionHierarchies', function($scope, ProductCube, factTable, dimensionHierarchies){
	$scope.dimensionHierarchies = dimensionHierarchies;

	var cube = new ProductCube({dimensionHierarchies});
	cube.addFacts(factTable);
	$scope.cube = cube;
	window.cube = $scope.cube;
	$scope.factTable = $scope.cube.getFactTable(factTable);

	$scope.qr_selectedYear = '';
	$scope.$watch('qr_selectedYear', function(year) {
		year = angular.copy(year);
		$scope.qrTable = $scope.cube.getQr(year);
		$scope.fotQrTable = { year: year };
	});

	$scope.month_selectedQr = '';
	$scope.monthYearTableRows = $scope.cube.getYear().rows;
	$scope.$watch('month_selectedQr', function(month_selectedQr) {
		month_selectedQr = angular.copy(month_selectedQr);
		if (month_selectedQr) {
			$scope.monthYearTableRows = $scope.cube.getYear(month_selectedQr).rows;
			// if ($scope.monthYearTableRows.length === 1){
			// 	$scope.month_selectedYear = $scope.monthYearTableRows[0].member
			// }
		}
		$scope.monthTable = $scope.cube.getMonth(month_selectedQr);
		$scope.forMonthTable = { qr: month_selectedQr, year: angular.copy($scope.month_selectedYear) }
	});

	$scope.month_selectedYear = '';
	$scope.monthQrTableRows = $scope.cube.getQr().rows;
	$scope.$watch('month_selectedYear', function(month_selectedYear) {
		month_selectedYear = angular.copy(month_selectedYear);
		if (month_selectedYear) {
			$scope.monthQrTableRows = $scope.cube.getQr(month_selectedYear).rows;
		}
		$scope.monthTable = $scope.cube.getMonth($scope.month_selectedQr, month_selectedYear);
		$scope.forMonthTable = { qr: angular.copy($scope.month_selectedQr), year: month_selectedYear }
	});

	const reset = function() {
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

	$scope.$watch('cube', function() {
		$scope.outputData = $scope.cube.getFactTableOutput();
	}, true);
}]);
