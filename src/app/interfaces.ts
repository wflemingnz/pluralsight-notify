export interface EventReponse {
  event: EmergencyEvent;
  links: LinkStyle;
}

export interface EmergencyEvent {
  id: number;
  created: Date;
  caller: Caller;
  dialed: string;
}

export interface Caller {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: Address;
}

export interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
}
