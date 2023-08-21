const axios = require("axios");
const readline = require("readline-sync");

//this page waits for inputs and sends the data to the server
const postInfo = async (info) => {
  try {
    const response = await axios.post("http://localhost:3000/info", info);
    if (response.status === 200) {
      console.log("Success: Data sent successfully.");
    } else {
      console.log("Fail: Server responded with an unexpected status code.");
    }
  } catch (error) {
    console.log("Fail: Unable to send data to server.", error.message);
  }
};
//input parameters
const validateInput = (value, min, max) => {
  if (value < min || value > max) {
    console.log(`Value must be between ${min} and ${max}.`);
    return false;
  }
  return true;
};

const askQuestions = () => {
  let altitude;
  do {
    altitude = readline.questionInt("Altitude (0 - 3000): ");
  } while (!validateInput(altitude, 0, 3000));

  let HIS;
  do {
    HIS = readline.questionInt("HIS (0 - 360): ");
  } while (!validateInput(HIS, 0, 360));

  let ADI;
  do {
    ADI = readline.questionInt("ADI (-100 - 100): ");
  } while (!validateInput(ADI, -100, 100));

  const info = { altitude, HIS, ADI };
  postInfo(info).then(askQuestions);
};

askQuestions();
