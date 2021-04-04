import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  DataGrid,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
} from "@material-ui/data-grid";

import { VideoContext } from "../contexts/videoContext";

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
  const { videoId, videoYear } = useContext(VideoContext);
  const [dataSet, setDataSet] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`/find/${videoId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const comments = JSON.parse(data.result)
        setDataSet(comments);
        setLoading(false);
      })
      .catch(console.log);
  }, []);

  return (
    <Container>
      <DataGrid
        disableSelectionOnClick
        getRowId={(row) => row.commentId}
        rows={dataSet}
        {...{loading}}
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
