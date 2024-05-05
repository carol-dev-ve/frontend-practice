import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

const TableDataCSV = ({ data, setTextQuery }) => {
  const dataForTable = data.map((res, index) => ({
    id: res.text || index,
    ...res,
  }));
  const headers = [
    {
      id: "text",
      field: "text",
      headerName: "TEXT",
      sortable: false,
      filterable: false,
      flex:1
    },
    { id: "likes", field: "likes", headerName: "LIKES", sortable: false,  filterable: false },
    {
      id: "comment",
      field: "comments",
      headerName: "COMMENT",
      sortable: false,
      filterable: false
    },
    { id: "shares", field: "shares", headerName: "SHARES", sortable: false,  filterable: false },
    {
      id: "reactions_count",
      field: "reactions_count",
      headerName: "REACTIONS COUNT",
      filterable: false
    },
    {
      field: "showGraph",
      headerName: "GRAPH",
      id: "graph",
      disableClickEventBubbling: true,
      sortable: false,
      filterable: false,

      renderCell: (params) => {
        return (
          <IconButton onClick={() => setTextQuery(params.row.text)}>
            <LeaderboardIcon />
          </IconButton>
        );
      },
    },
  ];
  
  return (
    <DataGrid
      rows={dataForTable}
      columns={headers}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      autosizeOptions={{
        columns: ['text'],
        includeOutliers: true,
        includeHeaders: true,
      }}
    />
  );
};

export default TableDataCSV;
