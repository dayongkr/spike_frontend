import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Button from "../../components/common/Button";

import StateContext from "../../context/StateContext";
import DispatchContext from "../../context/DispatchContext";
import web3 from "../../utils/web3";

const regex = {
  upper: /[A-Z]/,
  lower: /[a-z]/,
  number: /\d/,
  special: /[@$!%*#?]/,
  count: /[A-Za-z\d@$!%*?&]{8,}/,
};

const regContent = {
  upper: "Uppercase Letters",
  lower: "Lowercase Letters",
  number: "Numbers",
  special: "Special Character",
  count: "More than 8 length",
};

const keys = Object.keys(regex);

function IntroPassword() {
  const [pwdStrength, setPwdStrength] = useState({
    upper: 0,
    lower: 0,
    number: 0,
    special: 0,
    count: 0,
  });

  const [strengthStatus, setStrengthStatus] = useState(0);

  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const history = useHistory();

  const onChange = (event) => {
    let tempPwdStrength = { ...pwdStrength };
    let correctCount = 0;
    for (let key of keys) {
      if (regex[key].test(event.target.value)) {
        tempPwdStrength[key] = 1;
        correctCount++;
      } else {
        tempPwdStrength[key] = 0;
      }
    }
    if (correctCount < 3) {
      setStrengthStatus(0);
    } else if (correctCount < 5) {
      setStrengthStatus(1);
    } else {
      setStrengthStatus(2);
    }

    setPwdStrength({ ...tempPwdStrength });
    dispatch({ type: "SET_INTRO_PASSWORD", password: event.target.value });
  };

  const onClick = async (e) => {
    try {
      if (strengthStatus === 2) {
        dispatch({ type: "SET_LOADING" });
        const account = web3.eth.accounts.create();
        const keystore = web3.eth.accounts.encrypt(
          account.privateKey,
          state.intro.password
        );
        await axios.post("/users", {
          username: state.intro.username,
          password: state.intro.password,
          address: account.address,
          email: state.intro.email,
          keystore: JSON.stringify(keystore),
        });
        dispatch({ type: "RESET_LOADING" });
        history.push("/");
      }
    } catch (error) {
      dispatch({ type: "RESET_LOADING" });
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <h1>
          Create <span className="main">Password</span>
        </h1>
        <p className="sub">for your wallet</p>
        <div className="sub-wrapper">
          <input
            type="password"
            id="password"
            className="sub rounded"
            onChange={onChange}
            placeholder="password"
          />
        </div>
        <div className="pwd-strength-wrapper">
          <div
            className={
              strengthStatus === 0
                ? "pwd-strength-bar"
                : strengthStatus === 1
                ? "pwd-strength-bar medium"
                : "pwd-strength-bar strong"
            }
          >
            {strengthStatus === 0
              ? "Weak 👎"
              : strengthStatus === 1
              ? "Medium ✋"
              : "Strong 🤝"}
          </div>
          <ul className="pwd-strength-details">
            {keys.map((item) => (
              <li className={pwdStrength[item] && "active"} key={item}>
                {regContent[item]}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sub-wrapper">
        <Button
          className={["disabled"]}
          type={strengthStatus < 2 && "sub"}
          onClick={onClick}
          rounded="true"
        >
          Finish
        </Button>
      </div>
    </>
  );
}

export default IntroPassword;