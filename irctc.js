// ==UserScript==
// @name         IRCTC Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Browesr Hacks for IRCTC, especially tatkal booking!
// @author       hemachandsai
// @match        https://www.irctc.co.in/*
// @match        https://securegw.paytm.in/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const upiID = "7013842401@paytm";

  function $(selector) {
    return document.querySelector(selector);
  }

  function delay(ms) {
    setTimeout(() => Promise.resolve("resolved"), ms);
  }

  async function paytmUPIFastify() {
    const elementsToCheck = [
      "#ptm-upi div",
      ".popup-global .upi-select+div input",
      "#ptm-upi a:nth-child(2)",
      "#ptm-upi button:not([disabled])",
    ];
    elementsToCheck.forEach((selector) => {
      const timerID = setInterval(() => {
        const elementRef = $(selector);
        if (selector.match(/input/)) {
          elementRef.value = upiID;
        } else if (elementRef) {
          elementRef.click();
          clearInterval(timerID);
        }
      }, 300);
    });
  }

  function main() {
    if (window.location.href.match(/www\.irctc\.co\.in/)) {
      // remove unnecessary ads/bot prompts bloating the webpage
      const elementsToDelete = ["#askDishaSdk+div", "#cube"];

      const alwaysCheck = [
        ".pnr-detail.test-center button",
        "table tr:nth-child(2) p-radiobutton .ui-radiobutton-box",
        "p-confirmdialog button",
        "label[for='travelInsuranceOptedNo-0'] p-radiobutton div[role='radio']",
        ".bank-text",
        "#pay-type div:nth-child(2)",
        "#psgn-form .btn",
        "select[formcontrolname='passengerBerthChoice']",
      ];

      window.addEventListener("load", () => {
        elementsToDelete.forEach((selector) => {
          const elementRef = $(selector);
          if (elementRef) {
            elementRef.parentNode.removeChild(elementRef);
          }
        });
      });

      alwaysCheck.forEach((selector) => {
        const timerID = setInterval(() => {
          const elementRef = $(selector);
          if (selector.match(/passengerBerthChoice/)) {
            // select side upper
            elementRef.value = elementRef.querySelector(
              "option:nth-child(6)"
            ).value;
          } else if (elementRef) {
            elementRef.click();
            clearInterval(timerID);
          }
        }, 300);
      });
    }

    if (
      window.location.href.match(
        /securegw\.paytm\.in\/theia\/processTransaction/
      )
    ) {
      paytmUPIFastify();
    }
  }

  main();
})();
