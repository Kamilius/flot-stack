(($) ->
  options =
    series:
      stack: null

  init = (plot) ->
    groupData = (plot, s, data, datapoints) ->
      return if not s.group? or not s.group
      interval = s.groupInterval
      newpoints = {}
      i = 0
      ps = if s.bars? and s.bars then 3 else 2


      while (i < data.length)
        x = Math.round(data[i][0] / interval) * interval
        ps = data[i].length if not ps?
        if not newpoints[x]?
          newpoints[x] = []
          newpoints[x][0] = x
          newpoints[x][1] = data[i][1]
          newpoints[x][2] = 0 if s.bars? and s.bars
        else
          newpoints[x][1] += data[i][1]
        i++

      points = []
      for key, point of newpoints
        points = points.concat(point)
      datapoints.points = points
      datapoints.pointsize = ps


      format = []
      format.push
        x: true
        number: true
        required: true
      format.push
        y: true
        number: true
        required: true

      if s.bars.show or (s.lines.show and s.lines.fill)
        autoscale = !!((s.bars.show && s.bars.zero) || (s.lines.show && s.lines.zero))
        format.push
          y: true
          number: true
          required: false
          defaultValue: 0
          autoscale: autoscale
        if s.bars.horizontal
          delete format[format.length - 1].y
          format[format.length - 1].x = true

      datapoints.format = format
      return

    plot.hooks.processRawData.push groupData
    return

  $.plot.plugins.push
    init: init
    options: options
    name: 'group'
    version: '0.1'
  return)(jQuery)