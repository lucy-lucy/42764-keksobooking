'use strict';

window.synchronizeFields = (function () {
  var synchronize = function (firstField, secondField, firstFieldValues, secondFieldValues, propertyToSync) {
    secondField[propertyToSync] = secondFieldValues[firstFieldValues.indexOf(firstField.value)];
  };

  return function (firstField, secondField, firstFieldValues, secondFieldValues, propertyToSync) {
    synchronize(firstField, secondField, firstFieldValues, secondFieldValues, propertyToSync);
  };
})();
