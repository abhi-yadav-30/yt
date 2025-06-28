// SessionRecorder.js
import { useEffect, useRef, useState } from "react";

const CLOUD_NAME = "dg9pu0lcj"; // e.g. 'dku3f4pqh'
const UPLOAD_PRESET = "my_unsigned_preset"; // e.g. 'video_auto_upload'

const SessionRecorder = () => {
  const videoChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        streamRef.current = stream;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            videoChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.start();

        // When tab closes or page reloads
        window.addEventListener("beforeunload", handleStopRecording);
      } catch (err) {
        console.error("Error accessing camera/mic:", err);
      }
    };

    const handleStopRecording = async () => {
      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state === "inactive") return;

      recorder.stop();

      recorder.onstop = async () => {
        const blob = new Blob(videoChunksRef.current, { type: "video/webm" });
        await uploadToCloudinary(blob);
        videoChunksRef.current = [];

        // Stop camera
        streamRef.current?.getTracks().forEach((track) => track.stop());
      };
    };

    startRecording();

    return () => {
      window.removeEventListener("beforeunload", handleStopRecording);
      handleStopRecording();
    };
  }, []);

  const uploadToCloudinary = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "videos");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("✅ Uploaded video to Cloudinary:", data.secure_url);
    } catch (err) {
      console.error("❌ Cloudinary upload failed:", err);
    }
  };

  return null; // no UI needed
};

export default SessionRecorder;
