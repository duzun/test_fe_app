// -----------------------------------------------------
/**
 *  Specs for model.js.
 *
 *
 *  @author DUzun.Me
 *
 */
// -----------------------------------------------------
;(function (name, root) {
  'use strict';

  (typeof define == 'function' && define.amd
      ? define
      : (function (require) {
          return typeof module != 'undefined' && module.exports
          ? function (deps, factory) { module.exports = factory(require, module, require('../model')); }
          : function (deps, factory) { root[name] = factory(require, undefined, root.Model); }
      }
      (typeof require == 'function' ? require : function (id){return root[id]}))
  )
  /*define*/(
  ['require', 'module'
      , '../model'
  ]
  , function (require, module, Model) {
        var model;
        describe('Model', function () {
            beforeEach(function () {
                if ( !model ) {
                    model = new Model();
                }
            });
            describe('.loadData(cb)', function () {
                it('should call cb()', function (cb) {
                    model.loadData(function (error, data) {
                        expect(true).toBe(true);
                        cb();
                    });
                });
                it('should pass an array of {value, device} to cb()', function (cb) {
                    model.loadData(function (error, data) {
                        expect(data).toEqual(jasmine.any(Array));
                        data.forEach(function (item) {
                            expect('value' in item).toBeTruthy();
                            expect('device' in item).toBeTruthy();
                        });
                        cb();
                    });                   
                });
            });
        });
  });

}('ModelSpec', typeof global == 'undefined' ? this : global));
