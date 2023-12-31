const {test, expect} = require('@playwright/test');
const { BrowserPage } = require('../../pages/browserPage');
const { Dashboard } = require('../../pages/dashboard');
const { AutomationSection } = require('../../pages/automationSection');

let dashboard, browserPage, automation_section;

test.describe("Dashboard tests", ()=> {

    test.beforeEach(async({page}, testInfo)=> {
        browserPage = new BrowserPage(page);
        dashboard = new Dashboard(page);
        automation_section = new AutomationSection(page);
        await browserPage.navigate_to_url(testInfo.config.projects.filter(p => p.name == 'WEB')[0].use.baseURL);
        await dashboard.clickAcceptCookies();
    });

    test.afterEach(async({page})=> {
        await page.close();
    });

    test(`should land on automation page @web`, async ({page}) => {
        await dashboard.navigate_to_automation_page();
        const current_url = await browserPage.get_current_page_url();
        const automationPageText = await dashboard.get_automation_page_text();

        const colors = await dashboard.get_colors();

        expect(current_url).toBe("https://www.sogeti.com/services/automation/");
        expect(automationPageText).toBe("Automation – Drive Business Excellence");
        expect(colors.colorServicesLink).toBe("rgb(255, 48, 76)");
        expect(colors.colorAutomationLink).toBe("rgb(255, 48, 76)");
    });

    test(`should fill contact us form @web`, async ({page}) => {
        await dashboard.navigate_to_automation_page();
        await automation_section.submit_contact_form_with_randon_data();

        const captcha_value = await automation_section.get_captcha_value();
        expect(captcha_value).toBe("Invalid captcha value.");
    });
});