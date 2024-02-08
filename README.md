# Inflation Calculator

A chrome extension that allows users to adjust dollar amounts for inflation.

## Usage

To open the application, either click the button from the browser extension menu, or press `Alt+Shift+C`. Once the applicaton is open, provide:

- A historic price
- The date of the price

And the application will provide the price adjusted for inflation.

![Inflation Calculator Screenshot](https://i.imgur.com/FyS05eU.png)

In the above example, the calculator determined that **$1.00** at the end of World War II (September 1945) is equivalent to **$16.95** in today's dollars.

From here, you are able to copy the adjusted price via the button at the bottom right, or calculate more prices. Simple!

## Installation Guide for Developers

In order to run this application locally, all you need is a Chromium-based browser. Refer to the **Browsers based on Chromium** section of [this page](https://en.wikipedia.org/wiki/Chromium_(web_browser)).

Before you can get started, you will need to clone the repository to your machine. Navigate to your working directory, and run this command:

```bash
git clone https://github.com/tony-montemuro/inflation-calculator.git
```

Once this has finished, run:

```
cd inflation-calculator
```

To access the contents of this applicaton.

### Install Extension in Browser

1. Open your Chromium-based browser.
2. Go to `Extensions` -> `Manage Extensions`. Typically, the `Extensions` button is found at the top-right of the browser window, but may differ from browser-to-browser.
3. Enable the `Developer Mode` slider.
4. Click the `Load unpacked` button. This should open the file manager on your computer.
5. Navigate to the directory where the project is located, and select the `inflation-calculator` folder.
6. Finally, if you repoen the `Extensions` menu, you should see the `Inflation Calculator` extension!

For more information, please visit the [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions).