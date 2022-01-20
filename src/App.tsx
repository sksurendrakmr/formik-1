import React from "react";
import "./App.css";
import YoutubeForm from "./component/YoutubeForm";
import { YoutubeFormManualTrigger } from "./component/YoutubeFormManualTrigger";

function App() {
  return (
    <div className="App">
      {/* <YoutubeForm /> */}
      <YoutubeFormManualTrigger />
    </div>
  );
}

export default App;
