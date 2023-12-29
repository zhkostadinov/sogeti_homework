exports.Dashboard = class Dashboard{

    constructor(page){
        this.page = page;
        this.acceptCookies = '//button[@class="acceptCookie"]';
        this.servicesLink = '//*[@id="main-menu"]/ul/li[3]/div[1]/span'
        this.automationLink = '//a[contains(@class, "subMenuLink") and normalize-space(text()) = "Automation"]';
        this.automationPageText = '//h3[text()="Automation – Drive Business Excellence"]'
    }

    async navigate_to_url(url) {
        await this.page.goto(url);
    }

    async clickAcceptCookies() {
        await this.page.click(this.acceptCookies); 
    }

    async navigate_to_automation_page(){
        await this.page.hover(this.servicesLink);
        await this.page.click(this.automationLink);  
    }

    async get_current_page_url(){
        return await this.page.url();
    }

    async get_automation_page_text() {
            return await this.page.locator(this.automationPageText).textContent();
    }

    async get_colors() {
        const elementServicesLink = await this.page.waitForSelector(this.servicesLink);
        const colorServicesLink = await elementServicesLink.evaluate((el) => {
              return window.getComputedStyle(el).getPropertyValue('color');
        });

        await this.page.hover(this.servicesLink);

        const elementAutomationLink = await this.page.waitForSelector(this.automationLink);
        const colorAutomationLink = await elementAutomationLink.evaluate((el) => {
              return window.getComputedStyle(el).getPropertyValue('color');
        });

          return {
            colorServicesLink,
            colorAutomationLink
          }
    }
}