export type WMeta = {
  weather: Weather[];
  main: {temp: number;}
};

export type Weather = {
  description: string;
  icon: string;
};

// export type Forcast = {
//   list:
// }

export type AA = {
  dt: 1778122800;
  main: FMain;
  weather: Weather[];
};

export type FMain = {
  temp: number;
  temp_min: number;
  temp_max: number;
};
