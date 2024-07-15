import Page from "../page";

export default class RandomUser extends Page {
    public async open(): Promise<any> {
        await super.open('/');
        await browser.url('https://randomuser.me/')
    }

    public async name() {
        return $('[data-label="name"]');
    }

    public async email() {
        return $('[data-label="email"]')
    }

    public async title() {
        return $('#user_title');
    }

    public async value() {
        return $('#user_value')
    }
}