import { useState } from "react";
import "./Form.scss";
import { formattedDate } from "../../utilities/dateFormating";
import { ServiceGroup, DailyDetail } from "../../types";
import FormGroup from "./components/FormGroup/FormGroup";

interface FormProps {
  date: Date;
  serviceGroups: Array<ServiceGroup>;
  closeForm(): void;
  dailyDetail?: DailyDetail;
}

const Form = ({ closeForm, date, serviceGroups }: FormProps) => {
  const [values, setValues] = useState();
  const dateSelected = formattedDate(date); // ?2 opc, cuando el valor venga de un detalle

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
  };

  return (
    <section className="section-form">
      <div>
        <button id="btn-close-form" onClick={() => closeForm()}>
          x
        </button>
        <form action="" className="Form" onSubmit={handleSubmit}>
          <h3>{`${dateSelected.day} de ${dateSelected.month} del ${dateSelected.year}`}</h3>
          <div>
            {serviceGroups.map(
              (group) =>
                group.active && (
                  <FormGroup
                    serviceGroup={group}
                    key={`group-${group.id}-${group.name}`}
                  />
                )
            )}
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </section>
  );
};

export default Form;
