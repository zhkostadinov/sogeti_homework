const {test, expect} = require('@playwright/test');
const {Dashboard} = require('../../pages/dashboard');


let dashboard;

test.describe("Web tests", ()=> {

    
    test.beforeEach(async({page})=> {
        dashboard = new Dashboard(page);
        await dashboard.navigate_to_url("https://www.sogeti.com/");
        await dashboard.clickAcceptCookies();
    });

test(`should land on automation page `, async ({page}) => {
        // const x = Math.floor((Math.random() * 1000) + 1)
        // const employee = {FirstName:`fN1a1me${x} `, MiddleName:"mN1a1me", LastName:"lN1am1e", EmployeeId:`e1eId${x}`, Username:`us1na${x}`, Password:"Password12", ConfirmPassword:"Password12"}
        // const login = new LoginPage(page);
        // const dashboard = new Dashboard(page);
        // const pim = new Pim(page);
        // await dashboard.link_Pim();
        // await pim.addEmployeeButton();
        // await pim.addEmployeeDetails(employee.FirstName, employee.MiddleName, employee.LastName, employee.EmployeeId, employee.Username, employee.Password, employee.ConfirmPassword);
        // await page.waitForTimeout(5000);
        // await dashboard.navigate_to_url("https://www.sogeti.com/");
        await dashboard.navigate_to_automation_page();
        const current_url = await dashboard.get_current_page_url();
        const automationPageText = await dashboard.get_automation_page_text();

        const {backgroundColorServiceEl, backgroundColorAutomationEl} = await dashboard.get_colours();

        expect(current_url).toBe("https://www.sogeti.com/services/automation/");
        expect(automationPageText).toBe("Automation – Drive Business Excellence");
    });
});