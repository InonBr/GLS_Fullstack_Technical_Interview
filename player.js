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
    let style = $(`<style>${css_style}</style>`);
    $('head')[0].appendChild(style[0]);

    // console.log(link);

    // console.log(response.data.structure.steps[0].action.classes);

    let newDiv = $(
      `<div class="${response.data.structure.steps[0].action.classes}">${response.data.structure.steps[0].action.contents['#content']}</div>`
    );

    $('body')[0].appendChild(newDiv[0]);

    console.log(newDiv[0]);

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
