import React, { useState } from "react";
import "./App.scss";
import CalendarSection from "../CalendarSection/CalendarSection";
import Form from "../Form/Form";
import { UserConfig, DailyDetail } from "../../types";
import {
  getUserConfig,
  getDailyDetails,
  saveDailyDetails,
} from "../../services/storage";

function App() {
  const [formOpened, setFormOpened] = useState<boolean>(false);
  const [dateSelected, setDateSelectedApp] = useState<Date>(new Date());
  const [userConfig, setUserConfig] = useState<UserConfig>(getUserConfig());
  const [dailyDetails, setDailyDetails] = useState<Array<DailyDetail>>(
    getDailyDetails(dateSelected)
  );

  const getDailyDetail = (date: Date): DailyDetail | undefined => {
    const dailyDetail = dailyDetails.find((daily) => daily.date === date);
    return dailyDetail;
  };

  const updateAllDailyDetails = (newDailyDetail: DailyDetail): void => {
    let newDailyDetails: Array<DailyDetail> = [];
    newDailyDetails = dailyDetails.filter(
      (dailyItem) => dailyItem.date !== newDailyDetail.date
    );
    newDailyDetails.push(newDailyDetail);

    saveDailyDetails(newDailyDetail.date, newDailyDetails);
  };

  return (
    <div className="App">
      <CalendarSection
        showForm={() => setFormOpened(true)}
        setDateSelected={(date: Date) => setDateSelectedApp(date)}
        dailyDetails={dailyDetails}
      />
      {formOpened && (
        <Form
          closeForm={() => setFormOpened(false)}
          dateValue={dateSelected}
          serviceGroups={userConfig.serviceGroups}
          dailyDetailValues={getDailyDetail(dateSelected)}
          updateAllDailyDetails={updateAllDailyDetails}
        />
      )}
    </div>
  );
}

export default App;
