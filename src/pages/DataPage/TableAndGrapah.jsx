import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import TableDataCSV from "../../components/Table/Table";
import PieChartSentiment from "../../components/Graph/PieChartSentiment";
import { fetchEmotion, fetchSentiment } from "../../apis/huggi";
import { useQuery } from "@tanstack/react-query";
import PieChartEmotion from "../../components/Graph/PieChartEmotion";
import { LinearProgress, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const TableAndGrapah = ({ data }) => {
  const [textQuery, setTextQuery] = useState("");
  const sentimentData = useQuery({
    queryKey: ["sentiment", textQuery],
    queryFn: () => fetchSentiment(textQuery),
    enabled: !!textQuery,
  });
  const emotionData = useQuery({
    queryKey: ["emotion", textQuery],
    queryFn: () => fetchEmotion(textQuery),
    enabled: !!textQuery,
  });

  useEffect(() => {
    if (sentimentData?.error?.message)
      toast.warn(
        `Error getting sentiment Data ${sentimentData.error?.message}`,
        {
          position: "top-right",
          autoClose: 5000,
          toastId: new Date().toString(),
        }
      );
  }, [sentimentData?.error]);
  useEffect(() => {
    if (emotionData?.error?.message)
      toast.warn(`Error getting emotion Data ${emotionData.error?.message} `, {
        position: "top-right",
        autoClose: 5000,
        toastId: new Date().toString(),
      });
  }, [emotionData?.error]);

  return (
    <>
      <div className="w-full">
        <div className="mt-10">
          <Typography style={{ fontWeight: "bold", marginBottom: 2 }}>
            Table CSV Load
          </Typography>
          <div className="w-full">
            {sentimentData.isLoading && (
              <div className="flex flex-col w-full">
                <LinearProgress color="primary" />{" "}
                <Typography>Loading Sentiment Data</Typography>{" "}
              </div>
            )}
            {emotionData.isLoading && (
              <div className="flex flex-col w-full mt-4 mb-2">
                <LinearProgress color="secondary" />{" "}
                <Typography>Loading Emotion Data</Typography>
              </div>
            )}
          </div>

          <TableDataCSV data={data} setTextQuery={setTextQuery} />
        </div>
        <div class="flex flex-wrap min-h-50">
          {/* <!-- Card 1 --> */}

          {!sentimentData.isPending && !sentimentData?.error && (
            <div class="w-full sm:w-1/2 p-4  min-h-50">
              {/* <!-- Card content goes here --> */}
              <div class="bg-white rounded-lg shadow-md p-6  min-h-50 w-full">
                {/* <!-- Card content --> */}
                {sentimentData.data?.length > 0 ? (
                  <>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Graph for Sentiment
                    </Typography>
                    <PieChartSentiment data={sentimentData.data} />
                  </>
                ) : (
                  <div className="w-full min-h-[200px]">
                    <div className="bg-gray-200 animate-pulse rounded-lg shadow-md p-6 min-h-[200px]">
                      <div className="h-4 w-1/2 bg-gray-300 rounded">
                        <Typography>Loadind Data</Typography>
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
          {!emotionData.isPending && !emotionData?.error && (
            <div class="w-full sm:w-1/2 p-4  min-h-50">
              {/* <!-- Card content goes here --> */}
              <div class="bg-white rounded-lg shadow-md p-6 min-h-5 w-full">
                {/* <!-- Card content --> */}
                {emotionData.data?.length > 0 ? (
                  <>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Graph for Emotion
                    </Typography>
                    <PieChartEmotion data={emotionData.data} />
                  </>
                ) : (
                  <div className="w-full min-h-[200px]">
                    <div className="bg-gray-200 animate-pulse rounded-lg shadow-md p-6 min-h-[200px]">
                      <div className="h-4 w-1/2 bg-gray-300 rounded">
                        <Typography>Loadind Data</Typography>
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
      </div>
      <ToastContainer limit={2} />
    </>
  );
};

export default TableAndGrapah;
