const { expect, assert } = require('chai');
const { chromium } = require('playwright-chromium');

let browser, page;

describe('E2E tests', function() {
    this.timeout(6000);

    before(async() => {
        // browser = await chromium.launch({ headless: false, slowMo: 500 });
        browser = await chromium.launch();
    })

    after(async() => {
        await browser.close();
    })

    beforeEach(async() => {
        page = await browser.newPage();
    })

    afterEach(async() => {
        await page.close();
    })

    it('loads static page and checks if all topics are present', async() => {
        await page.goto('http://localhost:3000/');

        await page.click('text=Scalable Vector Graphics');
        await page.click('text=Unix');
        await page.click('span:has-text("Open standard")');
        await page.click('text=ALGOL');
    })

    it('loads static page and checks if More button toggles content', async() => {
        await page.goto('http://localhost:3000/');

        await page.click('text=More');
        
        const isVisible = await page.isVisible('text=Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vect');

        expect(isVisible).to.be.true;
    })

    it('loads static page and checks if when More button is clicked the page changes to Less button', async() => {
        await page.goto('http://localhost:3000/');

        await page.click('text=More');

        const isVisible = await page.isVisible('text=Less');

        expect(isVisible).to.be.true;
    })
})