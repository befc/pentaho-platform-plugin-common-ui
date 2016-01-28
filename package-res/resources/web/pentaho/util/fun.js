/*!
 * Copyright 2010 - 2015 Pentaho Corporation.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define(function() {
  "use strict";

  var fun = {
    is: function(f) {
      return typeof f === "function";
    },

    to: function(v) {
      return fun.is(v) ? v : fun.constant(v);
    },

    identity: function(v) {
      return v;
    },

    constant: function(v) {
      return function() { return v; };
    },

    compare: function(a, b) {
      return (a === b) ? 0 : ((a > b) ? 1 : -1);
    },

    predicate: function(attrs) {
      var attrValues = [];

      if(attrs) Object.keys(attrs).forEach(function(name) {
        var value = attrs[name];
        if(value !== undefined) attrValues.push([name, value]);
      });


      return attrValues.length ? buildPredicate(attrValues) : null;

    }
  };

  return fun;

  function buildPredicate(attrValues) {
    return function instancePredicate(inst) {
      if(!inst) return false;

      var i = attrValues.length, attrValue;
      while(i--) {
        attrValue = attrValues[i];
        if(inst[attrValue[0]] !== attrValue[1])
          return false;
      }
      return true;
    };
  }
});