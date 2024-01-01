const base = require('@playwright/test');

exports.test = base.test.extend({
  country_ger: 'Germany',
  state_ger: 'Baden-Württemberg',
  post_code_ger: '70597',
  place_name_ger: 'Stuttgart Degerloch',
  content_type: 'application/json',
});