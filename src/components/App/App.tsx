import React, { useState } from "react";
import "./App.scss";
import CalendarSection from "../CalendarSection/CalendarSection";
import Form from "../Form/Form";

function App() {
  const [formOpened, setFormOpened] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="App">
      <CalendarSection showForm={() => setFormOpened(true)} />
      {formOpened && (
        <Form closeForm={() => setFormOpened(false)} date={date} />
      )}
    </div>
  );
}

export default App;
