import React, { useState } from "react";
import { token, canisterId, createActor} from "../../../declarations/token";
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";

function Faucet() {

  const [isDisabled , setDisabled] = useState("");
  const [buttonText , setText] = useState("Gimme Gimme");

  async function handleClick(event) {
  setDisabled(true);
  
  const authClient = await AuthClient.create();
  const identiy = await authClient.getIdentity();
  const authenticatedCanister = createActor(canisterId, {
    agentOptions: {
      identiy,
    },
  });


  const result = await authenticatedCanister.payOut();
  setText(result);
  // setDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DShan tokens here! Claim 1000 SHAN token to your account.</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={isDisabled}
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
