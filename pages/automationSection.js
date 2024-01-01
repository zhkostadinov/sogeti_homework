import { faker } from '@faker-js/faker/locale/en';

exports.AutomationSection = class AutomationSection {

    constructor(page){
        this.page = page;
        this.firstNameInput = '//input[@id="4ff2ed4d-4861-4914-86eb-87dfa65876d8"]';
        this.lastNameInput = '//input[@id="11ce8b49-5298-491a-aebe-d0900d6f49a7"]'
        this.emailInput = '//input[@id="056d8435-4d06-44f3-896a-d7b0bf4d37b2"]';
        this.companyInput = '//*[@id="703dedb1-a413-4e71-9785-586d609def60"]';
        this.countryDropDown = '//select[@id="e74d82fb-949d-40e5-8fd2-4a876319c45a"]';
        this.messageTextarea = '//textarea[@id="88459d00-b812-459a-99e4-5dc6eff2aa19"]';
        this.agreeCheckBox = '//*[@id="863a18ee-d748-4591-bb64-ef6eae65910e"]/fieldset/span/label';
        this.submitFormButton = '//button[@id="b35711ee-b569-48b4-8ec4-6476dbf61ef8"]';
        this.captchaValue = '//span[@role="alert"]'
    }

    async submit_contact_form_with_randon_data() {
        await this.page.hover(this.firstNameInput);
        await this.page.locator(this.firstNameInput).fill(faker.person.firstName());
        await this.page.locator(this.lastNameInput).fill(faker.person.lastName());
        await this.page.locator(this.emailInput).fill(faker.internet.email());
        await this.page.locator(this.companyInput).fill(faker.company.buzzPhrase());
        await this.page.locator(this.countryDropDown).selectOption('other');
        await this.page.locator(this.messageTextarea).fill(faker.lorem.text());
        await this.page.click(this.agreeCheckBox);
        await this.page.waitForSelector(this.submitFormButton, { state: 'attached' });
        await this.page.dblclick(this.submitFormButton);
    }

    async get_captcha_value() {
        await this.page.waitForSelector(this.captchaValue, { state: 'attached' });
        return await this.page.locator(this.captchaValue).textContent();
    }
}