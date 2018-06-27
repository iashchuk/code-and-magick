// Файл similar.js
'use strict';
(function () {
  var COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];

  var EYES_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ];

  var wizardElement = document.querySelector('.setup-wizard');
  var setupWizardCoat = wizardElement.querySelector('.wizard-coat');
  var setupWizardEyes = wizardElement.querySelector('.wizard-eyes');

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var onCoatChangeClick = function () {
    setupWizardCoat.addEventListener('click', function (evt) {
      var newColor = window.utils.getRandomElement(COAT_COLORS);
      evt.target.style.fill = newColor;
      coatColor = newColor;
      updateWizards();
    });
  };


  var onEyesChangeClick = function () {
    setupWizardEyes.addEventListener('click', function (evt) {
      var newColor = window.utils.getRandomElement(EYES_COLORS);
      evt.target.style.fill = newColor;
      eyesColor = newColor;
      updateWizards();
    });
  };

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  /**
   * Функция инициализации страницы
   */
  var initSimilar = function () {
    window.backend.load(successHandler, errorHandler);
    window.popup.init();
    onEyesChangeClick();
    onCoatChangeClick();
  };

  initSimilar();

  window.similar = {
    errorHandler: errorHandler
  };

})();

