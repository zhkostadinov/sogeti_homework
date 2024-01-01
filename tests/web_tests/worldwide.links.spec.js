const {test, expect} = require('@playwright/test');
const { BrowserPage } = require('../../pages/browserPage');
const { Dashboard } = require('../../pages/dashboard');


const multiple_destinations = JSON.parse(JSON.stringify(require('../../tests-data/worldwide-links.json')));

let browserPage, dashboard;

test.describe("Worldwide Links tests", ()=> {

    test.beforeEach(async({page, baseURL})=> {
        browserPage = new BrowserPage(page);
        dashboard = new Dashboard(page);
        await browserPage.navigate_to_url(baseURL);
        await dashboard.clickAcceptCookies();
    });

    test.afterEach(async({page, context})=> {
        const pages =  context.pages();
        for (const p of pages) {
            await p.close();
        }
    });

    for(const destination of multiple_destinations){
        test(`should see Worldwide links: ${destination.Country} , ${destination.URL}, ${destination.Title} `, 
                                            async ({page, context}) => {
            await dashboard.expand_worldwide_dropdown();
            await dashboard.click_worldwide_country(destination.Country);

            const newTab = await context.waitForEvent('page');
            await newTab.waitForLoadState();

            expect(destination.URL).toBe(await newTab.url());
            expect(destination.Title).toBe(await newTab.title());
        });
    }
})