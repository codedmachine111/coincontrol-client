> **Note**
> This project was developed as part of the TechGig's Microsoft Github Co-Pilot Hackathon. 
<p align="center">
  <img src="https://github.com/codedmachine111/coincontrol-client/assets/88738817/97797e49-45a3-42fa-935a-0fce8b691d57" alt="coincontrol-banner" width="400">
</p>

[Live Demo](https://coincontrol-client.vercel.app) | [Server Repository](https://github.com/codedmachine111/coincontrol-server)

# Coin Control

CoinControl is a web application that helps users manage their finances by tracking income and expenses, visualizing their spendings, and providing a daily view of transactions. Users can create accounts, add transactions, and view their financial data conveniently. Users can also get financial advice from an integrated chatbot.


## Features

- Add and keep track of all transactions.
- Visualize Spendings.
- Track income and expenses based on transactions added.
- Get financial advice and analysis from a chatbot (MoneyMentor)


## Github Copilot Integration

- **Accelerated Development:** GitHub Copilot played a pivotal role in expediting our development process by generating code snippets, suggesting solutions, and providing contextual recommendations. It significantly reduced the time spent on repetitive tasks and allowed us to focus on implementing unique features.
- **UI/UX Design:** With the help of GitHub Copilot, we efficiently designed our user interface by automating the generation of UI components responsive design patterns.

- **Routing and Backend Logic:** GitHub Copilot assisted us with the implementation of routing and backend logic.

- **Styling and CSS:** Copilot's intelligent code generation capabilities extended to styling and CSS as well. It provided suggestions for CSS classes and responsive styling.


## Built with
<p align="left">
   <img src="https://www.svgrepo.com/show/452092/react.svg" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img src="https://www.svgrepo.com/show/354118/nodejs.svg" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img src="https://www.svgrepo.com/show/374002/prisma.svg" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img src="https://pbs.twimg.com/profile_images/1504919223168077836/RSsCSpKf_400x400.jpg" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img src="https://www.svgrepo.com/show/349502/sass.svg" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

- [**React**](https://reactjs.org/): JavaScript library for building user interfaces.
- [**Node.js**](https://nodejs.org/): JavaScript runtime environment that allows executing JavaScript code outside of a web browser.
- [**Prisma**](https://www.prisma.io/): Modern, type-safe ORM for Node.js and TypeScript.
- [**Planetscale**](https://planetscale.com/): Highly scalable, globally distributed database.
- [**Sass**](https://sass-lang.com/): CSS extension language that provides more advanced features and capabilities.

## Installation steps

1. - Fork the [repo](https://github.com/codedmachine111/coincontrol-client)
   - Clone the repo to your local machine `git clone https://github.com/codedmachine111/coincontrol-client.git`
   - Change current directory `cd coincontrol-client`
2. Install latest version of [Nodejs](https://nodejs.org/en/) and install all the dependencies using:

```bash
npm install
```

3. Generate prisma client

```bash
npx prisma generate
```

4. For using the chatbot, create a .env file in the root directory of the project and add:

```bash
REACT_APP_OPENAI_API_KEY = "YOUR-API-KEY"
```
> **Note**
> You need to get your OpenAI API key from ![here](https://platform.openai.com/)

5. Start the development server:

```bash
npm start
```

## Contribution

This project was developed as part of the TechGig Microsoft Github Co-Pilot Hackathon. Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please submit a pull request or open an issue on the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).
