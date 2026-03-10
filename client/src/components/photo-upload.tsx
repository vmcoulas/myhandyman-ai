import { useState, useRef } from "react";
import { Camera, Upload, Images, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PhotoUploadProps {
  onImageSelected: (file: File) => void;
  isLoading: boolean;
}

export function PhotoUpload({ onImageSelected, isLoading }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast({ title: "Invalid file type", description: "Please select an image file (JPEG, PNG, etc.)", variant: "destructive" });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please select an image smaller than 10MB", variant: "destructive" });
      return;
    }
    onImageSelected(file);
  };

  const handleDragEnter = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); handleFiles(e.dataTransfer.files); };
  const handleClick = () => fileInputRef.current?.click();
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files);

  const handleCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      video.addEventListener('loadedmetadata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) { const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' }); onImageSelected(file); }
          stream.getTracks().forEach(track => track.stop());
        }, 'image/jpeg', 0.8);
      });
    } catch {
      toast({ title: "Camera access denied", description: "Please allow camera access or upload a file instead", variant: "destructive" });
    }
  };

  return (
    <div className="card-premium rounded-2xl p-8 mb-8">
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">
          Upload a photo. Get a plan.
        </h3>
        <p className="text-muted-foreground text-sm">Furniture, shelving, a workbench — you bring the idea. We’ll bring the steps.</p>
      </div>

      <div
        className={`upload-zone rounded-xl p-12 mb-6 cursor-pointer ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center relative z-10">
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-70" />
            <div className="relative rounded-full bg-primary text-primary-foreground p-5 shadow-sm">
              <Camera className="w-10 h-10" />
            </div>
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-1">Drop your photo here</h4>
          <p className="text-muted-foreground text-sm mb-5">or click to browse from your device</p>
          <Button
            className="font-semibold shadow-sm px-6"
            disabled={isLoading}
            onClick={(e) => { e.stopPropagation(); handleClick(); }}
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose photo
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleCamera}
          variant="secondary"
          className="flex-1 font-semibold"
          disabled={isLoading}
        >
          <Camera className="w-4 h-4 mr-2" />
          Take photo
        </Button>
        <Button
          onClick={handleClick}
          variant="outline"
          className="flex-1"
          disabled={isLoading}
        >
          <Images className="w-4 h-4 mr-2" />
          Choose from gallery
        </Button>
      </div>

      <div className="mt-6 pt-5 border-t border-border">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-primary/70" /> AI photo analysis</div>
          <div className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-primary/70" /> Step-by-step instructions</div>
          <div className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-primary/70" /> Materials + cost guidance</div>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
    </div>
  );
}
