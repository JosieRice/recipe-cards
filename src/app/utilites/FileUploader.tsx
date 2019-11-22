import * as React from "react";
import { useState } from "react";
import firebase from "../services/Firebase";
import FileUploader from "react-firebase-file-uploader";
import { UploaderStyle } from "../components/styled/Buttons";
import { Label } from "../components/styled/Page";
import { useMutation } from "@apollo/react-hooks";
import SET_IMAGE_URL from "../mutations/SET_IMAGE_URL";

interface Props {
  imageUrl: string;
  modal?: boolean;
  setUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

export const UploadRecipePic = ({
  imageUrl,
  modal = false,
  setUpdate,
  id
}: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [setImageUrl] = useMutation(SET_IMAGE_URL);

  const start = progress === 0 && !isUploading;
  const finished = progress === 100 && isUploading === false && imageUrl !== "";
  const uploading = !start && !finished && isUploading;

  const handleUploadError = (error: any) => {
    setIsUploading(false);
    console.error(error);
  };

  const handleUploadSuccess = (filename: any) => {
    setProgress(100);
    setIsUploading(false);

    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        setImageUrl({
          variables: { id, imageUrl: url }
        });
        {
          setUpdate && setUpdate(true);
        }
      });
  };

  return (
    <>
      {!modal && <Label>Image:</Label>}

      <UploaderStyle
        start={start.toString()}
        uploading={uploading}
        finished={finished}
        modal={modal}
      >
        {start && modal ? `Add image` : `Select your file`}
        {uploading && `Uploading`}
        {finished && `Done`}
        <FileUploader
          hidden
          disabled={finished}
          accept="image/*"
          name="pic"
          randomizeFilename
          storageRef={firebase.storage().ref("images")}
          onUploadStart={() => {
            setIsUploading(true);
            setProgress(0);
          }}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
          onProgress={(progress: any) => setProgress(progress)}
        />
      </UploaderStyle>
    </>
  );
};
