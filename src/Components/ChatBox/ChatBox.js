import "./ChatBox.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Button } from "../../Components/Button/Button";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import {
  TransactionContext,
  UserContext,
  ToggleChatBotContext,
} from "../../App";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { CircularProgress } from "@mui/material";
const { Configuration, OpenAIApi } = require("openai");

export const ChatBox = () => {
  // TO FETCH ALL TRANSACTIONS, USER INCOME AND EXPENSES
  const { listOfTransactions } = useContext(TransactionContext);
  const { authUser } = useContext(UserContext);
  const { isChatBotOpen, setIsChatBotOpen } = useContext(ToggleChatBotContext);

  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const initialValues = {
    message: "",
  };

  const handleCancel = () => {
    setIsChatBotOpen(false);
    localStorage.removeItem("chatMessages");
    window.location.reload();
  };

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  const resetForm = () => {
    document.getElementById("chatbot-form").reset();
  };

  const saveChatMessagesToStorage = (messages) => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  };

  const loadChatMessagesFromStorage = () => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setChatMessages(JSON.parse(storedMessages));
    }
  };

  useEffect(() => {
    loadChatMessagesFromStorage();
  }, []);

  const onChatRequestHandler = async (values) => {
    const userObject = {
      message: values.message,
    };

    setLoading(true);

    let transactionsString = "";
    listOfTransactions.forEach((transaction) => {
      transactionsString += `${transaction.category} : ${
        transaction.amount
      }INR on ${formatDate(transaction.createdAt)} \n`;
    });

    let customPrompt = `Your Role is to become a financial advisor for a user and suggest me how he can save money and analyze his financial data for him. His total balance is ${authUser.income} INR. These are his transactions this month are : ${transactionsString} , where Credit means money is added to his account.
    Question the user has asked : "${userObject.message}".
    Show him analysis of his expenses.
    If the question is not asking for financial advice or something about money, it's irrelevant, then I want you to reply with "Please ask a relevant question." and nothing else.
    If the question is asking for financial advice or something similar,
   do the following : Analysis of Expenses, Budgeting Tips, Financial Goals and Investment Advice. Also answer his question for him in a nice manner. `;
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: customPrompt,
        max_tokens: 900,
      });
      const response = completion.data.choices[0].text;
      const newMessage = {
        id: Date.now(),
        message: userObject.message,
        response: response,
      };
      setLoading(false);
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      saveChatMessagesToStorage([...chatMessages, newMessage]);
      resetForm();
    } catch (err) {
      console.log(err);
      resetForm();
      setLoading(false);
    }
  };
  chatMessages.forEach((message) => {
    console.log(message.response);
  });

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>MoneyMentor</h3>
        <FontAwesomeIcon icon={faX} id="cancel" onClick={handleCancel} />
      </div>
      <div className="chatbot-body">
        <div className="chatbot-messages">
          {chatMessages.map((message) => {
            return <ChatMessage key={message.id} message={message.response} />;
          })}
        </div>

        <Formik initialValues={initialValues} onSubmit={onChatRequestHandler}>
          {loading ? (
            <>
              <div id="cb-loading">
                <CircularProgress id="cb-loadbar" />
              </div>
            </>
          ) : (
            <>
              <Form className="chatbot-form" id="chatbot-form">
                <Field
                  id="cb-msg-input"
                  name="message"
                  type="text"
                  placeholder="Try asking me something..."
                  autoComplete="off"
                  required={true}
                />

                <Button
                  title="ASK"
                  type="submit"
                  onSubmit={onChatRequestHandler}
                />
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};
