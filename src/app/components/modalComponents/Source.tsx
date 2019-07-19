import * as React from "react";
import { extractHostname } from "../../utilites/Utilities";

interface IProps {
  sourceUrl: string,
  sourceType: string
}

export default function Source(props: IProps) {
  const { sourceUrl, sourceType } = props;

  const cleanHostname = extractHostname(sourceUrl);

  if (sourceType === "unknown") return <></>;

  if (sourceType === "family") return <span>Source: Old Family Recipe</span>;

  if (sourceType === "book") return <span>Source: A Cook Book</span>;

  return (
    <>
      <span>Source: </span>
      <a
        href={sourceUrl}
        target="_blank"
      >
        {sourceType === "web" && cleanHostname}
      </a>
    </>
  );
};