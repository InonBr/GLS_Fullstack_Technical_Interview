$.ajax({
  url:
    'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867',
  jsonp: 'callback',
  dataType: 'jsonp',
  data: {
    format: 'json',
  },

  // get response from server
  success: function (response) {
    const selector = response.data.structure.steps;

    // read css and call it for use (head)
    // const cssStyle = response.data.css;
    // const style = $(`<style>${cssStyle}</style>`);
    // $('head')[0].appendChild(style[0]);

    $('<style>').text(response.data.css).appendTo(document.head);

    // read tip HTML and call it for use (body)
    const tip = response.data.tiplates['tip'];
    const tipElement = $(
      `<div class="tip-div" id="tip-div-wrapper">${tip}</div>`
    );
    $('body').prepend(tipElement[0]);

    // set all types of buttons
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

    // load html function
    const loadHtml = (currentStep) => {
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
    };

    // function timedStep(currentStep) {
    //   if (currentStep < selector.length - 2) {
    //     t = setTimeout(function () {
    //       currentStep++;
    //       loadHtml(currentStep);
    //       timedStep(currentStep);
    //     }, response.data.structure.steps[currentStep].action['warningTimeout']);
    //   }
    // }

    // function stopCount() {
    //   clearTimeout(t);
    // }

    /* 
        next/back step if user passes Next or Back buttons
    */
    let currentStep = 0;

    // set next button
    $(nextButton).click(function () {
      //   stopCount();
      if (currentStep < selector.length - 2) {
        currentStep++;
        loadHtml(currentStep);
      }
    });

    // set back button
    $(backButton).click(function () {
      //   stopCount();
      if (currentStep > 0) {
        currentStep--;
        loadHtml(currentStep);
      }
    });

    loadHtml(currentStep);
    // timedStep(currentStep);
  },
});
