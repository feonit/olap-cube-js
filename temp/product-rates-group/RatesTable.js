angular.module('RatesTable', [])
    .factory('RatesTable', () => {

        class RatesTable{
            constructor(rates){
                /** @public */
                this.currencies = this.convertRates(rates);

                const groupRatesByPeriods = this.getGroupRatesByPeriods(rates);

                /** @public */
                this.periods = this.getUniquePeriodsFromGroup(groupRatesByPeriods);

                this.normalize();
            }
            convertRates(rates){
                // группировка по валюте
                const groupByCurrencyId = this.getGroupByCurrencyId(rates);

                const uniqCurrencyId = this.getUniqueCurrencyIdFromGroup(groupByCurrencyId);

                let debug;

                return debug = Object.keys(groupByCurrencyId).map( key => {
                    // группа по валюте
                    const rates = groupByCurrencyId[key];
                    // группировка по суммам
                    const groupByVariation = this.getGroupByVariation(rates);
                    return {
                        currency_id: rates[0].currency_id,

                        variations: debug = Object.keys(groupByVariation).map( key => {
                            // группа по вариантам
                            const rates = groupByVariation[key];
                            const groupByAmount = this.getGroupByAmount(rates);

                            return {
                                rate_variation_delta: rates[0].rate_variation_delta,
                                rate_variation_id: rates[0].rate_variation_id,
                                amounts: debug = Object.keys(groupByAmount).map( key => {
                                    // группа по суммам
                                    const rates = groupByAmount[key];
                                    // группировка по остальным столбцам
                                    const groupByInitialCollateral = this.getGroupByInitialCollateral(rates);
                                    return {
                                        amount_from: rates[0].amount_from,
                                        amount_to: rates[0].amount_to,

                                        initialCollateral: debug = Object.keys(groupByInitialCollateral).map( (key)=>{
                                            // группа по остальным столбцам
                                            const rates = groupByInitialCollateral[key];
                                            return {
                                                // общие
                                                initial_fee_from: rates[0].initial_fee_from,
                                                initial_fee_to: rates[0].initial_fee_to,
                                                collateral_ratio_from: rates[0].collateral_ratio_from,
                                                collateral_ratio_to: rates[0].collateral_ratio_to,

                                                rates: rates
                                            }
                                        })
                                    }
                                })
                            }
                        }),
                    }
                });
            }
            getRatesList(currencies = this.currencies){
                const rates = [];

                currencies.forEach(({currency_id, variations}) => {
                    variations.forEach(({rate_variation_delta, rate_variation_id, amounts}) => {
                        amounts.forEach(({amount_from, amount_to, initialCollateral}) => {
                            initialCollateral.forEach(({initial_fee_from, initial_fee_to, collateral_ratio_from, collateral_ratio_to, rates: initialCollateralRates}) => {
                                initialCollateralRates.forEach((rate, index) => {
                                    const period_to_notation = this.periods[index].period_to_notation;
                                    const period_from_notation = this.periods[index].period_from_notation;
                                    const props = {
                                        // далее обновляем общими значениями
                                        currency_id,
                                        amount_from,
                                        amount_to,
                                        initial_fee_from,
                                        initial_fee_to,
                                        collateral_ratio_from,
                                        collateral_ratio_to,
                                        period_from_notation,
                                        period_to_notation,
                                        rate_variation_delta,
                                        rate_variation_id,
                                    };

                                    // для анализа изменений
                                    props.rate_min = rate.rate_min;
                                    props.rate_max = rate.rate_max;
                                    props.id = rate.id;
                                    const $$hashKey = rate.$$hashKey;
                                    delete rate.$$hashKey;
                                    const differenceProperties = _.difference(_.keys(props), _.keys(rate));
                                    const differenceValues = _.reduce(rate, function(result, value, key) {
                                        return _.isEqual(value, props[key]) ?
                                            result : result.concat(key);
                                    }, []);
                                    if (differenceValues.length || differenceProperties.length /* todo удалить проверку после того как доделаю метод createRate */){
                                        const debug = 10;
                                    }

                                    delete props.rate_min;
                                    delete props.rate_max;
                                    delete props.id;
                                    rate.$$hashKey = $$hashKey;
                                    // end для анализа изменений

                                    // вливаем
                                    Object.assign(rate, props);

                                    rates.push(rate);
                                })
                            })
                        })
                    });

                });
                return rates;
            }

            /** @deprecated */
            normalize(){
                this.getCurrencies().forEach( currency => {
                    this.getVariations(currency).forEach( variation => {
                        this.getAmounts(variation, currency).forEach(amounts => {
                            this.getInitialCollateral(amounts, variation, currency).forEach(initialCollateral => {
                                const rates = initialCollateral.rates;
                                // далее сортировка элементов группы в соответствии с блоком periods
                                const ratesByPeriods = this.sortRatesByPeriods(rates, this.getPeriods());
                                // создание недостающих для таблицы rates (todo: убрать. это только для фейковых данных)
                                this.fillWithEmpty(ratesByPeriods, this.getPeriods(), rates[0]);
                                initialCollateral.rates = ratesByPeriods;
                            })
                        })
                    })
                })
            }
            getGroupRatesByPeriods(rates){
                // todo upgrade lodash to 4 version and refactor groupBy to uniqBy below
                const group = _.groupBy(rates, (rate)=>{
                    return [
                        rate.period_from_notation,
                        rate.period_to_notation
                    ].join()
                });
                return group;
            }
            getGroupByCurrencyId(rates){
                const group = _.groupBy(rates, (rate) => {
                    return [
                        rate.currency_id
                    ].join()
                });
                return group;
            }
            getGroupByVariation(rates){
                const group = _.groupBy(rates, (rate) => {
                    return [
                        rate.rate_variation_delta,
                        rate.rate_variation_id,
                    ].join()
                });
                return group;
            }
            getGroupByAmount(rates){
                const group = _.groupBy(rates, (rate) => {
                    return [
                        rate.amount_from,
                        rate.amount_to,
                    ].join()
                });
                return group;
            }
            getGroupByInitialCollateral(rates){
                const group =_.groupBy(rates, (rate) => {
                    return [
                        rate.initial_fee_from,
                        rate.initial_fee_to,
                        rate.collateral_ratio_from,
                        rate.collateral_ratio_to,
                    ].join()
                });
                return group;
            }
            getUniquePeriodsFromGroup(group){
                const periods = Object.keys(group).map( key => {
                    const rate = group[key][0];
                    return {
                        period_from_notation: rate.period_from_notation,
                        period_to_notation: rate.period_to_notation,
                        period_from: rate.period_from,
                        period_to: rate.period_to,
                    }
                });

                return periods;
            }
            getUniqueCurrencyIdFromGroup(group){
                const uniqCurrencyId = Object.keys(group).map( key => {
                    const rate = group[key][0];
                    return {
                        currency_id: rate.currency_id,
                    }
                });
                return uniqCurrencyId;
            }
            sortRatesByPeriods(rates, periods){
                const sorted = [];
                Object.keys(rates).forEach( key => {
                    const rate = rates[key];

                    const index = periods.findIndex((period)=>{
                        return rate.period_from_notation === period.period_from_notation
                            && rate.period_to_notation === period.period_to_notation
                    });

                    if (index === -1){
                        throw 'periods not valid'
                    }

                    sorted[index] = rate; //[rate.rate_min, rate.rate_max];
                });
                return sorted;
            }
            fillWithEmpty(rates, periods, etalonRate){
                const resetRateData = {
                    id: null,
                    rate_min: null,
                    rate_max: null,
                };
                // todo вынести создание клонов в модель RateData
                const clone = Object.assign({}, etalonRate, resetRateData);
                periods.forEach( (period, index) => {
                    if ( !rates[index] ){
                        console.warn('по идее, этот случай должен возникать только с фейковыми данными');
                        // для создания новой ставки используется за образец эталонная
                        // ставка (которая находится в той же строке) со сброшенными в дефолт частными параметрами
                        // и измененными сроками
                        rates[index] = Object.assign({}, clone, period);
                    }
                });
                return rates;
            }

            createCurrency(options){
                return {
                    currency_id: options.currency_id,
                    variations: [this.createVariation()]
                }
            }
            createVariation(){
                return {
                    rate_variation_id: null,
                    rate_variation_delta: null,
                    amounts: [this.createAmount()]
                }
            }
            createAmount(){
                return {
                    amount_from: null,
                    amount_to: null,
                    initialCollateral: [this.createInitialCollateral()]
                }
            }
            createPeriod(){
                return {
                    period_from_notation: null,
                    period_to_notation: null
                }
            }
            createInitialCollateral(){
                const initialCollateral = {
                    rates: [],//todo создание ставок по срокам перенести сюда
                    initial_fee_from: null,
                    initial_fee_to: null,
                    collateral_ratio_from: null,
                    collateral_ratio_to: null,
                };

                this.periods.forEach(()=>{
                    initialCollateral.rates.push(this.createRate())
                });

                return initialCollateral
            }
            createRate(){
                return {
                    rate_min: null,
                    rate_max: null
                }
            }

            getPeriods(){
                return this.periods;
            }
            getCurrencies(){
                return this.currencies;
            }
            getVariations(currency){
                return currency.variations
            }
            getAmounts(variation){
                return variation.amounts;
            }
            getInitialCollateral(amount){
                return amount.initialCollateral;
            }
            getRates(initialCollateral){
                return initialCollateral.rates;
            }

            addCurrency(options){
                const currency = this.createCurrency(options);
                this.currencies.push(currency);
            }
            addVariation(){
                // todo вынести сюда
            }
            addAmount(variation){
                variation.amounts.push(this.createAmount());
            }
            addInitialCollateral(amount){
                amount.initialCollateral.push(this.createInitialCollateral())
            }
            addPeriod(){
                this.periods.push(this.createPeriod());

                let initialCollateral = [];
                this.currencies.forEach((currency)=>{
                    currency.variations.forEach( variation => {
                        variation.amounts.forEach( amount => {
                            initialCollateral = initialCollateral.concat(amount.initialCollateral)
                        })
                    })
                });

                initialCollateral.forEach((initialCollateral)=>{
                    initialCollateral.rates.push(this.createRate())
                });
            }

            removePeriod(period){
                const index = this.periods.indexOf(period);
                this.periods.splice(index, 1);

                let initialCollateral = [];
                this.currencies.forEach((currencies)=>{
                    currencies.variations.forEach( variation => {
                        variation.amounts.forEach( amount => {
                            initialCollateral = initialCollateral.concat(amount.initialCollateral)
                        })
                    })
                });

                initialCollateral.forEach((initialCollateral)=>{
                    initialCollateral.rates.splice(index, 1);
                })
            }
            removeCurrency(currency){
                const index = this.currencies.indexOf(currency);
                this.currencies.splice(index, 1);
            }
            removeAmount(amount){
                this.currencies.forEach( currency => {
                    currency.variations.forEach( variation => {
                        const index = variation.amounts.indexOf(amount);
                        if (index !== -1){
                            variation.amounts.splice(index, 1);
                        }
                    });
                });
            }
            removeInitialCollateral(initialCollateral){
                this.currencies.forEach((currency, currencyIndex)=>{
                    currency.variations.forEach( variation => {
                        variation.amounts.forEach( (amount, amountIndex) => {
                            const index = amount.initialCollateral.indexOf(initialCollateral);
                            if (index !== -1){
                                amount.initialCollateral.splice(index, 1);

                                // если вариантов не осталось, логично удалить и сумму
                                if (!amount.initialCollateral.length){
                                    variation.amounts.splice(amountIndex, 1)
                                }

                                // если сумм не осталось, логично удалить и валюту
                                if (!variation.amounts.length){
                                    this.currencies.splice(currencyIndex, 1);
                                }
                            }
                        })
                    });
                });
            }
            checkUniqueKeys(){
                // валидация уникальных ключей, они не должны повторяться после денормализации списка ставок
                let errorMessage = null;
                const rates = this.getRatesList();

                if (this.periods.length !== Object.keys(this.getGroupRatesByPeriods(rates)).length){
                    errorMessage = 'Одинаковых сроков быть не должно';
                }

                else if (this.currencies.length !== Object.keys(this.getGroupByCurrencyId(rates)).length){
                    errorMessage = 'Одинаковых валют быть не должно';
                }

                this.currencies.forEach( currency => {
                    currency.variations.forEach((variation) => {
                        // собрать ставки в рамках текущего amount
                        let rates;

                        variation.amounts.reduce((rates, amount) => {
                            const result = amount.initialCollateral.reduce((rates, initialCollateral) => {
                                const args = [].concat(initialCollateral.rates);
                                args.unshift(0);
                                args.unshift(rates.length);
                                rates.splice.apply(rates, args);
                                return rates;
                            }, rates);
                            return result;
                        }, rates = []);

                        // сравнивается фактическое кол-во групп с кол-вом, которое можно сформировать из принадлежащих им в совокупности ставок
                        if (variation.amounts.length !== Object.keys(this.getGroupByAmount(rates)).length) {
                            errorMessage = 'Одинаковых сумм быть не должно';
                        }
                    });
                });

                this.currencies.forEach( currency => {
                    currency.variations.forEach(variation => {
                        variation.amounts.forEach( amount => {
                            // собрать ставки в рамках текущей amount
                            let rates;

                            rates = amount.initialCollateral.reduce((rates, initialCollateral) => {
                                const args = [].concat(initialCollateral.rates);
                                args.unshift(0);
                                args.unshift(rates.length);
                                rates.splice.apply(rates, args);
                                return rates;
                            }, rates = []);

                            // сравнивается фактическое кол-во групп с кол-вом, которое можно сформировать из принадлежащих им в совокупности ставок
                            if (amount.initialCollateral.length !== Object.keys(this.getGroupByInitialCollateral(rates)).length) {
                                errorMessage = 'В рамках одной суммы не может быть одинаковых первоначальных взносов. \nВ рамках одной суммы не может быть одинаковых КЗ';
                            }
                        });
                    });
                });


                // if (this.initialCollateral.length !== Object.keys(this.getGroupByInitialCollateral(rates)).length){
                //     errorMessage = 'В рамках одной суммы не может быть одинаковых первоначальных взносов. \nВ рамках одной суммы не может быть одинаковых КЗ';
                // }

                if (errorMessage){
                    return Error(errorMessage)
                } else {
                    return errorMessage;
                }

                return false;
            }
        }

        return RatesTable;
    });