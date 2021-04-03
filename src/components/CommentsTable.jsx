import React from "react";
import styled from "styled-components";
import {
  DataGrid,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
} from "@material-ui/data-grid";

import { testData } from "../assets/testData";

const Container = styled.div`
  background: #fff;
  display: flex;
  flexgrow: 1;
  height: 75vh;
  margin: 5% 2%;
  padding: 1%;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.16);
`;

const columns = [
  { field: "text", headerName: "Comment Text", sortable: false, flex: 1 },
  { field: "likeCount", headerName: "Likes", type: "number", width: 90 },
  { field: "replies", headerName: "Replies", type: "number", width: 100 },
  {
    field: "publishedAt",
    headerName: "Published At",
    type: "dateTime",
    width: 150,
  },
];

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridColumnsToolbarButton />
      <GridFilterToolbarButton />
    </GridToolbarContainer>
  );
};

const CommentsTable = () => {
  return (
    <Container>
      <DataGrid
        disableSelectionOnClick
        getRowId={(row) => row.commentId}
        rows={testData}
        columns={columns}
        pageSize={15}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Container>
  );
};

export default CommentsTable;
