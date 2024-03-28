import * as React from "react";
import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useParams,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";

import CreateProblem from "./components/CreateProblem";
import FinishTradeManually from "./components/FinishTradeManually";
import OfframpInfo from "./components/OfframpInfo";
import OperatorShiftHeader from "./components/OperatorShiftHeader";
import PickOperator from "./components/PickOperator";
import LastOfframpsTable from "./components/LastOfframpsTable";
import IssueResolutionControl from "./components/IssueResolutionControl";
import RecipientInfo from "./components/RecipientInfo"
import AddPhoto from "./components/AddPhoto";

function TradeStatusControl({
  offrampId,
  nickname,
  completed,
  manualFinishingEnabled,
}) {
  return (
    <div>
      <h2>P2P Trade Status</h2>
      <AddPhoto offrampId={offrampId} />
      <FinishTradeManually offrampId={offrampId} nickname={nickname} />

      <CreateProblem offrampId={offrampId} nickname={nickname} />
      <IssueResolutionControl offrampId={offrampId} />
    </div>
  );
}

function OfframpDetailsDashboard() {
  let { offrampId, nickname } = useParams();
  const manualFinishingEnabled = true;

  const [completed, setCompleted] = useState(false);

  return (
    <div>
      <OperatorShiftHeader />
      <center>
        <h1>P2P Dashboard</h1>
        <h1>
          this transfer is:{" "}
          {completed == true ? "FINISHED" : "still processing.."}
        </h1>
        <h2>Welcome, {nickname}</h2>
      </center>

      <div style={{ width: "80%", margin: "auto" }}>
        <h2>Transfer Info</h2>
        <OfframpInfo offrampId={offrampId} setCompleted={setCompleted} />
      </div>

      <div style={{ width: "50%", margin: "auto" }}>
        <TradeStatusControl
          offrampId={offrampId}
          nickname={nickname}
          completed={completed}
          manualFinishingEnabled={manualFinishingEnabled}
        />
      </div>
    </div>
  );
}

function OperatorPicker() {
  // Get the userId param from the URL.
  let { offrampId } = useParams();
  const navigate = useNavigate();

  const handleClickNickname = (nickname) => {
    navigate(`/offrampdetailsdashboard/${offrampId}/${nickname}`);
  };
  return (
    <div>
      <OperatorShiftHeader />
      <center>
        <h1>Welcome!</h1>
      </center>

      <div style={{ width: "60%", margin: "auto" }}>
        <PickOperator
          offrampId={offrampId}
          handleClickNickname={handleClickNickname}
        />
      </div>
    </div>
  );
  // ...
}
//UnfinishedRemittances

function MainOfframpsDashboard() {
  // Get the userId param from the URL.
  const navigate = useNavigate();

  const handlePickRow = (offrampId) => {
    navigate(`/operators/${offrampId}`);
  };
  return (
    <div>
      <OperatorShiftHeader />
      <center>
        <h1>Process ASAP:</h1>
      </center>

      <div style={{ width: "60%", margin: "auto" }}>
        <LastOfframpsTable handlePickRow={handlePickRow} />
      </div>
    </div>
  );
  // ...
}

function RecipientLookupDashboard() {
  // Get the userId param from the URL.
  const navigate = useNavigate();

 

  const [address,setAddress] = useState()
  const handleChangeInput = (e) => {
    e.preventDefault()
    setAddress(e.target.value)
  }
  const handleNavigateToRecipient = () => {
    navigate(`/recipients/${address}`);

  }

  return (
    <div>
      

      <div style={{ width: "75%", margin: "auto", marginTop:"25px" }}>
       <input onChange={handleChangeInput} value={address} />

       <button onClick={handleNavigateToRecipient}>
        Search
       </button>
      </div>
    </div>
  );
  // ...
}


function RecipientInfoDashboard() {
  // Get the userId param from the URL.
  let { address } = useParams();

  return (
    <div>
      

      <div style={{ width: "60%", margin: "auto" }}>
        <RecipientInfo address={address} />
      </div>
    </div>
  );
  // ...
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainOfframpsDashboard />} />
          <Route path="/operators/:offrampId" element={<OperatorPicker />} />
          <Route
            path="/offrampdetailsdashboard/:offrampId/:nickname"
            element={<OfframpDetailsDashboard />}
          />
          <Route
            path="/recipients"
            element={<RecipientLookupDashboard />}
          />
           <Route
            path="/recipients/:address"
            element={<RecipientInfoDashboard />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
