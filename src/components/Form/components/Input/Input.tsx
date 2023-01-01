import "./Input.scss";
import { Service, Detail } from "../../../../types";
import { useState } from "react";
import { dollarFormat } from "../../../../utilities/currencyFormat";

interface InputProps {
  service: Service;
  key: string;
  addDetail(detail: Detail): void;
  detailValues: Detail | undefined;
}

const InputSection = ({ service, detailValues, addDetail }: InputProps) => {
  const DEFAULT_STATE: Detail = {
    serviceId: service.id,
    quantity: "",
    total: 0,
  };
  const initialState =
    detailValues !== undefined ? detailValues : DEFAULT_STATE;

  const [detail, setDetail] = useState<Detail>(initialState);

  const validateInput = (input: string): number => {
    if (input === "" || null || undefined) {
      return 0;
    } else {
      try {
        return parseInt(input);
      } catch (error) {
        return 0;
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const quantity = validateInput(value);
    const total = quantity * service.price;
    const detailUpdated: Detail = {
      ...detail,
      quantity: quantity,
      total: total,
    };
    setDetail(detailUpdated);
    addDetail(detailUpdated);
  };

  return (
    <tr className="input-section">
      <td className="service">
        <label htmlFor={service.name}>{service.text}</label>
      </td>
      <td className="price">
        {service.price === 0 ? "GRATIS" : dollarFormat.format(service.price)}
      </td>
      <td className="quantity">
        <input
          name={service.name}
          type="number"
          min={0}
          max={1000}
          required={true}
          value={detail?.quantity === 0 ? "" : detail.quantity}
          onChange={handleChange}
        />
      </td>
      <td className="total">
        {detail.total === 0 ? "" : dollarFormat.format(detail.total)}
      </td>
    </tr>
  );
};

export default InputSection;
