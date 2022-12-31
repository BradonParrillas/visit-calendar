// Asi se manejara un servicio
export interface Service {
  readonly id: number;
  readonly name: string;
  readonly text: string;
  readonly price: number;
  active: boolean; //* false si no se declara
}

// Los servicios se alojan en un grupo
export interface ServiceGroup {
  readonly id: number;
  readonly name: string;
  readonly text: string;
  readonly services: Array<Service>;
  active: boolean;
}

// Un servicio tiene un detalle cuando se utiliza
export interface Detail {
  readonly serviceId: number;
  quantity: number | "";
  total: number;
}

// Los detalles de un servicio se almacenan en un grupo de detalles
export interface DetailGroup {
  readonly serviceGroupId: number;
  details: Array<Detail>;
  total: number;
}

// Un detalle diario guarda los grupos de detalles
export interface DailyDetail {
  groupDetails: Array<DetailGroup>;
  total: number;
  date: Date;
}

// Contiene el formato de configuracion
export interface UserConfig {
  place: string;
  admin: string;
  mail?: string;
  phone?: string;
  serviceGroups: Array<ServiceGroup>;
}

/**
 * *NOTA
 * Entender estas interfaces como formatos para manejar los datos,
 * ya que se utilizan en los demas componentes.
 *
 */
