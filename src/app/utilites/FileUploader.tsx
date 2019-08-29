import * as React from "react";
import { useState } from "react";
import firebase from "../services/Firebase";
import FileUploader from "react-firebase-file-uploader";
import { UploaderStyle } from "../components/styled/Buttons";
import { Label } from "../components/styled/Page";

export const UploadRecipePic = () => {
  // const [pic, setPic] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const start = !progress && !isUploading;
  const finished = progress === 100;

  const handleUploadError = (error: any) => {
    setIsUploading(false);
    console.error(error);
  };

  const handleUploadSuccess = (filename: any) => {
    // setPic(filename);
    setProgress(100);
    setIsUploading(false);

    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => console.log('SUCCESS, ITS HERE: ', url))
    // TODO: this url needs to be linked to the recipe
  };

  return (
    <div>
      <form>
        <Label>Image:</Label>

        <UploaderStyle start={start} isUploading={isUploading} finished={finished}>
          {start && `Select your file`}
          {isUploading && `Uploading`}
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
      </form>
    </div>
  );
}