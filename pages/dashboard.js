exports.Dashboard = class Dashboard{

    constructor(page){
        this.page = page;
        this.acceptCookies = '//button[@class="acceptCookie"]';
        this.servicesNavLink = '//nav[@id="main-menu"]/ul/li[3]/div[1]/span';
        this.automationLink = '//a[contains(@class, "subMenuLink") and normalize-space(text()) = "Automation"]';
        this.automationPageText = '//h3[text()="Automation – Drive Business Excellence"]'
        this.worldWideDropDown = '//span[@aria-label="Worldwide"]';
        this.countryUrl = '//a[text()="CountryName"]'
    }

    async clickAcceptCookies() {
        await this.page.waitForSelector(this.acceptCookies);
        await this.page.click(this.acceptCookies); 
    }

    async navigate_to_automation_page(){
        await this.page.hover(this.servicesNavLink);
        await this.page.click(this.automationLink);

    }

    async expand_worldwide_dropdown(){
        await this.page.waitForSelector(this.worldWideDropDown, { state: 'attached' });
        await this.page.click(this.worldWideDropDown);

    }

    async click_worldwide_country(country){
        await this.page.waitForSelector(this.countryUrl.replace('CountryName', country), { state: 'attached' });
        await this.page.click(this.countryUrl.replace('CountryName', country));
    } 

    async get_automation_page_text() {
        await await this.page.waitForSelector(this.automationPageText);
        return await this.page.locator(this.automationPageText).textContent();
    }

    async get_colors() {
        const elementServicesLink = await this.page.waitForSelector(this.servicesNavLink);
        const colorServicesLink = await elementServicesLink.evaluate((el) => {
              return window.getComputedStyle(el).getPropertyValue('color');
        });

        await this.page.hover(this.servicesNavLink);

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