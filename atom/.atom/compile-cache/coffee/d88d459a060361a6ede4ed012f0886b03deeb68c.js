(function() {
  var ExpressionsRegistry, PathScanner, VariableExpression, VariableScanner, async, fs, scopeFromFileName;

  async = require('async');

  fs = require('fs');

  VariableScanner = require('../variable-scanner');

  VariableExpression = require('../variable-expression');

  ExpressionsRegistry = require('../expressions-registry');

  scopeFromFileName = require('../scope-from-file-name');

  PathScanner = (function() {
    function PathScanner(filePath, registry) {
      var scope;
      this.filePath = filePath;
      scope = scopeFromFileName(this.filePath);
      this.scanner = new VariableScanner({
        registry: registry,
        scope: scope
      });
    }

    PathScanner.prototype.load = function(done) {
      var currentChunk, currentLine, currentOffset, lastIndex, line, readStream, results;
      currentChunk = '';
      currentLine = 0;
      currentOffset = 0;
      lastIndex = 0;
      line = 0;
      results = [];
      readStream = fs.createReadStream(this.filePath);
      readStream.on('data', (function(_this) {
        return function(chunk) {
          var index, lastLine, result, v, _i, _len;
          currentChunk += chunk.toString();
          index = lastIndex;
          while (result = _this.scanner.search(currentChunk, lastIndex)) {
            result.range[0] += index;
            result.range[1] += index;
            for (_i = 0, _len = result.length; _i < _len; _i++) {
              v = result[_i];
              v.path = _this.filePath;
              v.range[0] += index;
              v.range[1] += index;
              v.definitionRange = result.range;
              v.line += line;
              lastLine = v.line;
            }
            results = results.concat(result);
            lastIndex = result.lastIndex;
          }
          if (result != null) {
            currentChunk = currentChunk.slice(lastIndex);
            line = lastLine;
            return lastIndex = 0;
          }
        };
      })(this));
      return readStream.on('end', function() {
        emit('scan-paths:path-scanned', results);
        return done();
      });
    };

    return PathScanner;

  })();

  module.exports = function(_arg) {
    var paths, registry;
    paths = _arg[0], registry = _arg[1];
    registry = ExpressionsRegistry.deserialize(registry, VariableExpression);
    return async.each(paths, function(p, next) {
      return new PathScanner(p, registry).load(next);
    }, this.async());
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vkb3VhcmQvU2l0ZXMvZWRvdWFyZC9kb3RmaWxlcy9hdG9tLy5hdG9tL3BhY2thZ2VzL3BpZ21lbnRzL2xpYi90YXNrcy9zY2FuLXBhdGhzLWhhbmRsZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1HQUFBOztBQUFBLEVBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxPQUFSLENBQVIsQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQURMLENBQUE7O0FBQUEsRUFFQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSxxQkFBUixDQUZsQixDQUFBOztBQUFBLEVBR0Esa0JBQUEsR0FBcUIsT0FBQSxDQUFRLHdCQUFSLENBSHJCLENBQUE7O0FBQUEsRUFJQSxtQkFBQSxHQUFzQixPQUFBLENBQVEseUJBQVIsQ0FKdEIsQ0FBQTs7QUFBQSxFQUtBLGlCQUFBLEdBQW9CLE9BQUEsQ0FBUSx5QkFBUixDQUxwQixDQUFBOztBQUFBLEVBT007QUFDUyxJQUFBLHFCQUFFLFFBQUYsRUFBWSxRQUFaLEdBQUE7QUFDWCxVQUFBLEtBQUE7QUFBQSxNQURZLElBQUMsQ0FBQSxXQUFBLFFBQ2IsQ0FBQTtBQUFBLE1BQUEsS0FBQSxHQUFRLGlCQUFBLENBQWtCLElBQUMsQ0FBQSxRQUFuQixDQUFSLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFELEdBQWUsSUFBQSxlQUFBLENBQWdCO0FBQUEsUUFBQyxVQUFBLFFBQUQ7QUFBQSxRQUFXLE9BQUEsS0FBWDtPQUFoQixDQURmLENBRFc7SUFBQSxDQUFiOztBQUFBLDBCQUlBLElBQUEsR0FBTSxTQUFDLElBQUQsR0FBQTtBQUNKLFVBQUEsOEVBQUE7QUFBQSxNQUFBLFlBQUEsR0FBZSxFQUFmLENBQUE7QUFBQSxNQUNBLFdBQUEsR0FBYyxDQURkLENB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

//# sourceURL=/Users/edouard/Sites/edouard/dotfiles/atom/.atom/packages/pigments/lib/tasks/scan-paths-handler.coffee
