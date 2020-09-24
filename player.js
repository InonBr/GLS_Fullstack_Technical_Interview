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
    const cssStyle = response.data.css;
    const style = $(`<style>${cssStyle}</style>`);
    $('head')[0].appendChild(style[0]);

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

    // set steps (1/5)
    let stepElement = tipElement.find('.steps-count').children();
    stepElement.html(response.data.structure.steps[0].action.stepOrdinal);
    $('.steps-count span:nth-child(2)').html(selector.length);

    let popoverContent = tipElement.find('.popover-content').children();
    popoverContent.addClass(response.data.structure.steps[0].action.classes);
    popoverContent.html(
      response.data.structure.steps[0].action.contents['#content']
    );
  },
});
