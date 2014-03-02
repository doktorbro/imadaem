test('attribute selector', function() {
  expect(1);

  $('#qunit-fixture').append('<img data-imadaem>');
  equal(
      $('img[data-imadaem]').imadaem().length,
      1,
      'Attribute selector is matched');
});
