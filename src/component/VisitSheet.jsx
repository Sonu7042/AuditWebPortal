import React, { useRef, useState } from "react";
import {
  ArrowLeft,
  Home,
  HelpCircle,
  Camera,
  ImagePlus,
  Globe,
  X,
} from "lucide-react";

export default function VisitSheet() {
  const [image, setImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // 🔥 Open Real Camera
  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      streamRef.current = stream;
      setIsCameraOpen(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      alert("Camera permission denied or not supported.");
    }
  };

  // 📸 Capture Photo
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const photoData = canvas.toDataURL("image/png");
    setImage(photoData);

    closeCamera();
  };

  // ❌ Close Camera
  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col relative">

      {/* 🔥 FULL SCREEN CAMERA OVERLAY */}
      {isCameraOpen && (
        <div className="absolute inset-0 bg-black z-50">

          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />

          {/* Capture Button */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <button
              onClick={capturePhoto}
              className="w-20 h-20 bg-white rounded-full border-4 border-gray-300"
            />
          </div>

          {/* Close Button */}
          <button
            onClick={closeCamera}
            className="absolute top-6 right-6 bg-white p-2 rounded-full"
          >
            <X />
          </button>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
          <h1 className="text-lg font-semibold tracking-wide">
            VISIT SHEET
          </h1>
        </div>

        <button className="border px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-100">
          Complete Report
        </button>
      </div>

      {/* Top Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b px-6 py-4 text-sm">
        <div>
          <p className="text-gray-500">Visit</p>
          <p className="font-medium">11-02-2026</p>
        </div>

        <div>
          <p className="text-gray-500">Promoter</p>
          <p className="font-medium">
            INDITEX TRENT RETAIL INDIA PRIVATE, LTD.
          </p>
        </div>

        <div>
          <p className="text-gray-500">Project</p>
          <p className="font-semibold text-base">Bershka</p>
          <p className="text-gray-600 text-xs">
            BANGALORE - SANJEEVINI NAGAR - YES - BERSHKA - MALL OF ASIA
          </p>
        </div>

        <div className="flex items-start gap-2">
          <Globe className="w-4 h-4 mt-1 text-gray-500" />
          <div>
            <p className="text-gray-500">Project market</p>
            <p className="font-medium">INDIA</p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-center justify-between px-6 py-2 bg-gray-50 border-b">
        <p className="text-sm text-gray-600">
          Add as many visit sheets as you like
        </p>

        <div className="flex gap-4">
          <Home className="w-5 h-5 text-gray-500 cursor-pointer" />
          <HelpCircle className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">

        {/* LEFT SIDE IMAGE */}
        {image ? (
          <div className="w-full md:w-1/3 border-r p-4 flex justify-center items-start">
            <img
              src={image}
              alt="Visit"
              className="rounded-lg object-cover max-h-[80vh]"
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 flex items-center justify-center border rounded-md mb-4">
              📄
            </div>

            <p className="text-gray-600 text-sm">
              THERE ARE NO MANAGEMENT VISIT SHEETS FOR THE COMPANY:
            </p>

            <p className="text-gray-800 font-semibold text-sm mt-1">
              INDERJEET BROS PROJECTS PVT. LTD.
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Add at least one photo as visit sheet
            </p>
          </div>
        )}

        {/* RIGHT SIDE */}
        {image && (
          <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
            Future details section
          </div>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 border-t">
        <button
          onClick={handleTakePhoto}
          className="flex items-center justify-center gap-2 py-4 hover:bg-gray-50 border-r text-sm font-medium"
        >
          <Camera className="w-5 h-5" />
          Take a photo of the visit sheet
        </button>

        <button
          onClick={handleTakePhoto}
          className="flex items-center justify-center gap-2 py-4 hover:bg-gray-50 text-sm font-medium"
        >
          <ImagePlus className="w-5 h-5" />
          Add a photo from the library
        </button>
      </div>
    </div>
  );
}
