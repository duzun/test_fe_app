
require(
    ['view', 'revenueModel', 'impressionsModel', 'visitsModel']
  , function (View, RevenueModel, ImpressionsModel, VisitsModel) {
        'use strict';
        // Dev stuff:
        if ( window.localStorage && localStorage.isDev == '1' ) {
            require(['libs/dev/jajax'], function (jajax) {
                // watchem expects global jQuery or jajax, its just for dev ;-)
                window.jajax = jajax;
                require(['libs/dev/watchem']);
            });
        }


        // Prepare models
        var revenuModel      = new RevenueModel();
        var impressionsModel = new ImpressionsModel();
        var visitsModel      = new VisitsModel();

        // Prepare views
        var revenuView      = new View(document.querySelector('[data-chart="revenue"]'), revenuModel);
        var impressionsView = new View(document.querySelector('[data-chart="impressions"]'), impressionsModel);
        var visitsView      = new View(document.querySelector('[data-chart="visits"]'), visitsModel);

        // Log some data:
        console.log(revenuModel.constructor.getInstances().map(function (model) {
            return model.getName()+model.constructor.type;
        }));

        console.log(revenuView.constructor.type);

    }
);