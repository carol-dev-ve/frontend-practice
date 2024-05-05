import AxiosHuggi from "../adapter/axiosHuggin";

export const fetchEmotion = async (text) => {
  try {
    const { data } = await AxiosHuggi.post("/beto-emotion-analysis", {
      text,
    });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchSentiment = async (text) => {
  try {
    const { data } = await AxiosHuggi.post("/beto-sentiment-analysis", {
      text,
    });

    return data;
  } catch (error) {
    console.log(error)
    throw new Error(error.error);
  }
};
