const puppeteer = require('puppeteer');

async function automateForm() {
    let browser = null;
    try {
        browser = await puppeteer.launch({
            headless: false,  
            defaultViewport: { width: 1280, height: 800 }
        });

        const page = await browser.newPage();

        await page.goto('https://testsite.getjones.com/ExampleForm/', {
            waitUntil: 'networkidle0'
        });

        await page.waitForSelector('input[name="name"]');
        await page.type('input[name="name"]', 'Omer Tzroya');
        await page.type('input[name="email"]', 'Omersr9@gmail.com');
        await page.type('input[name="phone"]', '+972526323226');
        await page.type('input[name="company"]', 'Jones');

        const selectElements = await page.evaluate(() => {
            const selects = document.querySelectorAll('select');
            return Array.from(selects, select => ({
                id: select.id,
                name: select.name,
                className: select.className
            }));
        });

        await page.evaluate(() => {
            const selects = document.querySelectorAll('select');
            selects.forEach(select => {
                if (select.options && select.options.length > 0) {
                    const targetOption = Array.from(select.options).find(opt => 
                        opt.value.includes('51') || opt.value.includes('500')
                    );
                    if (targetOption) {
                        select.value = targetOption.value;
                        select.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }
            });
        });

        await page.screenshot({
            path: 'form-before-submit.png',
            fullPage: true
        });

        const submitButton = await page.evaluate(() => {
            const button = document.querySelector('button[type="submit"]') ||
                          Array.from(document.querySelectorAll('button')).find(b => 
                              b.textContent.toLowerCase().includes('request a call back')
                          );
            if (button) {
                button.click();
                return true;
            }
            return false;
        });

        if (submitButton) {
            await page.waitForNavigation({
                waitUntil: 'networkidle0',
                timeout: 10000
            }).catch(e => console.log('Navigation timeout page might still be loading'));

            console.log('Successfully reached the thank you page!');

        } else {
            console.log('not find submit button');
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Run the automation
automateForm();