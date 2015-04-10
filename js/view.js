;(function (root, name) {
    'use strict';
    (typeof define !== 'function' || !define.amd
        ? typeof module == 'undefined' || !module.exports
            ? function (deps, factory) { root[name] = factory(Classifyed); } // Browser
            : function (deps, factory) { module.exports = factory(require('libs/classifyed')); } // CommonJs
        : define // AMD
    )
    /*define*/(/*name, */['libs/classifyed'], function factory(Classifyed) {
        // ---------------------------------------------------------------------------
        var slice = [].slice;

        var _View = Classifyed.extend({
            _unit: ''
          , _unit_right: false
          , getUnit: function () {
                return this._unit;
            }
          , setUnit: function (unit, right) {
                var self = this;
                if ( self._unit != unit ) {
                    self.selectAll('.unit').forEach(function (u) {
                        u.innerHTML = unit;
                    })
                    self._unit = unit;
                }
                right = !!right;
                if ( self._unit_right != right ) {
                    self._unit_right = right;
                    if ( right ) {
                        self.$view.classList.add('right-unit');
                    }
                    else {
                        self.$view.classList.remove('right-unit');
                    }
                }
            }

          , constructor: function View($view, model) {
                var self = this;

                self.model = model;
                self.$view = $view;
                self.doc = $view.ownerDocument || document;
                var tpl = self.getTemplate();
                $view.innerHTML = tpl.textContent;

                var total = model.getTotal();
                var totalsByDevice = model.getTotalsByDevice();
                var percentageByDevice = model.getPercentageByDevice();
                var unit = model.getUnit();
                self.setUnit(unit.unit, unit.right);

                self.select('.title').textContent = model.getName();
                self.select('.total .value').textContent = _View.formatNumber(total);
                self.select('.device-tablet .absolute .value').textContent   = _View.formatNumber(totalsByDevice.tablet);
                self.select('.device-phone .absolute .value').textContent    = _View.formatNumber(totalsByDevice.phone);
                self.select('.device-tablet .percentage .value').textContent = _View.formatNumber(percentageByDevice.tablet);
                self.select('.device-phone .percentage .value').textContent  = _View.formatNumber(percentageByDevice.phone);

                self.setArch(percentageByDevice.phone, 300);
            }

          , arcCoord: function (percentage, radius, dif) {
                var rad = Math.PI * (2 * percentage / 100 - 1 / 2);
                var x = Math.cos(rad) * radius;
                var y = Math.sin(rad) * radius;
                return [radius+x+dif,radius+y+dif]
            }

          , setArch: function (percentage, timeout) {
                var self = this;
                var circle = self.select('svg circle.base-circle');
                var arc = self.select('svg path.base-arc');

                var r = parseInt(circle.getAttribute('r'));
                var cx = parseInt(circle.getAttribute('cx'));
                var cy = parseInt(circle.getAttribute('cy'));

                function _set(percentage) {
                    var lsweep = Number(percentage>50);
                    var dif = cx - r;
                    var arcCoord = self.arcCoord(percentage, r, dif);
                    var d = 'M' + cx + ' ' + dif + ' A ' + r + ' ' + r + ', 0, '+lsweep+', 1, ' + arcCoord.join(' ');
                    arc.setAttribute('d', d);
                }

                if ( timeout ) {
                    var delay = 16;
                    var steps = timeout / delay;
                    var step_value = 0;
                    (function _anim() {
                        _set(percentage * step_value / steps);
                        if ( step_value++ < steps ) setTimeout(_anim, delay);
                    }());
                }
                else {
                    _set(percentage);
                }
            }

          , _template: undefined
          , getTemplate: function () {
                var self = this;
                if ( self._template == undefined ) {
                    self._template = self.select('#chart_tpl', self.doc);
                }
                return self._template;
            }

          , select: function (sel, context) {
                context = context || this.$view;
                return context.querySelector(sel);
            }
          , selectAll: function (sel, context) {
                context = context || this.$view;
                return slice.call(context.querySelectorAll(sel));
            }
        },
        // ---------------------------------------------------------------------------
        {
            type: 'View'

          , formatNumber: function (number) {
                var str = String(Math.round(parseFloat(number)));
                var parts = [];
                for(var i=str.length; 0<i; i-=3) {
                    parts.push(str.slice(Math.max(0,i-3), i));
                }
                var ret = parts.reverse().join('.');
                return ret;
            }
        });
        // ---------------------------------------------------------------------------
        return _View;
    });
}
(this, 'View'));