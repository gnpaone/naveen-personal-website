import React, { useState, useCallback, useEffect } from "react";
import Table from "./Table";
import initialData from "../../data/stats/site";

const Stats = () => {
  const [data, setResponseData] = useState(initialData);
  // TODO think about persisting this somewhere

  const fetchData = useCallback(async () => {
    // request must be authenticated if private
    const res = await fetch(
      "https://api.github.com/repos/gnpaone/naveen-personal-website",
    );
    const resData = await res.json();

    const linesOfJs = await fetch(
      "https://api.allorigins.win/get?url=https://ghloc.vercel.app/api/gnpaone/naveen-personal-website/badge?filter=.js$",
    );
    const linesOfJsWrapper = await linesOfJs.json();
    const linesOfJsData = JSON.parse(linesOfJsWrapper.contents);

    setResponseData(
      initialData.map((field) => ({
        ...field,
        // update value if value was returned by call to github
        value:
          field.label === "Lines of Javascript powering this website"
            ? linesOfJsData.message
            : Object.keys(resData).includes(field.key)
              ? resData[field.key]
              : field.value,
      })),
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h3>Some stats about this site</h3>
      <Table data={data} />
    </div>
  );
};

export default Stats;
