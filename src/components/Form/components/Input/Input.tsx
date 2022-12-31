import "./Input.scss";
import { Service, ServiceDetail } from "../../../../types";
import { useState } from "react";

interface InputProps {
  service: Service;
  key: string;
  addServiceDetails(serviceDetails: ServiceDetail): void;
  serviceDetail: ServiceDetail | undefined;
}

const InputSection = ({
  service,
  serviceDetail,
  addServiceDetails,
}: InputProps) => {
  const DEFAULT_STATE: ServiceDetail = {
    serviceId: service.id,
    quantity: "",
    total: 0,
  };
  const initialState =
    serviceDetail !== undefined ? serviceDetail : DEFAULT_STATE;

  const [serviceDetailValues, setServiceDetailValues] =
    useState<ServiceDetail>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const total = value !== "" ? parseInt(value) * service.price : 0;
    setServiceDetailValues({
      ...serviceDetailValues,
      quantity: parseInt(value),
      total: total,
    });
    addServiceDetails(serviceDetailValues);
  };

  return (
    <div className="input-section">
      <label htmlFor="">
        {service.text} - ${serviceDetailValues.total}
      </label>
      <input
        type="number"
        min={0}
        max={1000}
        required={true}
        value={serviceDetailValues?.quantity}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputSection;
