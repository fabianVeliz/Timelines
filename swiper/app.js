// Make a collection of months according to the range
var startDate = moment().subtract(12, 'months').set('date', 1);
var endDate = moment().add(12, 'months').set('date', 1);

var dates = [];

var month = moment(startDate);

while( month < endDate  ) {
  dates.push(month.format('MM-DD-YYYY'));
  month.add(1, "month");
}

// Function to insert slide into DOM
var currentYear = 0;

function insertSlide(value, label, year, isSelected) {
  // @TODO: The isSelected functionality is pending.

  var templateArray = [
    '<div class="swiper-slide" data-year="'+ year +'">',
      '<div class="item">',
        '<div class="year">'+ year +'</div>',
        '<div class="ck-button-wrapper">',
          '<div class="ck-button">',
            '<label>',
              '<input type="checkbox" value="'+ value +'"><span></span>',
            '</label>',
          '</div>',
        '</div>',
        '<div class="line"></div>',
        '<div class="label">'+ label +'</div>',
      '</div>',
    '</div>'
  ];

  var template = $.parseHTML(templateArray.join(''));

  if ($(template).data('year') != currentYear) {
    $(template).attr('data-show', true);
    currentYear = $(template).data('year');
  }

  $('.swiper-wrapper').append($(template));
}

// Inset slider into DOM
$('.swiper-wrapper').html('');

for(var i=0; i < dates.length; i++) {
  insertSlide(dates[i], moment(dates[i]).format('MMM'), moment(dates[i]).format('YYYY'), true);
}

// Init Swiper
var swiper = new Swiper('.swiper-container', {
  initialSlide: $($('.swiper-slide[data-year='+ moment().format('YYYY') +']')[0]).index(),
  slidesPerView: 12,
  spaceBetween: 0,
  runCallbacksOnInit: true
});

// Binds
$('.swiper-button-prev').on('click', function(){
  // @TODO: Check first index
  swiper.slideTo(swiper.realIndex - 4);
});

$('.swiper-button-next').on('click', function(){
  // @TODO: Check last index
  swiper.slideTo(swiper.realIndex + 4);
});

$('.swiper-wrapper input[type="checkbox"]').change(function(){
  console.log('---ON CHANGE---');

  var checkedItems = $('input[type="checkbox"]:checked').map(function(index, el){
    return $(el).val();
  });

  return console.log(checkedItems);
});
