import React from "react";
import styled from "styled-components";

import ContentViewer from "../components/ContentViewer";

const ModalTemp = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  opacity: 0.8;
`;

const CommentContainerTemp = styled.div`
  text-align: center;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;

  .viewer {
    width: 680px;
    text-align: center;
  }

  .comment {
    flex-basis: 200px;
    flex-grow: 1;
  }
`;

function MealDetail() {
  return (
    <ModalTemp>
      <DetailWrapper>
        <div className="viewer">
          <ContentViewer hasPicture />
        </div>
        <div className="comment">
          <CommentContainerTemp>
            댓글들
          </CommentContainerTemp>
        </div>
      </DetailWrapper>
    </ModalTemp>
  );
}

export default MealDetail;
