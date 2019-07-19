import * as React from "react";

export default function Source(props: any) {
  const { sourceUrl, sourceType } = props

  //    /^(.*?)\./
  // https://stackoverflow.com/questions/31941899/remove-everything-after-domain-and-http-in-url-javascript
  // http://www.primaryobjects.com/2012/11/19/parsing-hostname-and-domain-from-a-url-with-javascript/
  // https://www.regextester.com/100133

  return (
    <>
      From: 
        {sourceType === "web" && "The Web Site"}
        {sourceType === "book" && "The Cook Book"}
        {sourceType === "family" && "Old Family Recipe"}
        {sourceType === "unknown" && "Parts Unknown"}
        
      <a
        href={sourceUrl}
        target="_blank"
      >
        {sourceUrl}
    </a>
    </>
  );
};