const {test} = require('@playwright/test');
const { expect } = require('@playwright/test');
const { getContentType, convertMilisecondsToSeconds } = require("../../utils/helpers");

const max_execution_time_in_seconds = 1;
const baseApiURL = "http://api.zippopotam.us";
const multiple_destinations = JSON.parse(JSON.stringify(require('../../tests-data/login-data.json')));

test.describe("API data driven tests", ()=> {
    for(const destination of multiple_destinations){
        test(`should response with status code 200 and content type Json: ${destination.Country} , ${destination.Postal_Code}`,
                                                                          async ({ request }) => {
            const getRequest = await request.get(`${baseApiURL}/${destination.Country}/${destination.Postal_Code}`, {});

            const response_content_type = await getContentType(getRequest._headers._headersArray);
                                                                        
            expect(getRequest.status()).toBe(200)
            expect(response_content_type).toBe("application/json")
        });

        test(`should response time be below 1s: ${destination.Country} , ${destination.Postal_Code}`, 
                                                async ({ request }) => {
            const tmsStart = new Date()
            await request.get(`${baseApiURL}/${destination.Country}/${destination.Postal_Code}`, {});
            const tmsEnd = new Date()
            const response_time_seconds = await convertMilisecondsToSeconds(tmsStart, tmsEnd);

            expect(response_time_seconds).toBeLessThan(max_execution_time_in_seconds)
        });

        test(`should return specific postal code and place name: ${destination.Country} , ${destination.Postal_Code}, 
                                                                 ${destination.Place_Name}`, async ({ request }) => {
            const getRequest = await request.get(`${baseApiURL}/${destination.Country}/${destination.Postal_Code}`, {});
            const response = await getRequest.json();
                                                                
            expect(response.places[0]['place name']).toBe(destination.Place_Name)
        });
    }
})