import React, { useCallback, useEffect, useState } from "react";
import AxiosHuggi from "../adapter/axiosHuggin";
import { Button, Input, TextField, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import LinearProgressWithLabel from "./ui/LinearProgressWithLabel";
import { useQueries } from "@tanstack/react-query";
import CSVReader from "./csv/CSVReader";
import resultsWithMainEmotion from "../helper/getAnalysResult";
import PieChart from "./Graph/PieChartAll";
import TableDataCSV from "./Table/Table";
import TableAndGrapah from "../pages/TableAndGrapah";

const EMOTION = "emotion";
const SENTIMENT = "sentiment";

const urlFetch = {
  EMOTION: "/beto-sentiment-analysis",
  SENTIMENT: "/",
};
function LoadCSV() {
  const [csvData, setCSVData] = useState([]);
  const [csvRawData, setCSVRawData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState(EMOTION);
  const [processingData, setProcessingData] = useState([]);
  const [mappingData, setMappingData] = useState([]);
  const [headers, setHeaders] = useState([])
  const parseArrayToJson = useCallback(() => {
    console.log("entro en funcion");
    console.log(csvRawData);
    const dataParsed = [];
    const headers = csvRawData[0];
    setHeaders(headers)
    for (let i = 1; i < csvRawData.length; i++) {
      const data = csvRawData[i];
      const item = {};
      for (var j = 0; j < headers.length; j++) {
        item[headers[j]] = data[j];
      }
      dataParsed.push(item);
    }
    return dataParsed;
  }, [csvRawData]);

  useEffect(() => {
    console.log("entro");
    if (csvRawData.length) {
      const data = parseArrayToJson();
      setCSVData(data);
    }
  }, [parseArrayToJson, csvRawData]);

  // const fetch = (text) =>
  //   AxiosHuggi.post("", {
  //     text,
  //   });

  // const dataGraph =
  //   useQueries({
  //     queries: csvData?.map((csvRow, index) => ({
  //       queryKey: ["CSV", EMOTION, csvRow.text],
  //       queryFn: async () => {
  //         const rowResult = await fetch(csvRow.text);
  //         setProcessingData((prev) => [
  //           ...prev,
  //           {
  //             ...csvRow,
  //             result: rowResult.data,
  //           },
  //         ]);
  //         return rowResult;
  //       },
  //     })),
  //   }) || [];

  // const allFinished = dataGraph.every((query) => query.isSuccess);

  // useEffect(() => {
  //   const dataMapped = resultsWithMainEmotion(processingData, filter);
  //   setMappingData(dataMapped);
  // }, [allFinished]);

  return (
    <div>
      <div className="w-[100%] pt-4 flex flex-col items-center justify-center">
        <h1 className="font-bold text-[#1f2937]">Load CSV File</h1>
        <div className="pt-2 w-full flex justify-center items-center">
          <CSVReader setCSVRawData={setCSVRawData} />
        </div>
      </div>
      
      {headers.length>0 && csvData && <TableAndGrapah data={csvData} />
}

      {/* <LinearProgressWithLabel value={progress} /> */}
    </div>
  );
}

export default LoadCSV;
