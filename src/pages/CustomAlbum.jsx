import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import ContentForm from "../components/ContentForm";
import ContentSpectator from "../components/ContentSpectator";
import { getAlbums, postAlbum } from "../api/customAlbum";

const LENGTH = 7;

const Container = styled.div`
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: center;

  .list {
    flex-grow: 1;
    justify-items: center;
    max-width: 680px;
  }
`;

function CustomAlbum() {
  const { category } = useParams();
  const [albums, setAlbums] = useState({
    prevBuffer: [],
    current: [],
    nextBuffer: [],
    prevPage: null,
    nextPage: 1,
  });

  const handleSubmitForm = async function ({
    date, heartCount, url, text,
  }) {
    await postAlbum(category, {
      date, url, heartCount, text,
    });
  };

  useEffect(async () => {
    if (albums.prevBuffer.length > LENGTH || !albums.prevPage) {
      return;
    }

    if (albums.current.length < LENGTH && albums.prevBuffer.length) {
      setAlbums((prevState) => {
        const count = LENGTH - prevState.current.length;
        const added = prevState.prevBuffer.slice(-count);
        const newPrevBuffer = prevState.prevBuffer.slice(0, -count);

        return {
          ...prevState,
          prevBuffer: newPrevBuffer,
          current: [...added, ...prevState.current],
        };
      });

      return;
    }

    const result = await getAlbums(category, albums.prevPage);

    if (!result) {
      return;
    }

    setAlbums((prevState) => {
      return {
        ...prevState,
        prevBuffer: [...result.data, ...prevState.prevBuffer],
        nextPage: result.prevPage,
      };
    });
  }, [albums.prevBuffer.length]);

  useEffect(async () => {
    if (albums.nextBuffer.length > LENGTH || !albums.nextPage) {
      return;
    }

    if (albums.current.length < LENGTH && albums.nextBuffer.length) {
      setAlbums((prevState) => {
        const count = LENGTH - prevState.current.length;
        const added = prevState.nextBuffer.slice(0, count);
        const newNextBuffer = prevState.nextBuffer.slice(count);

        return {
          ...prevState,
          nextBuffer: newNextBuffer,
          current: [...prevState.current, ...added],
        };
      });

      return;
    }

    const result = await getAlbums(category, albums.nextPage);

    if (!result) {
      return;
    }

    setAlbums((prevState) => {
      return {
        ...prevState,
        nextBuffer: [...prevState.nextBuffer, ...result.data],
        nextPage: result.nextPage,
      };
    });
  }, [albums.nextBuffer.length]);

  const handleWheel = function (isAscending, count) {
    if (isAscending) {
      setAlbums((prevState) => {
        const { prevBuffer, current, nextBuffer } = prevState;
        const prevAlbums = current.slice(0, count);
        const remainingAlbums = current.slice(count);
        const newAlbums = nextBuffer.slice(0, count);
        const remainingNext = nextBuffer.slice(count);
        const updatedCurrent = [...remainingAlbums, ...newAlbums];

        if (updatedCurrent.length < LENGTH) {
          return prevState;
        }

        return {
          ...prevState,
          prevBuffer: [...prevBuffer, ...prevAlbums],
          current: [...remainingAlbums, ...newAlbums],
          nextBuffer: remainingNext,
        };
      });
    } else {
      setAlbums((prevState) => {
        const { prevBuffer, current, nextBuffer } = prevState;
        const remainingPrev = prevBuffer.slice(0, -count);
        const newAlbums = prevBuffer.slice(-count);
        const remainingAlbums = current.slice(0, -count);
        const prevAlbums = current.slice(-count);
        const updatedCurrent = [...newAlbums, ...remainingAlbums];

        if (updatedCurrent.length < LENGTH) {
          return prevState;
        }

        return {
          ...prevState,
          prevBuffer: remainingPrev,
          current: updatedCurrent,
          nextBuffer: [...prevAlbums, ...nextBuffer],
        };
      });
    }
  };

  return (
    <div>
      <h1>{category}</h1>
      <Container>
        <div className="viewer">
          <ContentForm
            onSubmit={handleSubmitForm}
            submitButtonText="add album"
          />
        </div>
        <div>
          <ContentSpectator
            contents={albums.current || []}
            onWheel={handleWheel}
          />
        </div>
      </Container>
    </div>
  );
}

export default CustomAlbum;
