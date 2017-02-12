'use strict';

window.synchronizeFields = (function () {
  return function (firstField, secondField, firstFieldValues, secondFieldValues, propertyToSync) {
    secondField[propertyToSync] = secondFieldValues[firstFieldValues.indexOf(firstField.value)];
  };
})();
