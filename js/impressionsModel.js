;(function (root, name) {
    'use strict';
    (typeof define !== 'function' || !define.amd
        ? typeof module == 'undefined' || !module.exports
            ? function (deps, factory) { root[name] = factory(root.Model); } // Browser
            : function (deps, factory) { module.exports = factory(require('model')); } // CommonJs
        : define // AMD
    )
    /*define*/(/*name, */['model'], function factory(Model) {
        var ImpressionsModel = Model.extend({
            _unit: ''
          , _name: 'impressions'

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
                    var targetTotal = 5e7/31*2;
                    for(var i=0,l=31; i<l; i++) {
                        self._data[i] = {
                            value: Math.random()*targetTotal
                          , device: Math.random() > .5 ? 'phone' : 'tablet'
                        };
                    }
                    cb && cb(undefined, self._data);
                }
                else {
                    cb && cb(undefined, self._data);
                }
                return self._data;
            }
        });

        return ImpressionsModel;
        // ---------------------------------------------------------------------------
    });
}
(this, 'ImpressionsModel'));