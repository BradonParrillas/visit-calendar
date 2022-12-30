import { useState } from "react";
import "./Form.scss";
import { formattedDate } from "../../utilities/dateFormating";

interface FormProps {
  date: Date;
  closeForm(): void;
}

const Form = ({ closeForm, date }: FormProps) => {
  const [values, setValues] = useState();
  const dateSelected = formattedDate(date);

  return (
    <section className="section-form">
      <div>
        <button id="btn-close-form" onClick={() => closeForm()}>
          x
        </button>
        <form action="" className="Form">
          <h3>{`${dateSelected.day} de ${dateSelected.month} del ${dateSelected.year}`}</h3>
          <div>
            {/* {sections.map((section) => (
              <Section inputs={section.inputs}>{section.name}</Section>
            ))} */}
          </div>
          <button>Guardar</button>
        </form>
      </div>
    </section>
  );
};

export default Form;
