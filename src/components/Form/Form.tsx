import { useState } from "react";
import "./Form.scss";
import { formattedDate } from "../../utilities/dateFormating";
import { ServiceGroup, DailyDetail } from "../../types";
import FormGroup from "./components/FormGroup/FormGroup";
import printWithColor from "../../utilities/printWithColor";

interface FormProps {
  dateValue: Date; //! Quitar
  serviceGroups: Array<ServiceGroup>;
  closeForm(): void;
  dailyDetailValues?: DailyDetail;
}

const Form = ({
  closeForm,
  dateValue,
  serviceGroups,
  dailyDetailValues,
}: FormProps) => {
  const DEFAULT_STATE: DailyDetail = {
    date: dateValue,
    groupDetails: [],
    total: 0,
  };
  const initialState: DailyDetail =
    dailyDetailValues !== undefined ? dailyDetailValues : DEFAULT_STATE;

  const [dailyDetail, setDailyDetail] = useState(initialState);

  const dateSelected = formattedDate(dailyDetail.date); // ?2 opc, cuando el valor venga de un detalle

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    printWithColor("daily detail saved", "gray");
    console.log(dailyDetail);
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
                  <h3>{`${dateSelected.day} de ${dateSelected.month} del ${dateSelected.year}`}</h3>
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
