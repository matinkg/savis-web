const sendSms = async (phone: string, requestUrl: string) => {
  const res = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone }),
  });

  return res;
};

export default sendSms;
