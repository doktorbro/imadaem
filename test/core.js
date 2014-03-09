asyncTest('attribute selector', function() {
  expect(2);

  $(document).ready(function() {
    $('#qunit-fixture').append('<img data-imadaem>');

    equal($('img[data-imadaem]').imadaem().length, 1,
        'Attribute selector is matched');
    equal($('img[data-undefined]').imadaem().length, 0,
        'Attribute selector is not matched');
    start();
  });
});
