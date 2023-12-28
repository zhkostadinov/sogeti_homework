exports.Dashboard = class Dashboard{

    constructor(page){
        this.page = page;
        this.acceptCookies = '//button[@class="acceptCookie"]';
        this.servicesLink = '//*[@id="main-menu"]/ul/li[3]';
        this.automationLink = '//a[contains(@class, "subMenuLink") and normalize-space(text()) = "Automation"]';
        this.automationPageText = '//h3[text()="Automation – Drive Business Excellence"]'
        // this.userDropdown = '//i[@class="oxd-icon bi-caret-down-fill oxd-userdropdown-icon"]';
        // this.logout = '//a[@href="/web/index.php/auth/logout"]';
    
    }

    async navigate_to_url(url) {
        this.page.goto(url);
    }

    async clickAcceptCookies() {
        await this.page.click(this.acceptCookies); 
    }

    async navigate_to_automation_page(){
        // await this.page.waitForSlector(this.servicesLink,{timeout:6000})
        await this.page.hover(this.servicesLink);
        await this.page.click(this.automationLink);  
    }

    async get_current_page_url(){
        return await this.page.url();
    }

    async get_automation_page_text() {
            return await this.page.locator(this.automationPageText).textContent();
    }

    async get_colours() {
        const element = await this.page.waitForSelector(this.servicesLink);
        const color = await element.evaluate((el) => {
              return window.getComputedStyle(el).getPropertyValue('background-color');
        });


        const serviceEl = await this.page.locator(this.servicesLink);
        const backgroundColorServiceEl = await serviceEl.evaluate((
            (sel) => sel.options[sel.options.selectedIndex].textContent));

        await this.page.hover(this.servicesLink);
        const automationEl = await this.page.locator(this.automationLink);

        const backgroundColorAutomationEl = await automationEl.evaluate(
            (sel) => sel.options[sel.options.selectedIndex].textContent);

          return ""
    }
}