// ==UserScript==
// @name         Amazon Kindle Edition eBook free order autoconfirm
// @description  Customer's tool; Autoconfirm Amazon Kindle eBook (free) order
// @icon         https://www.amazon.co.uk/favicon.ico
// @namespace    https://github.com/nataliastanko/
// @contactURL   https://nataliastanko.com
// @author       nataliastanko
// @version      0.2
// @license      MIT
// @copyright    2018, nataliastanko (https://github.com/nataliastanko/)
// @match        https://*amazon.*/*/dp/*
// @include      https://*amazon.*/*/dp/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/nataliastanko/AmazonCustomersTools/master/kindle_order_autoconfirm.user.js
// @downloadURL  https://raw.githubusercontent.com/nataliastanko/AmazonCustomersTools/master/kindle_order_autoconfirm.user.js
// @homepage     https://github.com/nataliastanko/AmazonCustomersTools/
// @supportURL   https://github.com/nataliastanko/AmazonCustomersTools/issues
// ==/UserScript==

(function () {
  'use strict';

  const amazonSubNav = document.getElementById('nav-subnav');

  if (!document.body.contains(amazonSubNav)) {
    throw new Error("It is not a Kindle Store! App stoped arbitrarily.");
  }

  Array.from(amazonSubNav.children).forEach(
    function(currentNavItem, index, arr) {
      if (currentNavItem.getAttribute('class') == 'nav-a nav-b') {
        if (currentNavItem.firstChild.innerText == 'Kindle Store') {
          if (document.getElementById('rightCol')) {
            if (document.getElementById('CombinedBuybox')) {
              const amazonBuybox = document.getElementById('buybox');
              if (amazonBuybox) {
                if (amazonBuybox.querySelector('.kindle-price')) {

                  let price = document.querySelector('.a-color-price:not(.ebooks-price-savings)');
                  price = price.childNodes[0].textContent.trim();

                  if (!(price == '£0.00')) {
                    throw new Error("Nothing to buy for free.");
                  }

                  document.getElementById('buyOneClick').submit();
                }
              }
            }
          }
        }
      }
    }
  );
})();
