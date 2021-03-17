interface IResponse {
  message?: string;
  success: boolean;
  data?: any | null;
}

export const response = ({
  message: incomingMessage,
  success,
  data,
}: IResponse): IResponse => {
  const message = incomingMessage || "Operation successfull";

  return {
    message,
    success,
    data: success === true ? data : null,
  };
};
