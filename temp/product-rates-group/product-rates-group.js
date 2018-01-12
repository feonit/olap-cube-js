angular.module('ProductRatesGroup', [
    'baModalWindow',
    'RatesTable',
    'RatesCube',
])
    .component("productRatesGroup", {
        templateUrl: "/static/build/mortgages/app/components/product-tabset/product-rates-group/product-rates-group.html",
        controllerAs: "$ctrl",
        bindings: {
            product: '<',
            dictionary: '<',
            productForm: '='
        },
        controller: ['$scope', 'mortgagesData', 'baModalWindow', 'RatesCube', 'RatesTable', class ProductEditRatesController {
            constructor($scope, mortgagesData, baModalWindow, RatesCube, RatesTable){
                this.$scope = $scope;
                this.mortgagesData = mortgagesData;
                this.baModalWindow = baModalWindow;
                this.RatesCube = RatesCube;
                this.RatesTable = RatesTable;
                /** @type {Product} */
                this.product = null;
                this.dictionary = null;
                /**
                 * Интерфейс по работе со списком ставок представленным в структурной (табличной) форме
                 * */
                this.ratesTable = null;

                this.MAX_PERIODS = 40;
                /**
                 * Для контрола отвечающего за выбор валюты
                 * */
                this.selectedCurrency = null;

                /**
                 * Для всех контролов в каждой валюте отвечающих за выбор значений по корректировкам
                 * */
                this.selectedMapCurrencyToVariation = {};

                this.mapCurrencyWithDisabledProp = [];

                this.IS_MODE_STRICT = true;
                // this.IS_MODE_NORMALIZE = true;
            }

            $onInit(){
                this.reset()
            }

            $onChanges(newValue, oldValue){
                if (newValue.product.currentValue){
                    if (this.product !== newValue.product.currentValue){
                        this.product = newValue.product.currentValue;
                        this.reset();
                    }
                }
            }

            /**
             * Метод нужно вызывать тогда, когда список ставок был изменен
             * */
            reset(){
                const rates = this.product.data.variations[0].rates;
                this.rates_specials = this.product.data.variations[0].rates_specials;
                this.productVariant = this.product.data.variations[0];

                if (this._unwatchTable){
                    this._unwatchTable();
                }
                if (this._unwatchCurrencies1){
                    this._unwatchCurrencies1();
                }

                if (this._unwatchCurrencies2){
                    this._unwatchCurrencies2();
                }

                if (this.IS_MODE_STRICT){
                    this.ratesTable = new this.RatesTable(rates);

                    // сортировка сроков
                    this.sortMaxMin(this.ratesTable.periods, 'period_from', 'period_to');
                    // сортировка валют
                    this.sortCurrency(this.ratesTable.currencies, this.dictionary.currency.map(item => {return {currency_id: item.code}} ));
                    // отслеживать все изменения внутри таблицы
                    this._unwatchTable = this.$scope.$watch('$ctrl.ratesTable', this.watchSomeWhereValuesChange.bind(this), true);
                    this._unwatchCurrencies1 = this.$scope.$watch('$ctrl.ratesTable.currencies', this.watchCurrencyForSyncSpecialRates.bind(this), true);
                    this._unwatchCurrencies2 = this.$scope.$watch('$ctrl.ratesTable.currencies', this.watchMapCurrencyWithDisabledProp.bind(this), true);

                    // сортировка сумм
                    this.ratesTable.currencies.forEach(currency => {
                        // первым должен быть основной вариант
                        this.sortMaxMin(currency.variations, 'rate_variation_id', 'rate_variation_id');
                        currency.variations.forEach(variation => {
                            //сортировка от большего к меньшему
                            variation.amounts.forEach( amount => {
                                this.sortMaxMin(amount.initialCollateral, 'initial_fee_from', 'initial_fee_to');
                            })
                        })
                    });

                } else {
                    this.ratesTable = new this.RatesCube(rates);

                    // сортировка сроков
                    this.sortMaxMin(this.ratesTable.measurements.periods, 'period_from', 'period_to').reverse();
                    // сортировка валют
                    this.sortCurrency(this.ratesTable.measurements.currencies, this.dictionary.currency.map(item => {return {currency_id: item.code}} ));
                    // отслеживать все изменения внутри таблицы
                    this._unwatchTable = this.$scope.$watch('$ctrl.ratesTable', this.watchSomeWhereValuesChange.bind(this), true);
                    this._unwatchCurrencies1 = this.$scope.$watch('$ctrl.ratesTable.measurements.currencies', this.watchCurrencyForSyncSpecialRates.bind(this), true);
                    this._unwatchCurrencies2 = this.$scope.$watch('$ctrl.ratesTable.measurements.currencies', this.watchMapCurrencyWithDisabledProp.bind(this), true);
                }

                // если ставки пусты, невозможно начать работу с таблицей без сроков
                if (!rates.length){
                    this.ratesTable.addPeriod();
                }
            }

            onAddCurrency(){
                if (this.selectedCurrency){
                    this.ratesTable.addCurrency({currency_id: this.selectedCurrency});
                    this.selectedCurrency = null;
                }
            }

            onRemoveCurrency(currency){
                this.ratesTable.removeCurrency(currency);
            }

            onAddAmount(variation, currency){
                this.ratesTable.addAmount(variation, currency);
            }

            onRemoveAmount(amount){
                this.ratesTable.removeAmount(amount);
            }

            onAddInitialCollateral(amount, variation, currency){
                this.ratesTable.addInitialCollateral(amount, variation, currency);
            }

            onRemoveInitialCollateral(initialCollateral){
                this.ratesTable.removeInitialCollateral(initialCollateral)
            }

            onAddPeriod(){
                const periods = this.ratesTable.getPeriods()
                if (this.isPossibleOfAddNewPeriod(periods)){
                    this.ratesTable.addPeriod()
                }
            }

            onRemovePeriod(period){
                this.ratesTable.removePeriod(period);
            }

            onAddVariation(currency){
                const variation = this.getSelectedVariationByCurrency(currency);
                const {rate_variation_delta, rate_variation_id} = variation;

                if ( !(rate_variation_delta && rate_variation_id) ){
                    alert('Нужно выбрать корректировку и ввести п.п.')
                    return;
                }

                // создать новую корректировку по опциям варианта и текущей валюте
                const rates = this.ratesTable.getRatesList();
                const ratesForCurrency = rates.filter( rate => {
                    return rate.currency_id === currency.currency_id && !this.mortgagesData.RateData.prototype.isCorrective(rate)
                });
                const correctiveRates = this.makeCorrectiveRates({rate_variation_delta, rate_variation_id}, ratesForCurrency);

                const allRates = [...rates, ...correctiveRates];
                this.product.data.variations[0].rates = allRates;

                // сброс ui
                variation.rate_variation_delta = null;
                variation.rate_variation_id = null;
                this.reset();
            }

            onUpdateVariation(currency){
                // отфильтровать не корректировки из списка ставок
                let rates = this.ratesTable.getRatesList();
                let ratesIsNotCorrective = rates.filter( rate => {
                    return !this.mortgagesData.RateData.prototype.isCorrective(rate);
                });

                // собрать варианты только по корректировкам
                let variations = this.ratesTable.getVariations(currency);
                variations = variations.filter( variation => {
                    // способ поиска корректирующих вариантов
                    return this.mortgagesData.RateData.prototype.isCorrective(variation)
                });

                // создать новые кор-ки по каждому варианту
                const newRates = [...ratesIsNotCorrective];
                variations.forEach( variation => {
                    const correctiveRates = this.makeCorrectiveRates(variation, ratesIsNotCorrective);
                    // и добавить новые кор-ки к новому списку ставок
                    newRates.splice(rates.length, 0, ...correctiveRates);
                });
                // обновить интерфейс
                this.product.data.variations[0].rates = newRates;
                this.reset();
            }

            onRemoveVariation(variation){
                const {rate_variation_delta, rate_variation_id} = variation;
                // отфильтровать не корректировки из списка ставок
                this.product.data.variations[0].rates = this.ratesTable.getRatesList().filter( rate => {
                    return !(rate.rate_variation_delta === rate_variation_delta && rate.rate_variation_id === rate_variation_id);
                });
                // обновить таблицу
                this.reset();
            }

            onRecalculateVariation(variation, currency, oldValue){
                const {rate_variation_delta, rate_variation_id} = variation;
                // найти все ставки принадлежащие этой валюте
                let rates = this.ratesTable.getRatesList().filter( rate => {
                    return rate.currency_id === currency.currency_id
                        && rate.rate_variation_delta === variation.rate_variation_delta
                        && rate.rate_variation_id === variation.rate_variation_id
                });
                rates.forEach( rate => {
                    rate.rate_min = rate.rate_min === null ? null : (rate.rate_min ? parseFloat(rate.rate_min) : 0) - (oldValue ? parseFloat(oldValue) : 0) + (rate_variation_delta ? parseFloat(rate_variation_delta) : 0);
                    rate.rate_max = rate.rate_max === null ? null : (rate.rate_max ? parseFloat(rate.rate_max) : 0) - (oldValue ? parseFloat(oldValue) : 0) + (rate_variation_delta ? parseFloat(rate_variation_delta) : 0);
                    rate.rate_variation_delta = rate_variation_delta;
                });
            }

            makeCorrectiveRates(variation, rates){
                const {rate_variation_delta, rate_variation_id} = variation;
                const copyRates = angular.copy(rates);
                copyRates.forEach( rate => {
                    delete rate.id;
                    rate.rate_variation_delta = rate_variation_delta;
                    rate.rate_variation_id = rate_variation_id;
                    rate.rate_min = rate.rate_min === null ? null : parseFloat(rate.rate_min) + parseFloat(rate_variation_delta);
                    rate.rate_max = rate.rate_max === null ? null : parseFloat(rate.rate_max) + parseFloat(rate_variation_delta);
                });
                return copyRates;
            }

            isPossibleOfAddNewPeriod(periods){
                return !periods.some(period => {
                    return !period.period_from_notation || !period.period_to_notation;
                })
            }

            /**
             * Кнопка недоступна, когда базовая таблица изменилась
             * */
            isDisabledUpdateVariation(currency){
                if (!this._baseRatesChanged){
                    this._baseRatesChanged = {};
                }
                // по дефолту кнопка всегда не активна
                return currency.currency_id in this._baseRatesChanged ? this._baseRatesChanged[currency.currency_id] : true;
            }

            onBaseRatesChanged(currency, disabled = false){
                if (!this._baseRatesChanged){
                    this._baseRatesChanged = {};
                }
                this._baseRatesChanged[currency.currency_id] = disabled;
            }

            /**
             * Возвращает выбранные опции варианта в рамках валюты
             * для создания новой таблицы корректировки
             * */
            getSelectedVariationByCurrency(currency){
                if (!this.selectedMapCurrencyToVariation[currency.currency_id]){
                    this.selectedMapCurrencyToVariation[currency.currency_id] = {
                        rate_variation_delta: null,
                        rate_variation_id: null
                    };
                }
                return this.selectedMapCurrencyToVariation[currency.currency_id];
            }

            /**
             * Формирует список доступных к выбору корректировок
             * для конктретной валюты
             * */
            getMapRateVariationWithDisabledProp(currency){
                if (!this._mapRateVariationWithDisabledProp){
                    this._mapRateVariationWithDisabledProp = {};
                }
                let dictionaryVariations;
                if (!this._mapRateVariationWithDisabledProp[currency.currency_id]){
                    dictionaryVariations = this._mapRateVariationWithDisabledProp[currency.currency_id] = this.dictionary.MortgageRateVariation.map( item => ({...item}));
                } else {
                    dictionaryVariations = this._mapRateVariationWithDisabledProp[currency.currency_id];
                }

                const variations = this.ratesTable.getVariations(currency);
                const map = dictionaryVariations.map( dictionaryVariation => {
                    const disabled = variations.some( variation => {
                        return dictionaryVariation.id == variation.rate_variation_id;
                    });
                    dictionaryVariation.disabled = disabled;
                    return dictionaryVariation;
                });
                return map;
            }

            /**
             * Возвращает имя валюты по справочнику
             * */
            getCurrencyNameFromDictionary(currency){
                if (this.dictionary.currency){
                    const finded = this.dictionary.currency.find( dictionaryCurrency => {
                        return dictionaryCurrency.code === currency.currency_id;
                    });
                    return finded ? finded.name : '';
                }
            }

            /**
             * Возвращает имя варианта по справочнику
             * */
            getVariationNameFromDictionary(variation){
                if (this.dictionary.MortgageRateVariation){
                    const finded = this.dictionary.MortgageRateVariation.find( dictionaryVariation => {
                        return dictionaryVariation.id == variation.rate_variation_id;
                    });
                    return finded ? finded.name : '';
                }
            }

            /**
             * Для валюты находит соответствующую
             * специальную ставку
             * */
            findRateSpecialByCurrency(currency){
                let find = this.rates_specials.find( rates_special => {
                    return rates_special.currency_id === currency.currency_id;
                });
                if (!find){
                    find = new this.mortgagesData.RateSpecialData({currency_id: currency.currency_id});
                    this.rates_specials.push(find);
                }
                return find;
            }

            /**
             * Способ сортировки валюты по справочнику
             * */
            sortCurrency(currencies, order){
                const sorted = [];
                order.forEach(currencyDict => {
                    currencies.find((item)=>{
                        if (currencyDict.currency_id === item.currency_id){
                            sorted.push(item);
                        }
                    })
                });
                currencies.splice(0, currencies.length);

                sorted.forEach((item)=>{
                    currencies.push(item);
                })
            }

            /**
             * Способ сортировки массива с объектами по двойному ключу.
             * @param {Object} array - массив объектов
             * @param {Object} max - имя параметра в объекте, второй ключ
             * @param {Object} min - имя параметра в объекте, первый ключ
             * */
            sortMaxMin(array, max, min){
                return array.sort((x, y) => {
                    var result = false;

                    // определим бесконечности
                    const yMax = y[max] === null;
                    const xMax = x[max] === null;
                    const yMin = y[min] === null;
                    const xMin = x[min] === null;

                    // если оба определены
                    if (!yMax && !xMax){
                        // просто сравнить
                        // если одинаковы, то сравниваем младшие разряды
                        if (y[max] === x[max]){
                            // смотрим тогда на младшие разряды
                            return small()
                        } else {
                            return result = y[max] > x[max];
                        }
                    }

                    if (yMax && !xMax){
                        return result = true;
                    }

                    if (!yMax && xMax){
                        return result = false;
                    }

                    if (yMax && xMax){
                        // смотрим тогда на младшие разряды
                        return small()
                    }

                    function small(){
                        // если оба определены
                        if (!yMin && !xMin){
                            // просто сравнить
                            if (y[min] === x[min]){
                                // тогда без разницы
                                return true;
                            } else {
                                return result = y[min] > x[min];
                            }
                        }

                        if (!yMin && xMin){
                            return result = false;
                        }

                        if (yMin && !xMin){
                            return result = true;
                        }

                        if (yMin && xMin){
                            // throw Error('такой ситуации не должно быть')
                            // теперь может, новые (пустые) ячейки будут в топе
                            return result = true;
                        }
                    }

                    return result;
                })
            }

            /**
             * Вотчер реагирует на добавление/удаление новой валюты в таблице, соответственно
             * добавляет/удаляет запись специальной ставки.
             * */
            watchCurrencyForSyncSpecialRates(newValue, oldValue){
                // только когда список валют изменился
                if(newValue.length < oldValue.length){
                    // случай когда валюта может быть удалена
                    const difference = _.difference(newValue, oldValue)
                    difference.forEach( differ => {
                        const index = oldValue.indexOf(differ);
                        this.rates_specials.splice(index, 1);
                    })
                } else
                if(newValue.length > oldValue.length){
                    const currency = newValue.find( newValue => {
                        return !oldValue.some( oldValue => {
                            return oldValue.currency_id === newValue.currency_id;
                        })
                    });
                    if (currency){
                        const data = new this.mortgagesData.RateSpecialData({currency_id: currency.currency_id});
                        this.rates_specials.push(data);
                    }
                }
            }

            /**
             * Вотчер формирует новый набор rates,
             * если в таблице произошли изменения, и записывает их в документ, если полученный набор rates
             * не содержит ошибок
             * */
            watchSomeWhereValuesChange(){
                let rates;
                let error;

                rates = this.ratesTable.getRatesList();

                if (!rates.length){
                    error = new Error('Необходимо добавить хотя бы одну ставку.');
                }

                if (!error){
                    error = this.ratesTable.checkUniqueKeys();
                }

                if (!error){
                    error = this.mortgagesData.RateData.prototype.checkRatesValidation.call({rates: rates});
                }

                if (error){
                    delete this.productForm.$error.rates;
                    this.productForm.$setValidity('rates', false, error);
                    console.log(error.message);
                } else {
                    delete this.productForm.$error.rates;
                    this.productForm.$setValidity('rates', true , null);
                    this.product.data.variations[0].rates = rates;
                }
            }

            /**
             * Вотчер формирует набор валют по словарю для селекта с дополнительной пометкой о том, что
             * какая-то валюта уже недоступна.
             * */
            watchMapCurrencyWithDisabledProp(){
                const dictionaryCurrencies = this.dictionary.currency;
                const currencies = this.ratesTable.getCurrencies();
                const map = dictionaryCurrencies.map( dictionaryCurrency => {
                    const disabled = currencies.some( currency => {
                        return dictionaryCurrency.code === currency.currency_id;
                    });
                    const item = {
                        ...dictionaryCurrency,
                        disabled
                    };
                    return item;
                });

                this.mapCurrencyWithDisabledProp = map;
            }
        }]
    });
