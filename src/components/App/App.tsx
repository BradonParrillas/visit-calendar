import React, { useState } from "react";
import "./App.scss";
import CalendarSection from "../CalendarSection/CalendarSection";
import Form from "../Form/Form";
import { UserConfig, DailyDetail } from "../../types";
import { getUserConfig } from "../../services/storage";

function App() {
  const [formOpened, setFormOpened] = useState<boolean>(false);
  const [dateSelected, setDateSelectedApp] = useState<Date>(new Date());
  const [userConfig, setUserConfig] = useState<UserConfig>(getUserConfig());

  return (
    <div className="App">
      <CalendarSection
        showForm={() => setFormOpened(true)}
        setDateSelected={(date: Date) => setDateSelectedApp(date)}
      />
      {formOpened && (
        <Form
          closeForm={() => setFormOpened(false)}
          dateValue={dateSelected} //! pasar este valor en el dailyDetail
          serviceGroups={userConfig.serviceGroups}
        />
      )}
    </div>
  );
}

export default App;
