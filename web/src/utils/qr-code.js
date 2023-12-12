export const getQRDataFromEntryPass = (entryPass) => {
  return entryPass?._id;
};

export const getEntryPassFromQRData = (data) => {
  return {
    _id: data,
  };
};
