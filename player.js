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
    let selector = document.querySelector(
      response.data.structure.steps[0].action.selector
    );

    // read css and call it for use (head)
    let css_style = response.data.css;
    const style = $(`<style>${css_style}</style>`);
    $('head')[0].appendChild(style[0]);

    // read tip HTML and call it for use (body)
    let tip = response.data.tiplates['tip'];
    const tipElement = $(tip);
    $('body')[0].appendChild(tipElement[0]);

    // select element from tip (to edit)
    const popoverContent = tipElement.find('.popover-content').children();
    popoverContent.addClass(response.data.structure.steps[0].action.classes);
    popoverContent.html(
      response.data.structure.steps[0].action.contents['#content']
    );

    // selector.classList.add(response.data.structure.steps[0].action.classes);
    // selector.style.display = 'block';
    // response.data.structure.steps[0].action.classes.style.display = 'block';
    // response.data.structure.steps[0].action.classes[0].innerHTML =
    //   response.data.structure.steps[0].action.contents;
    // response.data.structure.steps[0].action.classes.innerHTML =
    //   response.data.structure.steps[0].action.contents;
    // selector.classList.add(response.data.structure.steps[0].action.classes);

    // console.log(response.data.structure.steps[0].action.contents['#content']);
    // console.log(newDiv);
  },
});
