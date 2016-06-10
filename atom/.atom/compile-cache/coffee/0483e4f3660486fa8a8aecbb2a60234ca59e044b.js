(function() {
  module.exports = {
    hasCommand: function(element, name) {
      var command, commands, found, _i, _len;
      commands = atom.commands.findCommands({
        target: element
      });
      for (_i = 0, _len = commands.length; _i < _len; _i++) {
        command = commands[_i];
        if (command.name === name) {
          found = true;
        }
      }
      return found;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vkb3VhcmQvU2l0ZXMvZWRvdWFyZC9kb3RmaWxlcy9hdG9tLy5hdG9tL3BhY2thZ2VzL3NldC1zeW50YXgvc3BlYy9zcGVjLWhlbHBlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FPRTtBQUFBLElBQUEsVUFBQSxFQUFZLFNBQUMsT0FBRCxFQUFVLElBQVYsR0FBQTtBQUNWLFVBQUEsa0NBQUE7QUFBQSxNQUFBLFFBQUEsR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQWQsQ0FBMkI7QUFBQSxRQUFBLE1BQUEsRUFBUSxPQUFSO09BQTNCLENBQVgsQ0FBQTtBQUNBLFdBQUEsK0NBQUE7K0JBQUE7WUFBMEMsT0FBTyxDQUFDLElBQVIsS0FBZ0I7QUFBMUQsVUFBQSxLQUFBLEdBQVEsSUFBUjtTQUFBO0FBQUEsT0FEQTthQUdBLE1BSlU7SUFBQSxDQUFaO0dBUEYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/edouard/Sites/edouard/dotfiles/atom/.atom/packages/set-syntax/spec/spec-helper.coffee
