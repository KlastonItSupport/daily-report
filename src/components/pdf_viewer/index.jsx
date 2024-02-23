import React, { useState, useEffect } from "react";
import { useReports } from "../../hooks/reports";

export const PdfViewer = ({ id }) => {
  const { pdfData, fetchPdfData } = useReports();

  useEffect(() => {
    fetchPdfData(id, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {pdfData && (
        <div>
          {pdfData.url !== null && (
            <iframe
              id="iframe"
              key={pdfData}
              title="pdfteste"
              src={pdfData.url}
              width="100%"
              style={{ height: "65vh" }}
            />
          )}
        </div>
      )}
    </div>
  );
};
