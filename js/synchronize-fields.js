'use strict';

window.synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, propertyToSync) {
  secondField[propertyToSync] = secondFieldValues[firstFieldValues.indexOf(firstField.value)];
};
