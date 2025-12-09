/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  Phone,
  PhoneOff,
  Save,
  Download,
  User,
  Calendar,
  Ship,
  Briefcase,
  Volume2,
  CheckCircle,
} from "lucide-react";

// Type definitions
interface SeafarerInfo {
  name: string;
  date: string;
  ship: string;
  rank: string;
}

interface Question {
  section: string;
  title?: string;
  question: string;
  followUp?: string;
}

interface Response {
  section: string;
  question: string;
  answer: string;
  timestamp: string;
}

type Mode = "setup" | "interview" | "complete";

interface DebriefingData {
  seafarerInfo: SeafarerInfo;
  responses: Response[];
  completedAt: string;
}

// Extend Window interface for speech recognition

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
    storage?: {
      set: (key: string, value: string) => Promise<void>;
      get: (key: string) => Promise<string | null>;
    };
  }
}

const SeafarerDebriefing: React.FC = () => {
  const [seafarerInfo, setSeafarerInfo] = useState<SeafarerInfo>({
    name: "",
    date: new Date().toISOString().split("T")[0],
    ship: "",
    rank: "",
  });

  const [mode, setMode] = useState<Mode>("setup");
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [transcript, setTranscript] = useState<string>("");

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);
  const silenceTimerRef = useRef<number | null>(null);

  const questions: Question[] = [
    {
      section: "A1",
      title: "Comments on Tour of Duty",
      question:
        "Let's start with your tour of duty. Please tell me about your joining and sign-off process. How was it?",
      followUp: "Great. Now tell me about the work environment on board.",
    },
    {
      section: "A1",
      question: "How was the food on board?",
      followUp: "And how did you find the appraisal process?",
    },
    {
      section: "A2",
      question:
        "Tell me about your readiness for joining. Are you ready to join again, and when?",
    },
    {
      section: "A3",
      question:
        "Do you have any recommendations or suggestions for improvements? Please share any ideas you have.",
    },
    {
      section: "B1",
      question:
        "Thank you for those comments. As the fleet personnel manager, I'd like to address some of your concerns. Is there anything specific you'd like to discuss further?",
    },
    {
      section: "B2",
      question:
        "Let's discuss training requirements. Do you have any recommended training from your appraisals?",
      followUp: "Are any of your STCW certificates expiring soon?",
    },
    {
      section: "B2",
      question:
        "Are you planning any value-added courses during your vacation? Remember to access Goodwoodlive while on vacation.",
    },
    {
      section: "B3",
      question:
        "Let's review your appraisal reports. Do you have any questions or concerns about your appraisals?",
    },
    {
      section: "B4",
      question: "How long are you planning to take for vacation?",
    },
    {
      section: "B5",
      question:
        "Finally, let's plan for your next appointment. What are your preferences for your next assignment?",
    },
  ];

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setTranscript((prev) => prev + finalTranscript);
          // eslint-disable-next-line react-hooks/immutability
          resetSilenceTimer();
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "no-speech") {
          resetSilenceTimer();
        }
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          try {
            recognitionRef.current.start();
          } catch (error) {
            console.log("Recognition restart error:", error);
          }
        }
      };
    } else {
      console.warn("Speech recognition not supported in this browser");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      synthRef.current.cancel();
    };
  }, [isListening]);

  const resetSilenceTimer = (): void => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    silenceTimerRef.current = setTimeout(() => {
      if (isListening && transcript.trim()) {
        handleNextQuestion();
      }
    }, 3000); // 3 seconds of silence
  };

  const speak = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        resolve();
      };

      synthRef.current.speak(utterance);
    });
  };

  const startInterview = async (): Promise<void> => {
    if (!seafarerInfo.name || !seafarerInfo.ship || !seafarerInfo.rank) {
      alert(
        "Please fill in all seafarer information before starting the interview."
      );
      return;
    }

    setMode("interview");
    setCurrentQuestion(0);

    await speak(
      `Hello ${seafarerInfo.name}. Welcome to your debriefing session. I'll be asking you a series of questions about your experience. Please speak clearly after each question. Let's begin.`
    );

    setTimeout(() => {
      askCurrentQuestion();
    }, 1000);
  };

  const askCurrentQuestion = async (): Promise<void> => {
    const question = questions[currentQuestion];
    await speak(question.question);

    if (question.followUp) {
      setTimeout(async () => {
        await speak(question.followUp!);
        startListening();
      }, 1000);
    } else {
      startListening();
    }
  };

  const startListening = (): void => {
    setTranscript("");
    setIsListening(true);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.log("Recognition already started:", error);
      }
    }
    resetSilenceTimer();
  };

  const stopListening = (): void => {
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log("Error stopping recognition:", error);
      }
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
  };

  const handleNextQuestion = async (): Promise<void> => {
    stopListening();

    const currentResponse: Response = {
      section: questions[currentQuestion].section,
      question: questions[currentQuestion].question,
      answer: transcript.trim(),
      timestamp: new Date().toISOString(),
    };

    setResponses((prev) => [...prev, currentResponse]);

    if (currentQuestion < questions.length - 1) {
      await speak("Thank you. Moving to the next question.");
      setCurrentQuestion((prev) => prev + 1);
      setTimeout(() => {
        askCurrentQuestion();
      }, 1000);
    } else {
      await speak(
        `Thank you ${seafarerInfo.name}. That completes the debriefing session. Your responses have been recorded. Have a great day!`
      );
      setMode("complete");
    }
  };

  const skipQuestion = async (): Promise<void> => {
    stopListening();
    setResponses((prev) => [
      ...prev,
      {
        section: questions[currentQuestion].section,
        question: questions[currentQuestion].question,
        answer: "[Skipped]",
        timestamp: new Date().toISOString(),
      },
    ]);

    if (currentQuestion < questions.length - 1) {
      await speak("Skipping to next question.");
      setCurrentQuestion((prev) => prev + 1);
      setTimeout(() => {
        askCurrentQuestion();
      }, 1000);
    } else {
      setMode("complete");
    }
  };

  const saveDebriefing = async (): Promise<void> => {
    const data: DebriefingData = {
      seafarerInfo,
      responses,
      completedAt: new Date().toISOString(),
    };

    try {
      if (window.storage) {
        await window.storage.set(
          `debrief-${seafarerInfo.name}-${seafarerInfo.date}`,
          JSON.stringify(data)
        );
        alert("Debriefing saved successfully!");
      } else {
        exportData(data);
      }
    } catch (error) {
      console.error("Save error:", error);
      exportData(data);
    }
  };

  const exportData = (data?: DebriefingData): void => {
    const exportData: DebriefingData = data || {
      seafarerInfo,
      responses,
      completedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `debrief-${seafarerInfo.name}-${seafarerInfo.date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetInterview = (): void => {
    setMode("setup");
    setCurrentQuestion(0);
    setResponses([]);
    setTranscript("");
    stopListening();
    synthRef.current.cancel();
  };

  const handleInputChange = (
    field: keyof SeafarerInfo,
    value: string
  ): void => {
    setSeafarerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (mode === "setup") {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-full max-w-2xl p-8 bg-white shadow-2xl rounded-xl">
          <div className="mb-8 text-center">
            <Ship className="mx-auto mb-4 text-blue-600" size={64} />
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              Automated Seafarer Debriefing
            </h1>
            <p className="text-gray-600">Voice-powered interview system</p>
          </div>

          <div className="mb-8 space-y-4">
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <User size={16} /> Name of Seafarer *
              </label>
              <input
                type="text"
                value={seafarerInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <Calendar size={16} /> Date
              </label>
              <input
                type="date"
                value={seafarerInfo.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <Ship size={16} /> Ship *
              </label>
              <input
                type="text"
                value={seafarerInfo.ship}
                onChange={(e) => handleInputChange("ship", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter ship name"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <Briefcase size={16} /> Rank *
              </label>
              <input
                type="text"
                value={seafarerInfo.rank}
                onChange={(e) => handleInputChange("rank", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter rank"
              />
            </div>
          </div>

          <div className="p-4 mb-6 border border-blue-200 rounded-lg bg-blue-50">
            <h3 className="mb-2 font-semibold text-blue-900">How it works:</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• The system will ask you questions using voice</li>
              <li>• Speak your answers clearly</li>
              <li>
                • The system will automatically move to the next question after
                3 seconds of silence
              </li>
              <li>• You can skip questions or end the interview anytime</li>
            </ul>
          </div>

          <button
            onClick={startInterview}
            className="flex items-center justify-center w-full gap-3 px-6 py-4 text-lg font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Phone size={24} />
            Start Debriefing Interview
          </button>
        </div>
      </div>
    );
  }

  if (mode === "interview") {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="p-6 mb-6 bg-white shadow-lg rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                Complete
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div
                className="h-3 transition-all duration-500 bg-blue-600 rounded-full"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Current Question */}
          <div className="p-8 mb-6 bg-white shadow-lg rounded-xl">
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`p-3 rounded-full ${
                  isSpeaking ? "bg-green-100" : "bg-blue-100"
                }`}
              >
                <Volume2
                  className={isSpeaking ? "text-green-600" : "text-blue-600"}
                  size={32}
                />
              </div>
              <div className="flex-1">
                <h2 className="mb-2 text-sm font-semibold text-gray-500">
                  Section {questions[currentQuestion].section}
                </h2>
                <p className="text-xl leading-relaxed text-gray-800">
                  {questions[currentQuestion].question}
                </p>
                {questions[currentQuestion].followUp && (
                  <p className="mt-3 text-lg leading-relaxed text-gray-600">
                    {questions[currentQuestion].followUp}
                  </p>
                )}
              </div>
            </div>

            {/* Listening Indicator */}
            {isListening && (
              <div className="p-6 mb-4 border-2 border-red-300 rounded-lg bg-red-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <Mic className="text-red-600" size={32} />
                    <span className="absolute flex w-4 h-4 -top-1 -right-1">
                      <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                      <span className="relative inline-flex w-4 h-4 bg-red-500 rounded-full"></span>
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-red-900">Listening...</p>
                    <p className="text-sm text-red-700">
                      Speak your answer now
                    </p>
                  </div>
                </div>

                {transcript && (
                  <div className="p-4 mt-3 bg-white rounded-lg">
                    <p className="text-gray-800">{transcript}</p>
                  </div>
                )}
              </div>
            )}

            {isSpeaking && (
              <div className="p-4 mb-4 border-2 border-green-300 rounded-lg bg-green-50">
                <div className="flex items-center gap-3">
                  <Volume2 className="text-green-600 animate-pulse" size={24} />
                  <p className="font-semibold text-green-900">
                    Assistant speaking...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={handleNextQuestion}
                disabled={!transcript.trim() || isSpeaking}
                className="flex items-center justify-center gap-2 px-6 py-3 font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle size={20} />
                Next Question
              </button>

              <button
                onClick={skipQuestion}
                disabled={isSpeaking}
                className="flex items-center justify-center gap-2 px-6 py-3 font-medium text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Skip
              </button>

              <button
                onClick={() => {
                  if (confirm("Are you sure you want to end the interview?")) {
                    stopListening();
                    synthRef.current.cancel();
                    setMode("complete");
                  }
                }}
                className="flex items-center justify-center gap-2 px-6 py-3 font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
              >
                <PhoneOff size={20} />
                End Interview
              </button>
            </div>
          </div>

          {/* Responses Summary */}
          {responses.length > 0 && (
            <div className="p-6 mt-6 bg-white shadow-lg rounded-xl">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Responses Recorded: {responses.length}
              </h3>
              <div className="space-y-2 overflow-y-auto max-h-40">
                {responses.map((resp, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="text-green-600" size={16} />
                    <span className="text-gray-600">
                      Section {resp.section}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (mode === "complete") {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-xl">
          <div className="mb-8 text-center">
            <CheckCircle className="mx-auto mb-4 text-green-600" size={64} />
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              Debriefing Complete!
            </h1>
            <p className="text-gray-600">
              Thank you for completing the interview
            </p>
          </div>

          <div className="p-6 mb-6 rounded-lg bg-gray-50">
            <h3 className="mb-4 font-semibold text-gray-800">Summary</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Seafarer:</span>{" "}
                {seafarerInfo.name}
              </p>
              <p>
                <span className="font-medium">Ship:</span> {seafarerInfo.ship}
              </p>
              <p>
                <span className="font-medium">Rank:</span> {seafarerInfo.rank}
              </p>
              <p>
                <span className="font-medium">Date:</span> {seafarerInfo.date}
              </p>
              <p>
                <span className="font-medium">Questions Answered:</span>{" "}
                {responses.length} of {questions.length}
              </p>
            </div>
          </div>

          <div className="mb-6 space-y-4 overflow-y-auto max-h-96">
            {responses.map((resp, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-blue-50">
                <p className="mb-2 text-xs font-semibold text-blue-600">
                  Section {resp.section}
                </p>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  {resp.question}
                </p>
                <p className="text-sm text-gray-800">{resp.answer}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={saveDebriefing}
              className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Save size={20} />
              Save Debriefing
            </button>
            <button
              onClick={() => exportData()}
              className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              <Download size={20} />
              Export Data
            </button>
          </div>

          <button
            onClick={resetInterview}
            className="w-full px-6 py-3 mt-4 font-medium text-gray-700 transition-colors border-2 border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Start New Interview
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default SeafarerDebriefing;
