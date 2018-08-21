'use strict';

(function () {
  var MAIN_MARKER = 'Сказочное заморское яство';
  var QUESTION_MARKER = 'Котэ не одобряет?';
  var MAIN_SLOGAN = '<span class="products-item__slogan-text">Чего сидишь? Порадуй котэ, </span><a href="#" class="products-item__slogan-link">купи.</a>';
  var SLOGANS = ['Печень утки разварная с артишоками.', 'Головы щучьи с чесноком да свежайшая сёмгушка.', 'Филе из цыплят с трюфелями в бульоне.'];

  var feedCard = document.querySelectorAll('.feed-card');
  
  function makeElement (tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);
  
    return element;
  };

  function disableCard(element) {
    var disableBlok = makeElement ('div', 'disable-block');
    var foodTaste = element.querySelector('.feed-card__food-taste');
    var itemSlogan = element.parentNode.querySelector('.products-item__slogan');

    element.appendChild(disableBlok);
    itemSlogan.classList.add('products-item__slogan_disabled');
    itemSlogan.innerHTML = 'Печалька, ' + foodTaste.textContent + ' закончился.';
  }

  var addSelectHover = function(e) {
    var marker = e.target.querySelector('.feed-card__marker');

    e.target.classList.add('feed-card_selected_hover');
    marker.classList.add('feed-card__marker_selected_hover');
    marker.innerHTML = QUESTION_MARKER;
  }

  var removeSelectHover = function(e) {
    var marker = e.target.querySelector('.feed-card__marker');

    e.target.classList.remove('feed-card_selected_hover');
    marker.classList.remove('feed-card__marker_selected_hover');
    marker.innerHTML = MAIN_MARKER;
  }

  function triggerSelection(card, i) {
    var cardSlogan = card.parentNode.querySelector('.products-item__slogan');
    var cardMarker = card.querySelector('.feed-card__marker');

    if (card.classList.contains('feed-card_selected')) {
      card.classList.remove('feed-card_selected');
      cardSlogan.innerHTML = MAIN_SLOGAN;
      cardMarker.innerHTML = MAIN_MARKER;
      cardMarker.classList.remove('feed-card__marker_selected_hover');
      card.removeEventListener('mouseenter', addSelectHover);
      card.removeEventListener('mouseleave', removeSelectHover);
    } else {
      card.classList.add('feed-card_selected');
      cardSlogan.innerHTML = SLOGANS[i];
      card.addEventListener('mouseenter', addSelectHover);
      card.addEventListener('mouseleave', removeSelectHover);
      card.classList.remove('feed-card_selected_hover');
    }
  }

  feedCard.forEach(function(item, i) {

    if (item.classList.contains('feed-card_disabled')) {
      disableCard(item);
    } else {
      item.addEventListener('click', function (e) {
        e.preventDefault();

        triggerSelection(item, i); 
      });
    }
  });

})();