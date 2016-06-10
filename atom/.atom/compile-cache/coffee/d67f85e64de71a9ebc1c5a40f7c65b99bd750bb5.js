(function() {
  var hasCommand;

  hasCommand = require('./spec-helper').hasCommand;

  describe('Set Syntax', function() {
    var workspaceElement;
    workspaceElement = [][0];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      waitsForPromise(function() {
        return atom.packages.activatePackage('language-javascript');
      });
      return waitsForPromise(function() {
        return atom.packages.activatePackage('set-syntax');
      });
    });
    describe('activation', function() {
      return it('adds the commands', function() {
        return expect(hasCommand(workspaceElement, 'set-syntax:JavaScript')).toBeTruthy();
      });
    });
    return describe('deactivation', function() {
      beforeEach(function() {
        return atom.packages.deactivatePackage('set-syntax');
      });
      return it('removes the commands', function() {
        return expect(hasCommand(workspaceElement, 'set-syntax:JavaScript')).toBeFalsy();
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vkb3VhcmQvU2l0ZXMvZWRvdWFyZC9kb3RmaWxlcy9hdG9tLy5hdG9tL3BhY2thZ2VzL3NldC1zeW50YXgvc3BlYy9tYWluLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFVBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxlQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBRUEsUUFBQSxDQUFTLFlBQVQsRUFBdUIsU0FBQSxHQUFBO0FBQ3JCLFFBQUEsZ0JBQUE7QUFBQSxJQUFDLG1CQUFvQixLQUFyQixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxnQkFBQSxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBQW5CLENBQUE7QUFBQSxNQUVBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLHFCQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FGQSxDQUFBO2FBS0EsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsWUFBOUIsRUFEYztNQUFBLENBQWhCLEVBTlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBV0EsUUFBQSxDQUFTLFlBQVQsRUFBdUIsU0FBQSxHQUFBO2FBQ3JCLEVBQUEsQ0FBRyxtQkFBSCxFQUF3QixTQUFBLEdBQUE7ZUFDdEIsTUFBQSxDQUFPLFVBQUEsQ0FBVyxnQkFBWCxFQUE2Qix1QkFBN0IsQ0FBUCxDQUE2RCxDQUFDLFVBQTlELENBQUEsRUFEc0I7TUFBQSxDQUF4QixFQURxQjtJQUFBLENBQXZCLENBWEEsQ0FBQTtXQWVBLFFBQUEsQ0FBUyxjQUFULEVBQXlCLFNBQUEsR0FBQTtBQUN2QixNQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7ZUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFkLENBQWdDLFlBQWhDLEVBRFM7TUFBQSxDQUFYLENBQUEsQ0FBQTthQUdBLEVBQUEsQ0FBRyxzQkFBSCxFQUEyQixTQUFBLEdBQUE7ZUFDekIsTUFBQSxDQUFPLFVBQUEsQ0FBVyxnQkFBWCxFQUE2Qix1QkFBN0IsQ0FBUCxDQUE2RCxDQUFDLFNBQTlELENBQUEsRUFEeUI7TUFBQSxDQUEzQixFQUp1QjtJQUFBLENBQXpCLEVBaEJxQjtFQUFBLENBQXZCLENBRkEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/edouard/Sites/edouard/dotfiles/atom/.atom/packages/set-syntax/spec/main-spec.coffee
