;(function (root, name) {
    'use strict';
    (typeof define !== 'function' || !define.amd
        ? typeof module == 'undefined' || !module.exports
            ? function (deps, factory) { root[name] = factory(root.Classifyed); } // Browser
            : function (deps, factory) { module.exports = factory(require('./libs/classifyed')); } // CommonJs
        : define // AMD
    )
    /*define*/(/*name, */['libs/classifyed'], function factory(Classifyed) {
        var _Model = Classifyed.extend({
            _data: undefined
          , _data_loaded: false
          , _unit: ''
          , _unit_right: false
          , _name: '???'

          , getUnit: function () {
                return {
                    unit:  this._unit
                  , right: this._unit_right
                };
            }
          , getName: function () {
              return this._name;
          }  

          , constructor: function Model() {
                var self = this;
                self.__super__('constructor', arguments);
                _Model.registerInstance(self);
                self._data = [];

                self.loadData();
            }

            /**
             *  Load data from source.
             *
             *  @param (function) cb(error, data: array)
             *  @param (bool) forced - if TRUE, ignore cached data and load again from source
             */
          , loadData: function (cb, forced) {
                var self = this;
                if ( forced ) self._data_loaded = false;

                if ( !self._data_loaded ) {
                    self._data.length = 0;
                    var targetTotal = 2e5/31*2;
                    for(var i=0,l=31; i<l; i++) {
                        self._data[i] = {
                            value: Math.random()*targetTotal
                          , device: Math.random() > .5 ? 'phone' : 'tablet'
                        };
                    }
                    self._data_loaded = true;
                    cb && cb(undefined, self._data);
                }
                else {
                    cb && cb(undefined, self._data);
                }
                return self._data;
            }
          , getTotal: function () {
                var self = this;
                var total = 0;
                for(var i=0,l=self._data.length; i<l; i++) {
                    total += self._data[i].value;
                }
                return total;
            }
          , getTotalsByDevice: function () {
                var self = this;
                var dev = {};
                for(var i=0,l=self._data.length; i<l; i++) {
                    var dat = self._data[i];
                    dev[dat.device] = dev[dat.device] ? dev[dat.device] + dat.value : dat.value;
                }
                return dev;
            }
          , getPercentageByDevice: function () {
                var self = this;
                var percentageByDevice = {};
                var total = self.getTotal();
                self.each(self.getTotalsByDevice(), function (n,v) {
                    percentageByDevice[n] = v / total * 100;
                });
                return percentageByDevice;
            }
        },
        // ---------------------------------------------------------------------------
        {
            type: 'Model'
          , _instances: []
          , registerInstance: function (instance) {
                var _list = _Model._instances;
                if ( _list.indexOf(instance) == -1 ) {
                    _list.push(instance);
                }
            }
          , getInstances: function () {
                return _Model._instances;
            }
        });

        return _Model;
        // ---------------------------------------------------------------------------
    });
}
(this, 'Model'));