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

    // set next button
    $(nextButton).click(function () {
      $(this).data('clicked', true);
    });

    // set back button
    $(backButton).click(function () {
      courrentStep--;
    });

    // timer function
    function timer(ms) {
      return new Promise((res) => setTimeout(res, ms));
    }

    /* 
        run the program (for loop)
        next/back step if user passes Next or Back buttons
        or after the countdown of "warningTimeout"
    */

    // response.data.structure.steps[courrentStep].action.warningTimeout
    async function player(courrentStep) {
      await timer(3000);
      console.log('slow!');
    }

    async function main() {
      for (
        let courrentStep = 0;
        courrentStep < selector.length - 1;
        courrentStep++
      ) {
        // set steps (1/4)
        let stepElement = tipElement.find('.steps-count').children();
        if (courrentStep > 2) {
          stepElement.html(4);
        } else {
          stepElement.html(
            response.data.structure.steps[courrentStep].action.stepOrdinal
          );
        }
        $('.steps-count span:nth-child(2)').html(selector.length - 1);

        // set content
        let popoverContent = tipElement.find('.popover-content').children();
        popoverContent.addClass(
          response.data.structure.steps[courrentStep].action.classes
        );
        popoverContent.html(
          response.data.structure.steps[courrentStep].action.contents[
            '#content'
          ]
        );

        await player(courrentStep);
      }
    }

    main();

    // if clicked back or next
    // if ($(nextButton).data('clicked')) {
    //   if (courrentStep + 1 < selector.length - 1) {
    //     ++courrentStep;
    //     runLoop();
    //   }
    // } else if ($(backButton).data('clicked')) {
    //   if (courrentStep - 1 >= 0) {
    //     --courrentStep;
    //     runLoop();
    //   }
    // }
  },
});
