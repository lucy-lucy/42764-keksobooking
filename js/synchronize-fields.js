'use strict';

window.synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, callback) {
  firstField.addEventListener('change', function () {
    callback(secondField, secondFieldValues[firstFieldValues.indexOf(firstField.value)]);
  });
};
