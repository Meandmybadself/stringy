var worker;

function updateFilters() {
  var filters = [];
  $('.btn').each(function(i,el) {
    if ($(el).hasClass('active')) {
      filters.push($(el).attr('id'));
    }
  });

  //console.log($('#corpus').val(), filters);

  worker = new Worker('stringy.worker.js');
  worker.addEventListener('message', onWorkerMessage)
  worker.postMessage({'filters':filters, 'value':$('#corpus').val()});
}

function onWorkerMessage(e) {
  $('#results').val(e.data);
}

function onBtnClick(e) {
  var t = $(e.currentTarget),
  id = t.attr('id');

  if (!t.hasClass('active')) {
    t.addClass('active');
    switch(id) {
      case 'encode-uri':
      case 'encode-uri-component':
        $('#decode-uri').removeClass('active');
        $('#decode-uri-component').removeClass('active');
      break;
      case 'decode-uri':
      case 'decode-uri-component':
        $('#encode-uri').removeClass('active');
        $('#encode-uri-component').removeClass('active');
      break;
      case 'lowercase':
        $('#uppercase').removeClass('active');
      break;
      case 'uppercase':
        $('#lower').removeClass('active');
      break;
    }
  } else {
    t.removeClass('active');
  }
  t.blur();
  updateFilters();
}

function onCorpusUpdate(e) {
  updateFilters();
};


$(function() {
  $('.btn').click(onBtnClick);
  $('#corpus').on('keyup', updateFilters);
  $('#corpus').focus();
});