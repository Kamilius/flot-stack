// Generated by CoffeeScript 1.6.3
(function() {
  (function($) {
    var init, options;
    options = {
      series: {
        stack: null
      }
    };
    init = function(plot) {
      var negOffsets, posOffsets, stackData;
      posOffsets = [];
      negOffsets = [];
      stackData = function(plot, series, datapoints) {
        var i, newpoints, points, ps;
        if ((series.stack == null) || series.stack === false) {
          return;
        }
        points = datapoints.points;
        newpoints = [];
        ps = datapoints.pointsize;
        i = 0;
        while (i < points.length) {
          if (posOffsets[i] == null) {
            posOffsets[i] = 0;
          }
          if (negOffsets[i] == null) {
            negOffsets[i] = 0;
          }
          newpoints.push(points[i]);
          if (points[i + 1] > 0) {
            newpoints.push(points[i + 1] + posOffsets[i]);
            newpoints.push(posOffsets[i]);
          } else {
            newpoints.push(points[i + 1] + negOffsets[i]);
            newpoints.push(negOffsets[i]);
          }
          if (points[i + 1] > 0) {
            posOffsets[i] += points[i + 1];
          } else {
            negOffsets[i] += points[i + 1];
          }
          i += ps;
        }
        datapoints.points = newpoints;
      };
      plot.hooks.processDatapoints.push(stackData);
    };
    $.plot.plugins.push({
      init: init,
      options: options,
      name: 'stacksplit',
      version: '0.1'
    });
  })(jQuery);

}).call(this);

/*
//@ sourceMappingURL=jquery.flot.stacksplit.map
*/
