exports.BrowserPage = class BrowserPage{

    constructor(page){
        this.page = page;
    }

    async navigate_to_url(url) {
        await this.page.goto(url);
    }

    async get_current_page_url(){
        return await this.page.url();
    }
}