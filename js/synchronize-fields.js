'use strict';

window.synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, onSynchFields) {
  firstField.addEventListener('change', function () {
    onSynchFields(secondField, secondFieldValues[firstFieldValues.indexOf(firstField.value)]);
  });
};
