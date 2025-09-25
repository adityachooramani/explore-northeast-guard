import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Square, Play, Pause } from "lucide-react";

interface VoiceRecorderProps {
  maxDuration?: number; // in seconds
  onRecordingComplete?: (audioBlob: Blob) => void;
  autoStart?: boolean;
}

const VoiceRecorder = ({ 
  maxDuration = 30, 
  onRecordingComplete,
  autoStart = false 
}: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [waveformData, setWaveformData] = useState<number[]>(new Array(20).fill(0));

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (autoStart) {
      startRecording();
    }
    return cleanup;
  }, [autoStart]);

  const cleanup = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup audio context for waveform visualization
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 64;

      // Setup media recorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        onRecordingComplete?.(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= maxDuration) {
            stopRecording();
            return maxDuration;
          }
          return newTime;
        });
      }, 1000);

      // Start waveform animation
      animateWaveform();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  };

  const animateWaveform = () => {
    if (!analyserRef.current || !isRecording) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Create waveform visualization data
    const waveform = Array.from({ length: 20 }, (_, i) => {
      const index = Math.floor((i / 20) * bufferLength);
      return (dataArray[index] || 0) / 255;
    });

    setWaveformData(waveform);

    if (isRecording) {
      animationFrameRef.current = requestAnimationFrame(animateWaveform);
    }
  };

  const playRecording = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.play();
      setIsPlaying(true);
      
      audio.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-gradient-surface border-neutral-gray/20">
      <CardContent className="p-6">
        <div className="text-center space-y-6">
          {/* Title */}
          <div>
            <h3 className="text-h2 font-semibold text-pure-white mb-2">Voice Message</h3>
            <p className="text-small text-neutral-gray">
              Record details for emergency responders ({maxDuration}s max)
            </p>
          </div>

          {/* Waveform Visualization */}
          <div className="flex items-center justify-center gap-1 h-16">
            {waveformData.map((amplitude, index) => (
              <div
                key={index}
                className={`w-2 rounded-full transition-all duration-150 ${
                  isRecording ? 'bg-danger' : 'bg-neutral-gray/30'
                }`}
                style={{
                  height: `${Math.max(4, amplitude * 60)}px`,
                  opacity: isRecording ? 0.7 + amplitude * 0.3 : 0.5
                }}
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center">
            <div className={`text-2xl font-mono font-semibold ${
              isRecording ? 'text-danger' : 'text-pure-white'
            }`}>
              {formatTime(recordingTime)}
            </div>
            <div className="text-small text-neutral-gray mt-1">
              {isRecording ? 'Recording...' : audioBlob ? 'Recording complete' : 'Ready to record'}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-neutral-gray/20 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isRecording ? 'bg-danger' : 'bg-deep-forest'
              }`}
              style={{ width: `${(recordingTime / maxDuration) * 100}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            {!isRecording && !audioBlob && (
              <Button
                onClick={startRecording}
                size="lg"
                className="bg-danger hover:bg-danger/90 text-pure-white rounded-full w-16 h-16"
              >
                <Mic className="h-6 w-6" />
              </Button>
            )}

            {isRecording && (
              <Button
                onClick={stopRecording}
                size="lg"
                className="bg-neutral-gray hover:bg-neutral-gray/90 text-pure-white rounded-full w-16 h-16"
              >
                <Square className="h-6 w-6" />
              </Button>
            )}

            {audioBlob && !isRecording && (
              <div className="flex gap-3">
                <Button
                  onClick={playRecording}
                  disabled={isPlaying}
                  variant="outline"
                  size="lg"
                  className="border-deep-forest/20 text-deep-forest hover:bg-deep-forest/10 rounded-full w-16 h-16"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>

                <Button
                  onClick={() => {
                    setAudioBlob(null);
                    setRecordingTime(0);
                    setWaveformData(new Array(20).fill(0));
                  }}
                  variant="outline"
                  size="lg"
                  className="border-neutral-gray/20 text-neutral-gray hover:bg-neutral-gray/10 rounded-full w-16 h-16"
                >
                  <MicOff className="h-6 w-6" />
                </Button>
              </div>
            )}
          </div>

          {/* Hint */}
          <p className="text-xs text-neutral-gray">
            {isRecording 
              ? "Tap stop when finished" 
              : audioBlob 
                ? "Tap play to review or record again"
                : "Tap the red button to start recording"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export { VoiceRecorder };