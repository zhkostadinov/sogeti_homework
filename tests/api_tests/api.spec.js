const { expect } = require('@playwright/test');
const { test } = require("../../tests-data/static_data");
const { getContentType, convertMilisecondsToSeconds } = require("../../utils/helpers");

let stuttgartApiURL, max_execution_time_in_seconds;

test.beforeAll(async({}, testInfo)=> {
    stuttgartApiURL = testInfo.config.projects.filter(p => p.name == 'API')[0].use.stuttgartApiURL;
    max_execution_time_in_seconds = testInfo.config.projects.filter(p => p.name == 'API')[0].use.max_execution_time_in_seconds;
});

test.describe('API tests', () => {
    test('should response with status code 200 and content type Json for Stuttgart @api', async ({ request, content_type }) => {
        const getRequest = await request.get(stuttgartApiURL, {});
    
        const response_content_type = await getContentType(getRequest._headers._headersArray);
    
        expect(getRequest).toBeOK();
        expect(response_content_type).toBe(content_type)
    });
    
    test('should response time be below 1s for Stuttgart @api', async ({ request }) => {
        const tmsStart = new Date()
        await request.get(stuttgartApiURL, {});
        const tmsEnd = new Date()
        const response_time_seconds = await convertMilisecondsToSeconds(tmsStart, tmsEnd);
    
        expect(response_time_seconds).toBeLessThan(max_execution_time_in_seconds)
    });
    
    test('should return specific contry and state for Stuttgart @api', 
                                                    async ({ request, country_ger, state_ger }) => {
        const getRequest = await request.get(stuttgartApiURL, {});
    
        const response = await getRequest.json();
        expect(response.country).toBe(country_ger)
        expect(response.state).toBe(state_ger)
    });
    
    test('should return specific post code and place name for Stuttgart @api', 
                                            async ({ request, post_code_ger, place_name_ger }) => {
        const getRequest = await request.get(stuttgartApiURL, {});
    
        const response = await getRequest.json();
        let response_post_code, response_place_name;
    
        for (var el in response.places) {        
            if (response.places[el]['post code'] === post_code_ger && 
                response.places[el]['place name'] === place_name_ger) {
                response_post_code = response.places[el]['post code']
                response_place_name = response.places[el]['place name']
            }
        }
    
        expect(response_post_code).toBe(post_code_ger)
        expect(response_place_name).toBe(place_name_ger)
    });
})