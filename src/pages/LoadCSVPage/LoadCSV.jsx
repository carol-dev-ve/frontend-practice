import React, { useCallback, useEffect, useState } from "react";
import CSVReader from "../../components/csv/CSVReader";
import TableAndGrapah from "../DataPage/TableAndGrapah";
import Summary from "../Summary/Summary";
import { Button } from "@mui/material";

function LoadCSV() {
  const [csvData, setCSVData] = useState([]);
  const [csvRawData, setCSVRawData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [summary, setSummary] = useState(false)
  const parseArrayToJson = useCallback(() => {
    const dataParsed = [];
    const headers = csvRawData[0];
    setHeaders(headers);
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
    if (csvRawData.length) {
      const data = parseArrayToJson();
      setCSVData(data);
    }
  }, [parseArrayToJson, csvRawData]);

  return (
    <div>
      <div className="w-[100%] pt-4 flex flex-col items-center justify-center">
        <h1 className="font-bold text-[#1f2937]">Load CSV File</h1>
        {csvData.length> 0 && <div>
          <Button variant="contained" color="primary" onClick={()=>setSummary(prev=>!prev)}>Show Summary</Button>
        </div>}
        <div className="pt-2 w-full flex justify-center items-center">
          <CSVReader setCSVRawData={setCSVRawData} />
        </div>
      </div>
      {headers.length > 0 && csvData && !summary && <TableAndGrapah data={csvData} />}

      {csvData.length > 0 && summary && <Summary csvData={csvData}/>}
    </div>
  );
}

export default LoadCSV;
