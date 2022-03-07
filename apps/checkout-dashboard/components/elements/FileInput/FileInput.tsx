import { Typography } from "@material-ui/core";
import { Button, DeleteIcon, IconButton, PlusIcon } from "@saleor/macaw-ui";
import Image from "next/image";
import React, { useRef } from "react";
import { useStyles } from "./styles";
import clsx from "clsx";

interface FileInputProps {
  label: string;
  fileUrl?: string;
  onFileUpload: (file: File) => void;
  onFileDelete: () => void;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  fileUrl,
  onFileUpload,
  onFileDelete,
}) => {
  const classes = useStyles();
  const anchor = useRef<HTMLInputElement>();

  const handleFileUploadButtonClick = () => anchor.current.click();

  const handleDragEvent = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    onFileUpload(files[0]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    onFileUpload(files[0]);
  };

  return (
    <div
      className={classes.root}
      onDragOver={handleDragEvent}
      onDragEnter={handleDragEvent}
      onDragLeave={handleDragEvent}
      onDrop={handleFileDrop}
    >
      <Typography variant="body2" className={classes.label}>
        {label}
      </Typography>
      {!fileUrl && (
        <div className={classes.uploadField}>
          <>
            <Typography variant="body2" className={classes.uploadLabel}>
              Drag an image here
            </Typography>
            <Typography
              variant="caption"
              className={clsx(classes.uploadLabel, classes.uploadSizeLabel)}
            >
              Max size 1GB
            </Typography>
            <Button
              variant="tertiary"
              className={classes.uploadButton}
              endIcon={<PlusIcon />}
              onClick={handleFileUploadButtonClick}
            >
              Upload file
            </Button>
          </>
        </div>
      )}
      {fileUrl && (
        <div className={classes.mediaContainer}>
          <Image className={classes.media} src={fileUrl} alt="file preview" />
          <div className={classes.mediaOverlay}>
            <div className={classes.mediaToolbar}>
              {onFileDelete && (
                <IconButton
                  color="primary"
                  className={classes.mediaToolbarIcon}
                  onClick={onFileDelete}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          </div>
        </div>
      )}
      <input
        className={classes.input}
        id="fileUpload"
        onChange={handleFileChange}
        type="file"
        ref={anchor}
        accept="image/*"
      />
    </div>
  );
};
export default FileInput;
