const { expect } = require('@playwright/test');
const { test } = require("../../utils/static_data");
const { getContentType, convertMilisecondsToSeconds } = require("../../utils/helpers");

let response_content_type, response_post_code, response_place_name;

test.describe('API tests', () => {

    test('should response with status code 200 and content type Json for Stuttgart', 
                                                     async ({ request, stuttgartApiURL, content_type }) => {
        const getRequest = await request.get(stuttgartApiURL, {});
    
        response_content_type = await getContentType(getRequest._headers._headersArray);
    
        expect(getRequest).toBeOK();
        expect(response_content_type).toBe(content_type)
    });
    
    test('should response time be below 1s for Stuttgart', 
                                        async ({ request, stuttgartApiURL, max_execution_time_in_seconds }) => {
        const tmsStart = new Date()
        await request.get(stuttgartApiURL, {});
        const tmsEnd = new Date()
        const response_time_seconds = await convertMilisecondsToSeconds(tmsStart, tmsEnd);
    
        expect(response_time_seconds).toBeLessThan(max_execution_time_in_seconds)
    });
    
    test('should return specific contry and state for Stuttgart', 
                                                    async ({ request, stuttgartApiURL, countryGER, state_ger }) => {
        const getRequest = await request.get(stuttgartApiURL, {});
    
        const response = await getRequest.json();
        expect(response.country).toBe(countryGER)
        expect(response.state).toBe(state_ger)
    });
    
    test('should return specific post code and place name for Stuttgart', 
                                            async ({ request, stuttgartApiURL, post_code_ger, place_name_ger }) => {
        const getRequest = await request.get(stuttgartApiURL, {});
    
        const response = await getRequest.json();
    
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