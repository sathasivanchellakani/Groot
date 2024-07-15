import RandomUser from '../../../src/main/pageobjects/randomuser/randomuser.page'


const waitForPageLoad = async function () {
    await browser.waitUntil(async function () {
        return (await (await randomuser.email()).getAttribute('data-value')) != '...'
    }, {
        timeout: 5000,
        timeoutMsg: 'expected text to be different after 5s'
    })
}
const randomuser: RandomUser = new RandomUser();
describe('Random User Generator', async () => {
    it('without mock should generate random users', async () => {
        await randomuser.open();
        await waitForPageLoad();
        const email = await (await randomuser.email()).getAttribute('data-value');
        const name = await (await randomuser.name()).getAttribute('data-value');
        await browser.refresh();
        await waitForPageLoad();
        const email1 = await (await randomuser.email()).getAttribute('data-value');
        const name1 = await (await randomuser.name()).getAttribute('data-value');
        expect(email).not.toBe(email1);
        expect(name).not.toBe(name1)
    });

    it("with mock should generate static user", async () => {
        const modifiedData = `
        {
    "results": [
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "Jitendra",
                "last": "Jawale"
            },
            "location": {
                "street": {
                    "number": 6137,
                    "name": "Homestead Rd"
                },
                "city": "The Colony",
                "state": "Texas",
                "country": "United States",
                "postcode": 71702,
                "coordinates": {
                    "latitude": "49.4493",
                    "longitude": "-156.9404"
                },
                "timezone": {
                    "offset": "+9:00",
                    "description": "Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
                }
            },
            "email": "jjawale@altimetrik.com",
            "login": {
                "uuid": "28e96eda-3936-4514-96c6-7f2ab13ded81",
                "username": "silvergoose548",
                "password": "henti",
                "salt": "oJmxxhrv",
                "md5": "65ba7ae56aea263cf0fd6be8c25fd9d5",
                "sha1": "a5efdb90884bb193c44c72f87a67292dd2ab06be",
                "sha256": "98dd5fb36fdbcdd08c75dc3523d6f0caf099f0d5044ba59a18f78f5b638f9abe"
            },
            "dob": {
                "date": "2001-05-08T08:27:39.761Z",
                "age": 23
            },
            "registered": {
                "date": "2005-06-25T14:45:51.347Z",
                "age": 19
            },
            "phone": "(702) 888-5072",
            "cell": "(670) 640-3190",
            "id": {
                "name": "SSN",
                "value": "379-05-0489"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/66.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/66.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/66.jpg"
            },
            "nat": "US"
        }
    ],
    "info": {
        "seed": "ae7b4daa208db3ee",
        "results": 1,
        "page": 1,
        "version": "1.4"
    }
}
        `;
        const mock = await browser.mock('**' + '/api/?nat=us&randomapi');
        await mock.respond(modifiedData);
        await browser.refresh();
        await waitForPageLoad();
        const email1 = await (await randomuser.email()).getAttribute('data-value');
        const name1 = await (await randomuser.name()).getAttribute('data-value');
        expect(name1).toBe('Jitendra Jawale');
        expect(email1).toBe('jjawale@altimetrik.com')

    });

    it('should generate random users after restoring the mock', async () => {
        await browser.mockRestoreAll();
        await browser.refresh();
        await waitForPageLoad();
        const email1 = await (await randomuser.email()).getAttribute('data-value');
        const name1 = await (await randomuser.name()).getAttribute('data-value');
        expect(name1).not.toBe('Jitendra Jawale');
        expect(email1).not.toBe('jjawale@altimetrik.com')
    });
});