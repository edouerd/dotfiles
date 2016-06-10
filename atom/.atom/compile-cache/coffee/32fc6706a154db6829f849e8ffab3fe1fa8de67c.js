(function() {
  var CompositeDisposable, _;

  CompositeDisposable = require('atom').CompositeDisposable;

  _ = require('underscore-plus');

  module.exports = {
    activate: function() {
      this.disposables = new CompositeDisposable;
      atom.grammars.getGrammars().map((function(_this) {
        return function(grammar) {
          return _this.disposables.add(_this.createCommand(grammar));
        };
      })(this));
      return this.disposables.add(atom.grammars.onDidAddGrammar((function(_this) {
        return function(grammar) {
          return _this.disposables.add(_this.createCommand(grammar));
        };
      })(this)));
    },
    deactivate: function() {
      return this.disposables.dispose();
    },
    createCommand: function(grammar) {
      var workspaceElement;
      if ((grammar != null ? grammar.name : void 0) != null) {
        workspaceElement = atom.views.getView(atom.workspace);
        return atom.commands.add(workspaceElement, "set-syntax:" + grammar.name, function() {
          var _ref;
          return (_ref = atom.workspace.getActiveTextEditor()) != null ? _ref.setGrammar(grammar) : void 0;
        });
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vkb3VhcmQvU2l0ZXMvZWRvdWFyZC9kb3RmaWxlcy9hdG9tLy5hdG9tL3BhY2thZ2VzL3NldC1zeW50YXgvbGliL21haW4uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNCQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFFQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBRkosQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxXQUFELEdBQWUsR0FBQSxDQUFBLG1CQUFmLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBZCxDQUFBLENBQTJCLENBQUMsR0FBNUIsQ0FBZ0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsT0FBRCxHQUFBO2lCQUM5QixLQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsS0FBQyxDQUFBLGFBQUQsQ0FBZSxPQUFmLENBQWpCLEVBRDhCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEMsQ0FGQSxDQUFBO2FBS0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxPQUFELEdBQUE7aUJBQzdDLEtBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixLQUFDLENBQUEsYUFBRCxDQUFlLE9BQWYsQ0FBakIsRUFENkM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE5QixDQUFqQixFQU5RO0lBQUEsQ0FBVjtBQUFBLElBVUEsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFBLEVBRFU7SUFBQSxDQVZaO0FBQUEsSUFnQkEsYUFBQSxFQUFlLFNBQUMsT0FBRCxHQUFBO0FBQ2IsVUFBQSxnQkFBQTtBQUFBLE1BQUEsSUFBRyxpREFBSDtBQUNFLFFBQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO2VBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUFxQyxhQUFBLEdBQWEsT0FBTyxDQUFDLElBQTFELEVBQWtFLFNBQUEsR0FBQTtBQUNoRSxjQUFBLElBQUE7NkVBQW9DLENBQUUsVUFBdEMsQ0FBaUQsT0FBakQsV0FEZ0U7UUFBQSxDQUFsRSxFQUZGO09BRGE7SUFBQSxDQWhCZjtHQU5GLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/edouard/Sites/edouard/dotfiles/atom/.atom/packages/set-syntax/lib/main.coffee
