export type TrainingLocationModel = {
  id: string;
  name: string;
  address: {
    street: string;
    state: string;
    city: string;
    zip: string;
  };
  phone: string;
  note?: string;
};

export type TrainingLocationCreateModel = Omit<TrainingLocationModel, 'id'>;
