import "./FormGroup.scss";
import {
  ServiceGroup,
  ServiceGroupDetail,
  ServiceDetail,
} from "../../../../types";
import InputSection from "../Input/Input";
import { useState } from "react";
import printWithColor from "../../../../utilities/printWithColor";

interface FormGroupProps {
  serviceGroup: ServiceGroup;
  key: string;
  serviceGroupDetail?: ServiceGroupDetail;
}

const FormGroup = ({ serviceGroup, serviceGroupDetail }: FormGroupProps) => {
  const DEFAULT_STATE: ServiceGroupDetail = {
    serviceGroupId: serviceGroup.id,
    total: 0,
  };

  const initialState: ServiceGroupDetail = serviceGroupDetail
    ? serviceGroupDetail
    : DEFAULT_STATE;

  const [serviceGroupDetailValues, setServiceGroupDetailValues] =
    useState<ServiceGroupDetail>(initialState);

  const addServiceDetails = (serviceDetails: ServiceDetail): void => {
    let newDetails;
    setServiceGroupDetailValues({ ...serviceGroupDetailValues });
    printWithColor(`grupo ${serviceGroup.name} actualizado`, "aquamarine");
    console.log(serviceGroupDetailValues);
    printWithColor(`con el servicio`, "aquamarine");
    console.log(serviceDetails);
  };

  return (
    <div className="form-group">
      <h3>{serviceGroup.text}</h3>
      {serviceGroup.services.map(
        (service) =>
          service.active && (
            <InputSection
              service={service}
              key={`inputSection-${service.id}-${service.name}`}
              //Buscamos el detalle del servicio o devolmemos un undefined
              serviceDetail={serviceGroupDetailValues?.serviceDetails?.find(
                (detail) => detail.serviceId === service.id
              )}
              addServiceDetails={addServiceDetails}
            />
          )
      )}
    </div>
  );
};

export default FormGroup;
