## Detected bots

The library is aiming to detect the following tools primarily:

* PhantomJS ([https://github.com/ariya/phantomjs](https://github.com/ariya/phantomjs))
* Selenium Chrome/Firefox ([https://github.com/SeleniumHQ/selenium](https://github.com/SeleniumHQ/selenium))
* Selenium undetected_chromedriver ([https://github.com/ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver))
* Selenium stealth ([https://github.com/diprajpatra/selenium-stealth](https://github.com/diprajpatra/selenium-stealth))
* Puppeteer Chrome/Firefox ([https://github.com/puppeteer/puppeteer](https://github.com/puppeteer/puppeteer))
* Puppeteer-extra-plugin-stealth ([https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth))
* Playwright Chrome/Firefox/WebKit ([https://github.com/microsoft/playwright](https://github.com/microsoft/playwright))
* SecretAgent/Hero ([https://github.com/ulixee/secret-agent](https://github.com/ulixee/secret-agent))

These are higher level bots, which have a JavaScript engine enabled. To fully
utilize the bot detecting capabilities you should ensure that your site cannot
be used without enabling JavaScript.

## Usage

This library is not published as an npm package.

You can build it using
```bash
npm run build
```

This will output two files, `botdetect.min.js` and `botdetect-clean.min.js`. The
only difference between the two is whether it includes polyfills or not.

Include one of them on your website and then you can utilize the bot detection functionality.

Initialize it on site load:
```javascript
BotDetect.collector.enableTraps();
```

Then later on a user action that requires validation:
```javascript
const results = await BotDetect.collector.collect();
// 'results' will contain a list of suspicious flags related to bots
// You can do whatever you want with it, but a default evaluator is available
// as BotDetect.detector to return 'human'/'bot' based on the flags.

const output = BotDetect.detector.detect(results);
// By default the output is either 'bot' or 'human'
```

## Considerations

It is always better to catch threats as soon as possible so if you can, you should
also enable server-side protections as well.
For example the demo page uses HAProxy with the following features:
* Request rate limiting on a per IP basis
* IP blacklist based on https://github.com/stamparm/ipsum

Additionally, the method described in the `Usage` section of this document is just a quick example.
If you purely rely on JavaScript to block requests from bots to your backend, then it is easy to bypass.
