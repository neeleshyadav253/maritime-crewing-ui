import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, User, Clock } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";

interface ScheduleEvent {
  id: string;
  title: string;
  type: "sign-on" | "sign-off" | "training" | "leave" | "medical";
  date: Date;
  candidateId: string;
  candidateName: string;
  vesselName?: string;
  color?: string;
}

interface CalendarSchedulingGridProps {
  events?: ScheduleEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: ScheduleEvent) => void;
}

const CalendarSchedulingGrid: React.FC<CalendarSchedulingGridProps> = ({
  events = [],
  onDateClick,
  onEventClick,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  const getEventColor = (type: ScheduleEvent["type"]) => {
    switch (type) {
      case "sign-on":
        return "bg-green-100 text-green-800 border-green-200";
      case "sign-off":
        return "bg-red-100 text-red-800 border-red-200";
      case "training":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "leave":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "medical":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getEventIcon = (type: ScheduleEvent["type"]) => {
    switch (type) {
      case "sign-on":
      case "sign-off":
        return <User className="h-3 w-3" />;
      case "training":
        return <Clock className="h-3 w-3" />;
      case "medical":
        return <User className="h-3 w-3" />;
      default:
        return <Calendar className="h-3 w-3" />;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-gray-600" />
          <h3 className="text-lg font-semibold">Crew Rotation Calendar</h3>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={handleToday} className="btn-secondary text-sm">
            Today
          </button>
          <div className="flex items-center">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h4 className="font-semibold mx-4 min-w-[180px] text-center">
              {format(currentDate, "MMMM yyyy")}
            </h4>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="bg-gray-50 p-3 text-center">
            <span className="font-medium text-gray-700">{day}</span>
          </div>
        ))}

        {Array.from({ length: new Date(monthStart).getDay() }).map((_, idx) => (
          <div key={`empty-${idx}`} className="bg-white p-3 min-h-[100px]" />
        ))}

        {days.map((day) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={day.toString()}
              onClick={() => {
                setSelectedDate(day);
                onDateClick?.(day);
              }}
              className={`bg-white p-3 min-h-[120px] cursor-pointer transition-colors ${
                selectedDate?.toDateString() === day.toDateString()
                  ? "bg-blue-50 border-2 border-maritime-blue"
                  : "hover:bg-gray-50"
              } ${!isCurrentMonth ? "opacity-40" : ""}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`font-medium ${
                    isCurrentDay
                      ? "bg-maritime-blue text-white w-6 h-6 rounded-full flex items-center justify-center"
                      : "text-gray-700"
                  }`}
                >
                  {format(day, "d")}
                </span>
                {dayEvents.length > 0 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                    {dayEvents.length}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick?.(event);
                    }}
                    className={`p-2 rounded text-xs ${getEventColor(
                      event.type
                    )} border cursor-pointer hover:opacity-90`}
                  >
                    <div className="flex items-center space-x-1">
                      {getEventIcon(event.type)}
                      <span className="font-medium truncate">
                        {event.title}
                      </span>
                    </div>
                    <div className="truncate text-[10px] mt-1">
                      {event.candidateName}
                    </div>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 text-center">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Sign-on</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm">Sign-off</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm">Training</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm">Leave</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-sm">Medical</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSchedulingGrid;
