import "./FormGroup.scss";
import { ServiceGroup, DetailGroup, Detail } from "../../../../types";
import InputSection from "../Input/Input";
import { useState } from "react";
import printWithColor from "../../../../utilities/printWithColor";

interface FormGroupProps {
  serviceGroup: ServiceGroup;
  key: string;
  detailGroupValues?: DetailGroup;
}

const FormGroup = ({ serviceGroup, detailGroupValues }: FormGroupProps) => {
  const DEFAULT_STATE: DetailGroup = {
    serviceGroupId: serviceGroup.id,
    total: 0,
    details: [],
  };

  const initialState: DetailGroup =
    detailGroupValues !== undefined ? detailGroupValues : DEFAULT_STATE;

  const [detailGroup, setdetailGroup] = useState<DetailGroup>(initialState);

  const updateDetails = (detail: Detail): void => {
    let newDetails: Array<Detail> = [];

    if (detailGroup.details.length !== 0) {
      newDetails = detailGroup.details.filter(
        (detailItem) => detailItem.serviceId !== detail.serviceId
      );
      newDetails.push(detail);
    } else {
      newDetails.push(detail);
    }
    const detailGroupUpdated: DetailGroup = {
      ...detailGroup,
      details: newDetails,
      total: calculateTotal(newDetails),
    };
    setdetailGroup(detailGroupUpdated);
    printWithColor(`grupo ${serviceGroup.name} actualizado`, "aquamarine");
    console.log(detailGroupUpdated);
    // printWithColor(`con el servicio`, "aquamarine");
    // console.log(detail);
  };

  const calculateTotal = (details: Array<Detail>): number => {
    let total = 0;
    details.forEach((detail) => (total += detail.total));
    return total;
  };

  return (
    <div className="form-group">
      <h3>
        {serviceGroup.text} - ${detailGroup.total}
      </h3>
      {serviceGroup.services.map(
        (service) =>
          service.active && (
            <InputSection
              service={service}
              key={`inputSection-${service.id}-${service.name}`}
              //Buscamos el detalle del servicio o devolmemos un undefined
              detailValues={detailGroup.details.find(
                (detail) => detail.serviceId === service.id
              )}
              addDetail={updateDetails}
            />
          )
      )}
    </div>
  );
};

export default FormGroup;
