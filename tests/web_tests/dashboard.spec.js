const { AutomationSection } = require('../../pages/automation_section');
const {test, expect} = require('@playwright/test');
const {Dashboard} = require('../../pages/dashboard');


let dashboard, automation_section;

test.describe("Web tests", ()=> {

    test.beforeEach(async({page})=> {
        dashboard = new Dashboard(page);
        automation_section = new AutomationSection(page);
        await dashboard.navigate_to_url("https://www.sogeti.com/");
        await dashboard.clickAcceptCookies();
    });

    test.afterEach(async({page})=> {
        await page.close();
    });


    test(`should land on automation page `, async ({page}) => {
        await dashboard.navigate_to_automation_page();
        const current_url = await dashboard.get_current_page_url();
        const automationPageText = await dashboard.get_automation_page_text();

        const colors = await dashboard.get_colors();

        expect(current_url).toBe("https://www.sogeti.com/services/automation/");
        expect(automationPageText).toBe("Automation – Drive Business Excellence");
        expect(colors.colorServicesLink).toBe("rgb(255, 48, 76)");
        expect(colors.colorAutomationLink).toBe("rgb(255, 48, 76)");
    });

    test(`should fill contact us form `, async ({page}) => {
        await dashboard.navigate_to_automation_page();
        await automation_section.submit_contact_form_with_randon_data();

        const captcha_value = await automation_section.get_captcha_value();
        expect(captcha_value).toBe("Invalid captcha value.");
    });

});