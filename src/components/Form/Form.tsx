import { useState } from "react";
import "./Form.scss";
import { formattedDate } from "../../utilities/dateFormating";
import { ServiceGroup, DailyDetail, DetailGroup } from "../../types";
import FormGroup from "./components/FormGroup/FormGroup";
import printWithColor from "../../utilities/printWithColor";

interface FormProps {
  dateValue: Date;
  serviceGroups: Array<ServiceGroup>;
  closeForm(): void;
  dailyDetailValues: DailyDetail | undefined;
  updateAllDailyDetails(dailyDetail: DailyDetail): void;
}

const Form = ({
  closeForm,
  dateValue,
  serviceGroups,
  dailyDetailValues,
  updateAllDailyDetails,
}: FormProps) => {
  const DEFAULT_STATE: DailyDetail = {
    date: dateValue,
    groupDetails: [],
    total: 0,
  };
  const initialState: DailyDetail =
    dailyDetailValues !== undefined ? dailyDetailValues : DEFAULT_STATE;

  const [dailyDetail, setDailyDetail] = useState(initialState);

  const calculateTotal = (detailGroups: Array<DetailGroup>): number => {
    let total = 0;
    detailGroups.forEach((group) => (total += group.total));
    return total;
  };

  const updateDailyDetail = (detailGroup: DetailGroup): void => {
    let newDetailGroups: Array<DetailGroup> = [];

    if (dailyDetail.groupDetails.length !== 0) {
      newDetailGroups = dailyDetail.groupDetails.filter(
        (detailItem) => detailItem.serviceGroupId !== detailGroup.serviceGroupId
      );
      newDetailGroups.push(detailGroup);
    } else {
      newDetailGroups.push(detailGroup);
    }

    const dailyDetailUpdated: DailyDetail = {
      ...dailyDetail,
      groupDetails: newDetailGroups,
      total: calculateTotal(newDetailGroups),
    };
    setDailyDetail(dailyDetailUpdated);
    printWithColor(`daily detail actualizado`, "pink");
    //console.log(dailyDetailUpdated);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    updateAllDailyDetails(dailyDetail);
    printWithColor("daily detail saved", "gray");
    console.log(dailyDetail);
    closeForm();
  };

  return (
    <section className="section-form">
      <div className="form-container">
        <button id="btn-close-form" onClick={() => closeForm()}>
          x
        </button>
        <form action="" className="form" onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>
                  <h3>{`${formattedDate(dailyDetail.date).day} de ${
                    formattedDate(dailyDetail.date).month
                  } del ${formattedDate(dailyDetail.date).year}`}</h3>
                </th>
              </tr>
            </thead>
            <div className="scroll">
              <tbody>
                {serviceGroups.map(
                  (group) =>
                    group.active && (
                      <FormGroup
                        serviceGroup={group}
                        key={`group-${group.id}-${group.name}`}
                        detailGroupValues={dailyDetail.groupDetails.find(
                          (detailGroup) =>
                            detailGroup.serviceGroupId === group.id
                        )}
                        updateDailyDetail={updateDailyDetail}
                      />
                    )
                )}
              </tbody>
            </div>
          </table>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </section>
  );
};

export default Form;
