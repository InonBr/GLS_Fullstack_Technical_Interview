$.ajax({
  url:
    'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867',
  jsonp: 'callback',
  dataType: 'jsonp',
  data: {
    format: 'json',
  },

  // get response from the server
  success: function (response) {
    const selector = response.data.structure.steps;
    console.log('Success: JSON loaded successfully!');

    // read css and call it for use (head)
    // const cssStyle = response.data.css;
    // const style = $(`<style>${cssStyle}</style>`);
    // $('head')[0].appendChild(style[0]);

    $('<style rel="stylesheet" type="text/css">')
      .html(response.data.css)
      .appendTo(document.head);

    // read tip HTML and call it for use (body)
    const tip = response.data.tiplates['tip'];
    const tipElement = $(`<div id="tip-div-wrapper">${tip}</div>`);
    $('body').prepend(tipElement[0]);

    // set all buttons
    const backButton = $('#tip-div-wrapper').find('.prev-btn')[1];
    const nextButton = $('#tip-div-wrapper').find('.next-btn')[0];
    const remindMeLaterButton = $('#tip-div-wrapper').find('.prev-btn')[0];
    const exitButton = $('#tip-div-wrapper')
      .find('.popover-title')
      .children()[0];

    // set exit button function
    $(exitButton).click(function () {
      $('#tip-div-wrapper').css('display', 'none');
    });

    let currentStep = 0;

    // load html function
    const loadHtml = () => {
      // set steps (1/4)
      let stepElement = tipElement.find('.steps-count').children();
      if (currentStep > 2) {
        stepElement.html(4);
      } else {
        stepElement.html(
          response.data.structure.steps[currentStep].action.stepOrdinal
        );
      }
      $('.steps-count span:nth-child(2)').html(selector.length - 1);

      // set content
      let popoverContent = tipElement.find('.popover-content').children();
      popoverContent.addClass(
        response.data.structure.steps[currentStep].action.classes
      );
      popoverContent.html(
        response.data.structure.steps[currentStep].action.contents['#content']
      );

      // show and hide next and back buttons
      if (stepElement.html() == 4) {
        $(nextButton).css('display', 'none');
      } else {
        $(nextButton).css('display', 'block');
      }

      if (stepElement.html() == 1) {
        $(backButton).css('display', 'none');
      } else {
        $(backButton).css('display', 'block');
      }

      // hide remind me later button and powered by text
      $(remindMeLaterButton).css('display', 'none');
      $('#tip-div-wrapper').find('.powered-by').css('display', 'none');
    };

    // setTimeout function for passing steps after "warningTimeout" has passed
    const timedStep = () => {
      if (currentStep < selector.length - 2) {
        t = setTimeout(function () {
          currentStep++;
          loadHtml(currentStep);
          timedStep(currentStep);
        }, response.data.structure.steps[currentStep].action['warningTimeout']);
      }
    };

    const stopCountdown = () => {
      clearTimeout(t);
    };

    /* 
        next/back step if user passes Next or Back buttons
        or next step if "warningTimeout" has passed
    */

    // set next button
    $(nextButton).click(function () {
      stopCountdown();
      if (currentStep < selector.length - 2) {
        currentStep++;
        loadHtml(currentStep);
        timedStep();
      }
    });

    // set back button
    $(backButton).click(function () {
      stopCountdown();
      if (currentStep > 0) {
        currentStep--;
        loadHtml(currentStep);
        // timedStep(); //
      }
    });

    loadHtml();
    timedStep();
  },
  error: function (error) {
    console.log('Error: JSON did not load successfully');
    console.error(error);
  },
});
