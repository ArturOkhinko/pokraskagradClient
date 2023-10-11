type AccLogReducerType = {
  accLog: InitStateAccLog;
};
type InitStateAccLog = {
  user: {
    login: boolean;
    email: string;
    role: string;
    accessToken: string;
  };
};
