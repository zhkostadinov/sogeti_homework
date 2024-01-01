const {test} = require('@playwright/test');
const { expect } = require('@playwright/test');
const { getContentType, convertMilisecondsToSeconds } = require("../../utils/helpers");

const multiple_destinations = JSON.parse(JSON.stringify(require('../../tests-data/login-data.json')));
let baseApiURL, max_execution_time_in_seconds;



test.beforeAll(async({}, testInfo)=> {
    baseApiURL = testInfo.config.projects.filter(p => p.name == 'API')[0].use.baseURL;
    max_execution_time_in_seconds = testInfo.config.projects.filter(p => p.name == 'API')[0].use.max_execution_time_in_seconds;
});


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
            const tmsStart = new Date();
            await request.get(`${baseApiURL}/${destination.Country}/${destination.Postal_Code}`, {});
            const tmsEnd = new Date();
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