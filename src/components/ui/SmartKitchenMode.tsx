import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CookingStep } from "@/lib/types";
import { X, ChevronLeft, ChevronRight, Timer, AlertCircle, Play, Pause, RotateCcw, Mic } from "lucide-react";
import { Button } from "./button";

interface SmartKitchenModeProps {
  steps: CookingStep[];
  onClose: () => void;
}

export function SmartKitchenMode({ steps, onClose }: SmartKitchenModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const currentStep = steps[currentIndex];

  const startTimer = useCallback(() => {
    if (currentStep.duration) {
      setTimerSeconds(currentStep.duration * 60);
      setIsTimerRunning(true);
    }
  }, [currentStep.duration]);

  const resetTimer = useCallback(() => {
    if (currentStep.duration) {
      setTimerSeconds(currentStep.duration * 60);
      setIsTimerRunning(false);
    }
  }, [currentStep.duration]);

  useEffect(() => {
    if (isTimerRunning && timerSeconds !== null && timerSeconds > 0) {
      const interval = setInterval(() => {
        setTimerSeconds((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(interval);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      setTimerSeconds(null);
      if (currentIndex < steps.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  }, [isTimerRunning, timerSeconds, currentIndex, steps.length]);

  useEffect(() => {
    setTimerSeconds(null);
    setIsTimerRunning(false);
  }, [currentIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const goNext = () => {
    if (currentIndex < steps.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/30">
        <span className="text-lg font-semibold font-heading">
          Step {currentIndex + 1} of {steps.length}
        </span>
        <div className="flex items-center gap-3">
          {/* Voice Control Mock */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            <Mic className="h-4 w-4" />
            Voice Active
          </motion.div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-3xl text-center"
          >
            {currentStep.isCritical && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary mb-6 font-semibold"
              >
                <AlertCircle className="h-5 w-5" />
                Critical Step
              </motion.div>
            )}

            <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-relaxed mb-8">
              {currentStep.instruction}
            </p>

            {currentStep.duration && (
              <div className="space-y-4">
                {timerSeconds !== null ? (
                  <div className="flex flex-col items-center gap-4">
                    <span
                      className={`text-6xl font-mono font-bold ${
                        timerSeconds === 0 ? "text-secondary animate-pulse" : ""
                      }`}
                    >
                      {formatTime(timerSeconds)}
                    </span>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className="rounded-full"
                      >
                        {isTimerRunning ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                        {isTimerRunning ? "Pause" : "Resume"}
                      </Button>
                      <Button variant="outline" size="lg" onClick={resetTimer} className="rounded-full">
                        <RotateCcw className="h-5 w-5 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button size="lg" onClick={startTimer} className="btn-hero">
                    <Timer className="h-5 w-5 mr-2" />
                    Start {currentStep.duration} min Timer
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-6 border-t border-border/30">
        <Button
          variant="outline"
          size="lg"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="min-w-[140px] rounded-full"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back
        </Button>

        {/* Progress dots */}
        <div className="hidden md:flex items-center gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentIndex ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <Button
          size="lg"
          onClick={goNext}
          disabled={currentIndex === steps.length - 1}
          className={`min-w-[140px] rounded-full ${currentIndex < steps.length - 1 ? "btn-hero" : ""}`}
        >
          Next
          <ChevronRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
