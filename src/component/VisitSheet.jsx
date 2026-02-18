import React, { useRef, useState, useEffect } from "react";
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
  const [images, setImages] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // ✅ LOAD IMAGES FROM LOCALSTORAGE ON MOUNT
  useEffect(() => {
    const existingData =
      JSON.parse(localStorage.getItem("reportData")) || {};

    if (existingData.visitImg) {
      setImages(existingData.visitImg);
    }
  }, []);

  // ✅ SAVE INTO reportData (KEY = visitImg)
  const saveVisitImages = (imageArray) => {
    const existingData =
      JSON.parse(localStorage.getItem("reportData")) || {};

    const updatedData = {
      ...existingData,
      visitImg: imageArray,
    };

    localStorage.setItem("reportData", JSON.stringify(updatedData));
  };

  // 🔄 AUTO SAVE WHEN IMAGES CHANGE
  useEffect(() => {
    saveVisitImages(images);
  }, [images]);

  // 📷 OPEN CAMERA
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
      alert("Camera not supported or permission denied.");
    }
  };

  // 📸 CAPTURE PHOTO (BASE64)
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const photoData = canvas.toDataURL("image/jpeg", 0.8);

    setImages((prev) => [...prev, photoData]);
    closeCamera();
  };

  // ❌ CLOSE CAMERA
  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
  };

  // 📂 OPEN FILE PICKER
  const handleLibraryClick = () => {
    fileInputRef.current.click();
  };

  // 📂 CONVERT FILES TO BASE64 (PERMANENT)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // ❌ DELETE IMAGE
  const handleDeleteImage = (indexToDelete) => {
    setImages((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Hidden File Input */}
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Camera Overlay */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black z-50">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <button
              onClick={capturePhoto}
              className="w-20 h-20 bg-white rounded-full border-4 border-gray-300"
            />
          </div>

          <button
            onClick={closeCamera}
            className="absolute top-6 right-6 bg-white p-2 rounded-full"
          >
            <X />
          </button>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between bg-white border-b px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
          <h1 className="text-lg font-semibold tracking-wide">
            VISIT SHEET
          </h1>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
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

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto">
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt="Visit"
                  className="w-full h-40 object-cover rounded-lg shadow"
                />

                <button
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-2 right-2 bg-black/70 p-1 rounded-full text-white hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
            <div className="text-5xl mb-4">📄</div>
            <p className="text-sm">
              Add at least one photo as visit sheet
            </p>
          </div>
        )}
      </div>

      {/* BOTTOM ACTIONS */}
      <div className="grid grid-cols-2 bg-white border-t">
        <button
          onClick={handleTakePhoto}
          className="flex items-center justify-center gap-2 py-4 hover:bg-gray-50 border-r"
        >
          <Camera size={18} />
          Take Photo
        </button>

        <button
          onClick={handleLibraryClick}
          className="flex items-center justify-center gap-2 py-4 hover:bg-gray-50"
        >
          <ImagePlus size={18} />
          Add From Library
        </button>
      </div>
    </div>
  );
}
