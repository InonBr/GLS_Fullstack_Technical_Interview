// @import

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

    // read css and call it for use
    const css_styles = response.data.css;
    let link = document.createElement('link');
    link.rel = 'linksheet';
    link.type = 'text/css';
    link.href = css_styles;
  },
});
