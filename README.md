![Project screenshot](./screenshot.png)

# Commonvoice | Community Poll Builder

Commonvoice is a small community poll board. Neighbors can ask a clear question, choose from a few answers, vote, and review the results.

**Live demo:** [a2rp.github.io/community-poll-builder](https://a2rp.github.io/community-poll-builder/)

## What the project does

The page opens with a summary of active questions, responses, and topics. The poll board includes example community questions so the interface has useful content on first visit. Visitors can add their own polls, choose an answer, and see vote totals and percentages.

## Features

- Create a poll with a question, topic, closing date, and two to five answer choices.
- Vote on an open poll and change that vote before the poll closes.
- See the result totals and percentages after casting a vote. Closed polls show their results to everyone using this browser.
- Automatically close polls after their selected closing date.
- Filter polls by open, closed, or all status, and by topic.
- Search question text and topic names.
- Delete a poll after confirming in an accessible dialog. Escape closes the dialog, and keyboard focus stays within it.
- Save polls and votes in browser storage so they remain after refreshing on the same device and browser.
- Use the fixed navigation to reach the poll board and instructions, and the floating button to return to the top after scrolling.
- Use the layout on desktop, tablet, and mobile screen sizes.

## How to use the poll board

Select **Start a poll** or **Ask a question** to open the poll form. Enter a question, choose a topic and closing date, add two to five answer choices, then publish it. To vote, select one answer and choose **Cast your vote**. The results appear after the vote is saved. Select a different answer and choose **Update vote** to change your response while the poll is open.

Use the status buttons, topic selector, and search field to narrow the poll list. Select the trash icon on a poll and confirm the removal in the dialog to delete that poll and its local votes.

## How data is stored

This is a frontend demonstration and does not connect to a server or shared database. Polls and votes are stored in local storage in the current browser. They are only available on that device and browser, and they do not sync with other visitors. The starting poll totals are example data. Clear this site's browser storage to restore the original example polls.

## Run locally

Install the packages and start Vite:

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal. The app uses React, Vite, React Icons, and CSS Modules.

## Code checks

Run ESLint and create the production bundle with:

```bash
npm run lint
npm run build
```

## Deployment

The project is published to GitHub Pages from the `gh-pages` branch. Run:

```bash
npm run deploy
```

The `predeploy` script builds the site first, then the deploy script publishes the `dist` folder. Vite uses the `/community-poll-builder/` base path for the project site.

## What it can be used for

This interface can help present a local polling concept, demonstrate a small voting workflow, or act as a starting point for a community feedback tool. Use the current version for demonstrations or for polls that only need to live in one browser. Shared or official community voting needs a backend and appropriate access controls.

## Possible future upgrades

- Connect a shared database so different visitors can see and submit the same polls.
- Add organizer accounts, poll moderation, and controls for who can vote.
- Add live result updates, poll links, and export options.
- Add image answers, voter limits, or additional question formats.

## Links

- Portfolio: [https://www.ashishranjan.net](https://www.ashishranjan.net)
- GitHub: [https://github.com/a2rp](https://github.com/a2rp)
- CodePen: [https://codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [https://www.linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [https://www.facebook.com/theash.ashish/](https://www.facebook.com/theash.ashish/)
- YouTube: [https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [mailto:ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)
- Source code: [https://github.com/a2rp/community-poll-builder](https://github.com/a2rp/community-poll-builder)

## Support

- Support: [https://a2rp-donation-page.netlify.app/](https://a2rp-donation-page.netlify.app/)
- Buy Me a Coffee: [https://buymeacoffee.com/ashishranjan](https://buymeacoffee.com/ashishranjan)
- Patreon: [https://www.patreon.com/ashishranjan](https://www.patreon.com/ashishranjan)
