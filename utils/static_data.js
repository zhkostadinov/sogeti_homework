const base = require('@playwright/test');

exports.test = base.test.extend({
  stuttgartApiURL: 'http://api.zippopotam.us/de/bw/stuttgart',
  max_execution_time_in_seconds: 1,
  countryGER: 'Germany',
  state_ger: 'Baden-Württemberg',
  post_code_ger: '70597',
  place_name_ger: 'Stuttgart Degerloch',
  content_type: 'application/json',
});