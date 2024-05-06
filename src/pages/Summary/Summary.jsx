import React, { useEffect, useState } from "react";
import { fetchEmotion, fetchSentiment } from "../../apis/huggi";
import { useQueries } from "@tanstack/react-query";
import PieChartSentiment from "../../components/Graph/PieChartSentiment";
import { Typography } from "@mui/material";
import { averageEmotion, averageScores } from "../../helper/getAnalysResult";
import PieChartEmotion from "../../components/Graph/PieChartEmotion";

const EMOTION = "emotion";
const SENTIMENT = "sentiment";
const MAXDATAFETCH = process.env.REACT_APP_MAX_NUMBER_FETCH;

function Summary({ csvData = [] }) {
  const [chunksEmotion, setChunksEmotion] = useState([]);
  const [chunksSentiment, setChunksSentiment] = useState([]);

  const [paginateSentiment, setPaginateSentiment] = useState(0);
  const [paginateEmotion, setPaginateEmotion] = useState(0);
  const [resultSentiment, setResultSentiment] = useState([]);
  const [resultEmotion, setResultEmotion] = useState([]);

  // Split the csvData into chunks of size
  useEffect(() => {
    if (
      csvData.length > 0 &&
      paginateSentiment < Number(process.env.REACT_APP_MAX_NUMBER_FETCH)
    ) {
      const sliceSentiment = csvData.slice(0, paginateSentiment + 2);
      setChunksSentiment(sliceSentiment);
    }
  }, [paginateSentiment, csvData]);

  // Split the csvData into chunks of size
  useEffect(() => {
    if (
      csvData.length > 0 &&
      paginateEmotion < Number(process.env.REACT_APP_MAX_NUMBER_FETCH)
    ) {
      const sliceEmotion = csvData.slice(0, paginateEmotion + 2);
      setChunksEmotion(sliceEmotion);
    }
  }, [paginateEmotion, csvData]);

  const dataGraphSentiment = useQueries({
    queries: chunksSentiment?.map((csvRow, index) => ({
      queryKey: ["CSV", SENTIMENT, csvRow.text],
      queryFn: () => fetchSentiment(csvRow.text),
    })),
  });

  const dataGraphEmotion =
    useQueries({
      queries: chunksEmotion?.map((csvRow, index) => ({
        queryKey: ["CSV", EMOTION, csvRow.text],
        queryFn: () => fetchEmotion(csvRow.text),
      })),
    }) || [];

  const allSentimentFinished =
    dataGraphSentiment.length > 0 &&
    dataGraphSentiment.every((query) => query.isSuccess);
  const allEmotionFinished =
    dataGraphEmotion.length > 0 &&
    dataGraphEmotion.every((query) => query.isSuccess);

  useEffect(() => {
    if (
      allSentimentFinished &&
      paginateSentiment < Number(MAXDATAFETCH) &&
      dataGraphSentiment.length !== Number(MAXDATAFETCH)
    ) {
      setPaginateSentiment((prev) => prev + 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSentimentFinished, chunksSentiment]);

  useEffect(() => {
    if (
      allEmotionFinished &&
      paginateEmotion < Number(MAXDATAFETCH) &&
      dataGraphEmotion.length !== Number(MAXDATAFETCH)
    ) {
      setPaginateEmotion((prev) => prev + 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allEmotionFinished, chunksEmotion]);

  useEffect(() => {
    if (
      dataGraphSentiment?.length >= Number(MAXDATAFETCH) &&
      resultSentiment?.length === 0 &&
      allSentimentFinished
    ) {
      // Get the array with the structure for the graphic and average
      const resultArraySentiment = averageScores(
        dataGraphSentiment.map((data) => data?.data)
      );
      setResultSentiment(resultArraySentiment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultSentiment, dataGraphSentiment]);

  useEffect(() => {
    if (
      dataGraphEmotion?.length >= Number(MAXDATAFETCH) &&
      resultEmotion?.length === 0 &&
      allEmotionFinished
    ) {
      // Get the array with the structure for the graphic and average
      const resultArrayEmotion = averageEmotion(
        dataGraphEmotion.map((data) => data?.data)
      );
      setResultEmotion(resultArrayEmotion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultEmotion, dataGraphEmotion]);

  const errorEmotion = dataGraphEmotion.some((data) => data.error);
  const errorSentiment = dataGraphSentiment.some((data) => data.error);
  return (
    <>
      <div className="mt-2">
        <Typography sx={{ fontWeight: "bold" }}>Summary</Typography>
      </div>
      <div class="flex flex-wrap min-h-50">
        {/* <!-- Card 1 --> */}

        {!dataGraphSentiment.some((data) => data.isPending) && (
          <div class="w-full sm:w-1/2 p-4  min-h-50">
            {/* <!-- Card content goes here --> */}
            <div class="bg-white rounded-lg shadow-md p-6  min-h-50 w-full">
              {/* <!-- Card content --> */}
              {resultSentiment?.length > 0 ? (
                <>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Graph for Sentiment
                  </Typography>
                  <PieChartSentiment data={resultSentiment} />
                </>
              ) : (
                <div className="w-full min-h-[200px]">
                  <div className="bg-gray-200 animate-pulse rounded-lg shadow-md p-6 min-h-[200px]">
                    <div className="h-4 w-1/2 bg-gray-300 rounded">
                      {errorSentiment ? (
                        <Typography>Error Fetching Data</Typography>
                      ) : (
                        <Typography>Loadind Data</Typography>
                      )}
                    </div>
                    <div className="h-4 w-3/4 mb-4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-3/4 mb-4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* <!-- Card 2 --> */}
        {!dataGraphEmotion.some((data) => data.isPending) && (
          <div className="w-full sm:w-1/2 p-4  min-h-50">
            {/* <!-- Card content goes here --> */}
            <div className="bg-white rounded-lg shadow-md p-6 min-h-5 w-full">
              {/* <!-- Card content --> */}
              {resultEmotion?.length > 0 ? (
                <>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Graph for Emotion
                  </Typography>
                  <PieChartEmotion data={resultEmotion} />
                </>
              ) : (
                <div className="w-full min-h-[200px]">
                  <div className="bg-gray-200 animate-pulse rounded-lg shadow-md p-6 min-h-[200px]">
                    <div className="h-4 w-1/2 bg-gray-300 rounded">
                      {errorEmotion ? (
                        <Typography>Error Fetching Data</Typography>
                      ) : (
                        <Typography>Loadind Data</Typography>
                      )}
                    </div>
                    <div className="h-4 w-3/4 mb-4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-3/4 mb-4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Summary;
