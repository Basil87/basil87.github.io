'use strict';

(function () {
  var MAIN_MARKER = 'Сказочное заморское яство';
  var QUESTION_MARKER = 'Котэ не одобряет?';
 
  var feedCard = [].slice.call(document.querySelectorAll('.feed-card'));
  var feedCardLink = [].slice.call(document.querySelectorAll('.products-item__slogan-link'));

  var addSelectHover = function (e) {
    var marker = e.target.querySelector('.feed-card__marker');

    e.target.classList.add('feed-card_selected_hover');
    marker.classList.add('feed-card__marker_selected_hover');
    marker.innerHTML = QUESTION_MARKER;
  }

  var removeSelectHover = function (e) {
    var marker = e.target.querySelector('.feed-card__marker');

    e.target.classList.remove('feed-card_selected_hover');
    marker.classList.remove('feed-card__marker_selected_hover');
    marker.innerHTML = MAIN_MARKER;
  }
  
  function makeElement (tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);
  
    return element;
  };

  function disableCard(element) {
    var disableBlok = makeElement('div', 'disable-block');
    var foodTaste = element.querySelector('.feed-card__food-taste');
    var itemSlogan = element.parentNode.querySelector('.products-item__slogan');

    element.appendChild(disableBlok);
    itemSlogan.classList.add('products-item__slogan_disabled');
    itemSlogan.innerHTML = 'Печалька, ' + foodTaste.textContent + ' закончился.';
  }

  function selectFeed(chosenCard) {
    var cardMarker = chosenCard.parentNode.querySelector('.feed-card__marker');
    var cardSloganSelected = chosenCard.parentNode.querySelector('.products-item__slogan_selected');
    var cardSloganUnselected = chosenCard.parentNode.querySelector('.products-item__slogan_unselected');

    chosenCard.classList.remove('feed-card_selected');
    cardSloganSelected.style.display = 'none';
    cardSloganUnselected.style.display = 'block';
    cardMarker.innerHTML = MAIN_MARKER;
    cardMarker.classList.remove('feed-card__marker_selected_hover');
    chosenCard.removeEventListener('mouseenter', addSelectHover);
    chosenCard.removeEventListener('mouseleave', removeSelectHover);
  }

  function unselectFeed(chosenCard) {
    var cardSloganSelected = chosenCard.parentNode.querySelector('.products-item__slogan_selected');
    var cardSloganUnselected = chosenCard.parentNode.querySelector('.products-item__slogan_unselected');

    chosenCard.classList.add('feed-card_selected');
    cardSloganSelected.style.display = 'block';
    cardSloganUnselected.style.display = 'none';
    chosenCard.addEventListener('mouseenter', addSelectHover);
    chosenCard.addEventListener('mouseleave', removeSelectHover);
    chosenCard.classList.remove('feed-card_selected_hover');
  }

  function triggerSelection(card) {

    if (card.classList.contains('feed-card_selected')) {
      selectFeed(card);
    } else {
      unselectFeed(card);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    feedCard.forEach(function (itemCard) {
      if (itemCard.classList.contains('feed-card_disabled')) {
        disableCard(itemCard);
      } else {
        itemCard.addEventListener('click', function (e) {
          e.preventDefault();

          triggerSelection(itemCard); 
        });
      }
    });

    feedCardLink.forEach(function (itemLink) {
      itemLink.addEventListener('click', function (e) {
        var itemLinkCard = itemLink.parentNode.parentNode.querySelector('.feed-card');        
        e.preventDefault();
        triggerSelection(itemLinkCard);
      });
    });
  });

})();
