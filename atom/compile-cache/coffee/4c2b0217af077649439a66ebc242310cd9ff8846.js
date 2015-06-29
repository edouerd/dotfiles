(function() {
  var concatPattern, isClosingTagLikePattern, isOpeningTagLikePattern, isTagLikePattern,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  concatPattern = /\s*[,|]+\s*/g;

  isTagLikePattern = /<(?![\!\/])([a-z]{1}[^>\s=\'\"]*)/i;

  isOpeningTagLikePattern = /<(?![\!\/])([a-z]{1}[^>\s=\'\"]*)/i;

  isClosingTagLikePattern = /<\/([a-z]{1}[^>\s=\'\"]*)/i;

  module.exports = {
    configDefaults: {
      closeOnEndOfOpeningTag: false,
      neverClose: 'br, hr, img, input, link, meta, area, base, col, command, embed, keygen, param, source, track, wbr',
      makeNeverCloseElementsSelfClosing: false,
      forceInline: 'title, h1, h2, h3, h4, h5, h6',
      forceBlock: '',
      additionalGrammars: ''
    },
    neverClose: [],
    forceInline: [],
    forceBlock: [],
    grammars: ['HTML'],
    makeNeverCloseSelfClosing: false,
    ignoreGrammar: false,
    activate: function() {
      atom.config.observe('autoclose-html.ignoreGrammar', (function(_this) {
        return function(value) {
          if (value === true) {
            atom.config.set('autoclose-html.additionalGrammars', '*');
            _this.ignoreGrammar = true;
          }
          return atom.config.set('autoclose-html.ignoreGrammar', null);
        };
      })(this));
      atom.config.observe('autoclose-html.neverClose', (function(_this) {
        return function(value) {
          return _this.neverClose = value.split(concatPattern);
        };
      })(this));
      atom.config.observe('autoclose-html.forceInline', (function(_this) {
        return function(value) {
          return _this.forceInline = value.split(concatPattern);
        };
      })(this));
      atom.config.observe('autoclose-html.forceBlock', (function(_this) {
        return function(value) {
          return _this.forceBlock = value.split(concatPattern);
        };
      })(this));
      atom.config.observe('autoclose-html.additionalGrammars', (function(_this) {
        return function(value) {
          if (value.indexOf('*') > -1) {
            return _this.ignoreGrammar = true;
          } else {
            return _this.grammars = ['HTML'].concat(value.split(concatPattern));
          }
        };
      })(this));
      atom.config.observe('autoclose-html.makeNeverCloseElementsSelfClosing', (function(_this) {
        return function(value) {
          return _this.makeNeverCloseSelfClosing = value;
        };
      })(this));
      return this._events();
    },
    isInline: function(eleTag) {
      var ele, ret, _ref, _ref1, _ref2;
      try {
        ele = document.createElement(eleTag);
      } catch (_error) {
        return false;
      }
      if (_ref = eleTag.toLowerCase(), __indexOf.call(this.forceBlock, _ref) >= 0) {
        return false;
      } else if (_ref1 = eleTag.toLowerCase(), __indexOf.call(this.forceInline, _ref1) >= 0) {
        return true;
      }
      document.body.appendChild(ele);
      ret = (_ref2 = window.getComputedStyle(ele).getPropertyValue('display')) === 'inline' || _ref2 === 'inline-block' || _ref2 === 'none';
      document.body.removeChild(ele);
      return ret;
    },
    isNeverClosed: function(eleTag) {
      var _ref;
      return _ref = eleTag.toLowerCase(), __indexOf.call(this.neverClose, _ref) >= 0;
    },
    execAutoclose: function(changedEvent, editor) {
      var eleTag, isInline, line, matches, partial;
      if ((changedEvent != null ? changedEvent.newText : void 0) === '>') {
        line = editor.buffer.getLines()[changedEvent.newRange.end.row];
        partial = line.substr(0, changedEvent.newRange.start.column);
        if (partial.substr(partial.length - 1, 1) === '/') {
          return;
        }
        if ((matches = partial.substr(partial.lastIndexOf('<')).match(isOpeningTagLikePattern)) == null) {
          return;
        }
        eleTag = matches[matches.length - 1];
        if (this.isNeverClosed(eleTag)) {
          if (this.makeNeverCloseSelfClosing) {
            setTimeout(function() {
              var tag;
              tag = '/>';
              if (partial.substr(partial.length - 1, 1 !== ' ')) {
                tag = ' ' + tag;
              }
              editor.backspace();
              return editor.insertText(tag);
            });
          }
          return;
        }
        isInline = this.isInline(eleTag);
        return setTimeout(function() {
          if (!isInline) {
            editor.insertNewline();
            editor.insertNewline();
          }
          editor.insertText('</' + eleTag + '>');
          if (isInline) {
            return editor.setCursorBufferPosition(changedEvent.newRange.end);
          } else {
            editor.autoIndentBufferRow(changedEvent.newRange.end.row + 1);
            return editor.setCursorBufferPosition([changedEvent.newRange.end.row + 1, atom.workspace.activePaneItem.getTabText().length * atom.workspace.activePaneItem.indentationForBufferRow(changedEvent.newRange.end.row + 1)]);
          }
        });
      }
    },
    _events: function() {
      return atom.workspace.observeTextEditors((function(_this) {
        return function(textEditor) {
          var bufferEvent;
          bufferEvent = null;
          return textEditor.observeGrammar(function(grammar) {
            var _ref, _ref1;
            if (bufferEvent != null) {
              bufferEvent.dispose();
            }
            if (((_ref = grammar.name) != null ? _ref.length : void 0) > 0 && (_this.ignoreGrammar || (_ref1 = grammar.name, __indexOf.call(_this.grammars, _ref1) >= 0))) {
              return bufferEvent = textEditor.buffer.onDidChange(function(e) {
                return _this.execAutoclose(e, textEditor);
              });
            }
          });
        };
      })(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlGQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQSxhQUFBLEdBQWdCLGNBQWhCLENBQUE7O0FBQUEsRUFDQSxnQkFBQSxHQUFtQixvQ0FEbkIsQ0FBQTs7QUFBQSxFQUVBLHVCQUFBLEdBQTBCLG9DQUYxQixDQUFBOztBQUFBLEVBR0EsdUJBQUEsR0FBMEIsNEJBSDFCLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNJO0FBQUEsSUFBQSxjQUFBLEVBQ0k7QUFBQSxNQUFBLHNCQUFBLEVBQXdCLEtBQXhCO0FBQUEsTUFDQSxVQUFBLEVBQVksb0dBRFo7QUFBQSxNQUVBLGlDQUFBLEVBQW1DLEtBRm5DO0FBQUEsTUFHQSxXQUFBLEVBQWEsK0JBSGI7QUFBQSxNQUlBLFVBQUEsRUFBWSxFQUpaO0FBQUEsTUFLQSxrQkFBQSxFQUFvQixFQUxwQjtLQURKO0FBQUEsSUFRQSxVQUFBLEVBQVcsRUFSWDtBQUFBLElBU0EsV0FBQSxFQUFhLEVBVGI7QUFBQSxJQVVBLFVBQUEsRUFBWSxFQVZaO0FBQUEsSUFXQSxRQUFBLEVBQVUsQ0FBQyxNQUFELENBWFY7QUFBQSxJQVlBLHlCQUFBLEVBQTJCLEtBWjNCO0FBQUEsSUFhQSxhQUFBLEVBQWUsS0FiZjtBQUFBLElBZUEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUVOLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLDhCQUFwQixFQUFvRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxLQUFELEdBQUE7QUFDaEQsVUFBQSxJQUFHLEtBQUEsS0FBUyxJQUFaO0FBQ0ksWUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsbUNBQWhCLEVBQXFELEdBQXJELENBQUEsQ0FBQTtBQUFBLFlBQ0EsS0FBQyxD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
//# sourceURL=/Users/edouardurcadez/.atom/packages/autoclose-html/lib/autoclose-html.coffee