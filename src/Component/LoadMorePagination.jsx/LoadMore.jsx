import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

function LoadMore() {
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [userList, setUserList] = useState([]);
  const [lastList, setLastList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_page=${currPage}&_limit=10`
        );
        console.log("Response == ", response.data);

        if (!response.data.length) {
          setLastList(true);
          return;
        }
        setPrevPage(currPage);
        setUserList((prevList) => [...prevList, ...response.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        setCurrPage((prev) => prev + 1);
      }
    }
  };

  return (
    <div onScroll={onScroll} ref={listInnerRef} style={{ height: "100vh", overflowY: "auto" }}>
      {userList.map((item, index) => (
        <div
          key={index}
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p>Title: {item.title}</p>
          <p>Body: {item.body}</p>
        </div>
      ))}
      {!lastList && <div style={{ textAlign: "center" }}>Loading more...</div>}
    </div>
  );
}

export default LoadMore;
