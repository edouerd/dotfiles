(function() {
  var utils;

  utils = {
    fill: function(str, length, filler) {
      if (filler == null) {
        filler = '0';
      }
      while (str.length < length) {
        str = filler + str;
      }
      return str;
    },
    strip: function(str) {
      return str.replace(/\s+/g, '');
    },
    clamp: function(n) {
      return Math.min(1, Math.max(0, n));
    },
    clampInt: function(n, max) {
      if (max == null) {
        max = 100;
      }
      return Math.min(max, Math.max(0, n));
    },
    readFloat: function(value, vars, color) {
      var res;
      if (vars == null) {
        vars = {};
      }
      res = parseFloat(value);
      if (isNaN(res) && (vars[value] != null)) {
        color.usedVariables.push(value);
        res = parseFloat(vars[value].value);
      }
      return res;
    },
    readInt: function(value, vars, color, base) {
      var res;
      if (vars == null) {
        vars = {};
      }
      if (base == null) {
        base = 10;
      }
      res = parseInt(value, base);
      if (isNaN(res) && (vars[value] != null)) {
        color.usedVariables.push(value);
        res = parseInt(vars[value].value, base);
      }
      return res;
    },
    countLines: function(string) {
      return string.split(/\r\n|\r|\n/g).length;
    },
    readIntOrPercent: function(value, vars, color) {
      var res;
      if (vars == null) {
        vars = {};
      }
      if (!/\d+/.test(value) && (vars[value] != null)) {
        color.usedVariables.push(value);
        value = vars[value].value;
      }
      if (value == null) {
        return NaN;
      }
      if (value.indexOf('%') !== -1) {
        res = Math.round(parseFloat(value) * 2.55);
      } else {
        res = parseInt(value);
      }
      return res;
    },
    readFloatOrPercent: function(amount, vars, color) {
      var res;
      if (vars == null) {
        vars = {};
      }
      if (!/\d+/.test(amount) && (vars[amount] != null)) {
        color.usedVariables.push(amount);
        amount = vars[amount].value;
      }
      if (amount == null) {
        return NaN;
      }
      if (amount.indexOf('%') !== -1) {
        res = parseFloat(amount) / 100;
      } else {
        res = parseFloat(amount);
      }
      return res;
    },
    findClosingIndex: function(s, startIndex, openingChar, closingChar) {
      var curStr, index, nests;
      if (startIndex == null) {
        startIndex = 0;
      }
      if (openingChar == null) {
        openingChar = "[";
      }
      if (closingChar == null) {
        closingChar = "]";
      }
      index = startIndex;
      nests = 1;
      while (nests && index < s.length) {
        curStr = s.substr(index++, 1);
        if (curStr === closingChar) {
          nests--;
        } else if (curStr === openingChar) {
          nests++;
        }
      }
      if (nests === 0) {
        return index - 1;
      } else {
        return -1;
      }
    },
    split: function(s, sep) {
      var a, c, i, l, start;
      if (sep == null) {
        sep = ",";
      }
      a = [];
      l = s.length;
      i = 0;
      start = 0;
      whileLoop: //;
      while (i < l) {
        c = s.substr(i, 1);
        switch (c) {
          case "(":
            i = utils.findClosingIndex(s, i + 1, c, ")");
            break;
          case ")":
            break whileLoop;
            break;
          case "[":
            i = utils.findClosingIndex(s, i + 1, c, "]");
            break;
          case "":
            i = utils.findClosingIndex(s, i + 1, c, "");
            break;
          case sep:
            a.push(utils.strip(s.substr(start, i - start)));
            start = i + 1;
        }
        i++;
      }
      a.push(utils.strip(s.substr(start, i - start)));
      return a;
    }
  };

  module.exports = utils;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vkb3VhcmQvU2l0ZXMvZWRvdWFyZC9kb3RmaWxlcy9hdG9tLy5hdG9tL3BhY2thZ2VzL3BpZ21lbnRzL2xpYi91dGlscy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFDQTtBQUFBLE1BQUEsS0FBQTs7QUFBQSxFQUFBLEtBQUEsR0FDRTtBQUFBLElBQUEsSUFBQSxFQUFNLFNBQUMsR0FBRCxFQUFNLE1BQU4sRUFBYyxNQUFkLEdBQUE7O1FBQWMsU0FBTztPQUN6QjtBQUFtQixhQUFNLEdBQUcsQ0FBQyxNQUFKLEdBQWEsTUFBbkIsR0FBQTtBQUFuQixRQUFBLEdBQUEsR0FBTSxNQUFBLEdBQVMsR0FBZixDQUFtQjtNQUFBLENBQW5CO2FBQ0EsSUFGSTtJQUFBLENBQU47QUFBQSxJQUlBLEtBQUEsRUFBTyxTQUFDLEdBQUQsR0FBQTthQUFTLEdBQUcsQ0FBQyxPQUFKLENBQVksTUFBWixFQUFvQixFQUFwQixFQUFUO0lBQUEsQ0FKUDtBQUFBLElBTUEsS0FBQSxFQUFPLFNBQUMsQ0FBRCxHQUFBO2FBQU8sSUFBSSxDQUFDLEdBQUwsQ0FBUyxDQUFULEVBQVksSUFBSSxDQUFDLEdBQUwsQ0FBUyxDQUFULEVBQVksQ0FBWixDQUFaLEVBQVA7SUFBQSxDQU5QO0FBQUEsSUFRQSxRQUFBLEVBQVUsU0FBQyxDQUFELEVBQUksR0FBSixHQUFBOztRQUFJLE1BQUk7T0FBUTthQUFBLElBQUksQ0FBQyxHQUFMLENBQVMsR0FBVCxFQUFjLElBQUksQ0FBQyxHQUFMLENBQVMsQ0FBVCxFQUFZLENBQVosQ0FBZCxFQUFoQjtJQUFBLENBUlY7QUFBQSxJQVVBLFNBQUEsRUFBVyxTQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWlCLEtBQWpCLEdBQUE7QUFDVCxVQUFBLEdBQUE7O1FBRGlCLE9BQUs7T0FDdEI7QUFBQSxNQUFBLEdBQUEsR0FBTSxV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

//# sourceURL=/Users/edouard/Sites/edouard/dotfiles/atom/.atom/packages/pigments/lib/utils.coffee
