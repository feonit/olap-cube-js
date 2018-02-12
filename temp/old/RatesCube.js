angular.module('RatesCube', ['Cube'])
    .factory('RatesCube', ['Cube', function(Cube){

        class RatesCube extends Cube {
            constructor(rates){
                const measurementsSchema = [
                    {
                        name: "currencies",
                        keyProps: ['currency_id']
                    },
                    {
                        name: "periods",
                        keyProps: ['period_from_notation', 'period_to_notation'],
                        otherProps: ['period_from', 'period_to']
                    },
                    {
                        name: "variations",
                        keyProps: ['rate_variation_delta', 'rate_variation_id'],
                        dependency: 'currencies'
                    },
                    {
                        name: "amounts",
                        keyProps: ['amount_from', 'amount_to'],
                        dependency: 'variations'
                    },
                    {
                        name: "initialCollateral",
                        keyProps: ['initial_fee_from', 'initial_fee_to', 'collateral_ratio_to', 'collateral_ratio_from'],
                        dependency: 'amounts'
                    },
                    {
                        name: "rates",
                        keyProps: ['rate_min', 'rate_max'],
                        dependency: ['initialCollateral', 'periods']
                    },
                ];
                const measurementsSchema2 = {
                    name: "rates",
                    keyProps: ['rate_min', 'rate_max'],
                    dependency: [
                        {
                            name: 'initialCollateral'
                            keyProps: ['initial_fee_from', 'initial_fee_to', 'collateral_ratio_to', 'collateral_ratio_from'],
                            dependency: [
                                {
                                    name: "amounts",
                                    keyProps: ['amount_from', 'amount_to'],
                                    dependency: [
                                        {
                                            name: "variations",
                                            keyProps: ['rate_variation_delta', 'rate_variation_id'],
                                            dependency: [
                                                {
                                                    name: "currencies",
                                                    keyProps: ['currency_id']
                                                },
                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'periods',
                            keyProps: ['period_from_notation', 'period_to_notation'],
                            otherProps: ['period_from', 'period_to']
                        }
                    ]
                };

                super(rates, measurementsSchema);
                this.rates = rates;
                this.schema = measurementsSchema;
            }
            getRatesListAnalize(){
                return this.getListAnalize(Object);
            }

            getRatesList(){
                return this.getList(Object)
            }

            getPeriods(){
                return this.unique('periods');
            }
            getCurrencies(){
                return this.unique('currencies');
            }
            getVariations(currency){
                return this.unique('variations', {currencies: currency});
            }
            getAmounts(variation){
                return this.unique('amounts', {variations: variation});
            }
            getInitialCollateral(amount){
                return this.unique('initialCollateral', {amounts: amount});
            }
            getRates(initialCollateral){
                return this.unique('rates', {initialCollateral: initialCollateral});
            }
            addPeriod(){
                this.addColumn('periods', { period_from_notation: null, period_to_notation: null })
            }
            addCurrency(options){
                this.addColumn('currencies', options );
            }
            addAmount(variation, currency){
                this.addColumn('amounts', {}, { currencies: currency, variations: variation } )
            }
            addInitialCollateral(amount, variation, currency){
                this.addColumn('initialCollateral', {}, { currencies: currency, variations: variation, amounts: amount } )
            }
            removePeriod(period){
                this.removeMember('periods', period, ['rates']);
            }
            removeCurrency(currency){
                this.removeMember('currencies', currency, ['variations', 'initialCollateral', 'amounts', 'rates']);
            }
            removeAmount(amount){
                this.removeMember('amounts', amount, ['initialCollateral', 'rates']);
            }
            removeInitialCollateral(initialCollateral){
                this.removeMember('initialCollateral', initialCollateral, ['rates'])
            }
            /**
             * Проверка, появились ли битые данные
             * */
            checkUniqueKeys(){
                // валидация уникальных ключей, они не должны повторяться после денормализации списка ставок
                let errorMessage = null;
                const rates = this.getRatesListAnalize();

                // способ рабочий только для имеющихся данных
                if (rates.length){
                    const testedRatesCube = new RatesCube(rates);
                    const changedRatesCube = this;

                    if (changedRatesCube.measurements.periods.length !== testedRatesCube.measurements.periods.length){
                        errorMessage = 'Одинаковых сроков быть не должно';
                    }
                    else if (changedRatesCube.measurements.currencies.length !== testedRatesCube.measurements.currencies.length){
                        errorMessage = 'Одинаковых валют быть не должно';
                    }
                    else if (changedRatesCube.measurements.variations.length !== testedRatesCube.measurements.variations.length){
                        errorMessage = 'В рамках одной валюты не может быть одинаковых вариантов';
                    }
                    else if (changedRatesCube.measurements.amounts.length !== testedRatesCube.measurements.amounts.length){
                        errorMessage = 'Одинаковых сумм быть не должно';
                    }
                    else if (changedRatesCube.measurements.initialCollateral.length !== testedRatesCube.measurements.initialCollateral.length){
                        errorMessage = 'В рамках одной суммы не может быть одинаковых первоначальных взносов. \nВ рамках одной суммы не может быть одинаковых КЗ';
                    }
                    // else if (changedRatesCube.measurements.rates.length !== testedRatesCube.measurements.rates.length){
                    // 	errorMessage = 'Одинаковых ставок быть не должно';
                    // }

                    if (errorMessage){
                        return Error(errorMessage)
                    } else {
                        return errorMessage;
                    }
                }
            }
        }

        return RatesCube;

    }]);