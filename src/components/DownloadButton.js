// components/DownloadButton.js
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import html2pdf from 'html2pdf.js';

const DownloadButton = ({ targetId, fileName = 'resume.pdf' }) => {
  const handleDownload = () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const opt = {
     margin: 0.5,
     filename: fileName,
     image: { type: 'jpeg', quality: 0.98 },
     html2canvas: {
       scale: 2,
       ignoreElements: (element) => {
         return element.classList.contains('no-export');
       },
     },
     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
   };

   html2pdf().set(opt).from(element).save();
  };

  return (
    <Tooltip title="Download PDF">
      <IconButton color="primary" onClick={handleDownload}>
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadButton;