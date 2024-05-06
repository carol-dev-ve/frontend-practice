import React, { useCallback, useEffect, useState } from "react";
import CSVReader from "../../components/csv/CSVReader";
import TableAndGrapah from "../DataPage/TableAndGrapah";
import Summary from "../Summary/Summary";

function LoadCSV() {
  const [csvData, setCSVData] = useState([]);
  const [csvRawData, setCSVRawData] = useState([]);
  const [headers, setHeaders] = useState([]);

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
        <div className="pt-2 w-full flex justify-center items-center">
          <CSVReader setCSVRawData={setCSVRawData} />
        </div>
      </div>
      {headers.length > 0 && csvData && <TableAndGrapah data={csvData} />}

      {/* {csvData.length > 0 && <Summary csvData={csvData}/>} */}
    </div>
  );
}

export default LoadCSV;
