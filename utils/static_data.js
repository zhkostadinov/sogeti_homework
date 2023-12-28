const base = require('@playwright/test');

exports.test = base.test.extend({
  baseApiURL: 'http://api.zippopotam.us',    
  stuttgartApiURL: 'http://api.zippopotam.us/de/bw/stuttgart',
  max_execution_time_in_seconds: 1,
  countryGER: 'Germany',
  countryUS: 'us',
  countryCA: 'ca',
  state_ger: 'Baden-Württemberg',
  post_code_ger: '70597',
  post_code_us_first: '90210',
  post_code_us_second: '12345',
  post_code_ca: 'B2R',
  place_name_ger: 'Stuttgart Degerloch',
  place_name_us_first: 'Beverly Hills',
  place_name_us_second: 'Schenectady',
  place_name_ca: 'Waverley',
  content_type: 'application/json',
});