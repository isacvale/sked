"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sked = sked;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
    Sked is a minimalistic timeline tool. It expects as argument an object where the key represents the time, in miliseconds, a callback will be run, and as the value the callback itself.
    It return a function that, when run, will create a setInterval() that will run all callbacks on schedule and then clean itself up.
*/
function sked(schedule) {
  // Gets the Greatest Common Divisor between all calls, so we can set the most inexpensive interval possible.
  function gcd(arr) {
    var euclideanAlgorithm = function euclideanAlgorithm(a, b) {
      return !b ? a : euclideanAlgorithm(b, a % b);
    };

    return arr.reduce(function (acc, cur, idx) {
      return !idx ? cur : euclideanAlgorithm(acc, cur);
    }, 1);
  } // Lists all times (in milliseconds) when a callback has been scheduled.


  var callDelays = Object.keys(schedule).map(function (n) {
    return +n;
  }).sort(function (a, b) {
    return a - b;
  }); // Figures out the most efficient interval

  var interval = gcd(callDelays); // Figures out when is the last call, so the setInterval can be cleared.

  var maxDelay = Math.max.apply(Math, _toConsumableArray(callDelays)); // Returns a function that, when executed, will start the timeline

  return function () {
    var currentDelay = 0;
    var loop = setInterval(function () {
      currentDelay += interval; // If there's a callback for the current delay, run it

      if (schedule[String(currentDelay)]) schedule[String(currentDelay)](); // If we've reached the last delay with a callback, clear interval

      if (currentDelay >= maxDelay) clearInterval(loop);
    }, interval);
  };
}