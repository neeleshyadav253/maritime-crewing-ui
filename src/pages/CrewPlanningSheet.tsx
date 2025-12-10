import React, { useState, useEffect } from "react";

interface Officer {
  name: string;
  dates: { csd: string; ced: string };
  phone?: string;
  email?: string;
  availability?: "available" | "unavailable" | "unknown";
}

interface AvailableOfficer {
  id: string;
  name: string;
  rank: string;
  phone: string;
  email: string;
  currentStatus: "available" | "on_leave" | "on_duty" | "pending";
  availabilityDate: string;
  experience: string;
  notes: string;
}

interface VesselData {
  id: string;
  vessel: string;
  schedule: string;
  master: Officer;
  chOfficer: Officer;
  firstOfficer: Officer;
  chEngineer: Officer;
  secondEngineer: Officer;
  eto: Officer;
  remark: string;
  masterEx?: string;
  chOfficerEx?: string;
  firstOfficerEx?: string;
  chEngineerEx?: string;
  secondEngineerEx?: string;
  etoEx?: string;
}

const VesselPlanningChart: React.FC = () => {
  // Mock data for available officers
  const [availableOfficers, setAvailableOfficers] = useState<
    AvailableOfficer[]
  >([
    {
      id: "1",
      name: "Captain John Smith",
      rank: "Master",
      phone: "+91 9876543210",
      email: "john.smith@shipping.com",
      currentStatus: "available",
      availabilityDate: "20/Jan/23",
      experience: "15 years VLCC",
      notes: "Recently completed contract, ready for immediate deployment",
    },
    {
      id: "2",
      name: "Chief Officer Rajesh Kumar",
      rank: "Chief Officer",
      phone: "+91 9876543211",
      email: "rajesh.kumar@shipping.com",
      currentStatus: "available",
      availabilityDate: "25/Jan/23",
      experience: "8 years VLCC",
      notes: "Specialized in dry dock operations",
    },
    {
      id: "3",
      name: "Chief Engineer Michael Chen",
      rank: "Chief Engineer",
      phone: "+91 9876543212",
      email: "michael.chen@shipping.com",
      currentStatus: "on_leave",
      availabilityDate: "30/Jan/23",
      experience: "12 years ME engines",
      notes: "On leave until 25th Jan",
    },
    {
      id: "4",
      name: "2nd Engineer David Lee",
      rank: "2nd Engineer",
      phone: "+91 9876543213",
      email: "david.lee@shipping.com",
      currentStatus: "available",
      availabilityDate: "22/Jan/23",
      experience: "6 years",
      notes: "Available for immediate joining",
    },
    {
      id: "5",
      name: "ETO Robert Wilson",
      rank: "ETO",
      phone: "+91 9876543214",
      email: "robert.wilson@shipping.com",
      currentStatus: "pending",
      availabilityDate: "28/Jan/23",
      experience: "7 years JRC systems",
      notes: "Medical check pending",
    },
    {
      id: "6",
      name: "1st Officer Sarah Johnson",
      rank: "1st Officer",
      phone: "+91 9876543215",
      email: "sarah.j@shipping.com",
      currentStatus: "available",
      availabilityDate: "18/Jan/23",
      experience: "5 years",
      notes: "Looking for immediate assignment",
    },
  ]);

  const [vessels, setVessels] = useState<VesselData[]>([
    {
      id: "1",
      vessel: "JAGUAR     (MAN BW 7G80ME)    JRC+201       HKG",
      schedule: "China Dry Docks 25th Jan",
      master: {
        name: "Bapaditya Bose [ex]",
        dates: { csd: "13/Oct/22", ced: "12/Feb/23" },
      },
      chOfficer: {
        name: "Tarun Mehta [ex]",
        dates: { csd: "29/Nov/22", ced: "28/Mar/23" },
      },
      firstOfficer: { name: "", dates: { csd: "", ced: "" } },
      chEngineer: {
        name: "Sreekant Vijayan [ex]",
        dates: { csd: "19/Oct/22", ced: "18/Feb/23" },
      },
      secondEngineer: {
        name: "Chetan Dhondekar [ex]",
        dates: { csd: "13/Oct/22", ced: "12/Feb/23" },
      },
      eto: {
        name: "Gurjit Sandhu [ex]",
        dates: { csd: "22/Aug/22", ced: "21/Feb/23" },
      },
      remark: "DRY DOCKS 24TH JAN",
      masterEx: "AJAY YADAV [EX]",
      chOfficerEx: "SUBHAS SOMAN PILLAI [EX]",
      chEngineerEx: "RAJU PETER GEORGE [EX]",
      secondEngineerEx: "BRUNO FIGUEIREDO [EX]",
      etoEx: "NAVEEN RAJ [EX]",
    },
    {
      id: "2",
      vessel: "LKNI     (MAN BW 7G80ME) JRC9201",
      schedule: "Corpus Christi 14th Feb",
      master: {
        name: "Deepak Salunkhe [ex]",
        dates: { csd: "24/Nov/22", ced: "23/Mar/23" },
      },
      chOfficer: {
        name: "Vikas Malhotra [ex]",
        dates: { csd: "18/Jan/23", ced: "17/May/23" },
      },
      firstOfficer: { name: "", dates: { csd: "", ced: "" } },
      chEngineer: {
        name: "Sachin Naik [ex]",
        dates: { csd: "15/Dec/22", ced: "14/Apr/23" },
      },
      secondEngineer: {
        name: "Sudhir Salunke [ex]",
        dates: { csd: "27/Dec/22", ced: "26/Apr/23" },
      },
      eto: {
        name: "Aditya Mahla [ex]",
        dates: { csd: "18/Jan/23", ced: "17/Jun/23" },
      },
      remark: "",
      masterEx: "CLIFFORD MENEZES [EX]",
      secondEngineerEx: "PRASHANT GARCHA [EX]",
    },
    {
      id: "3",
      vessel: "LEOPARD  (MAN BW 7G80ME) JRC9201",
      schedule: "Galfe 20th Jan",
      master: {
        name: "Parimal Bhowmic [ex]",
        dates: { csd: "24/Oct/22", ced: "23/Feb/23" },
      },
      chOfficer: {
        name: "C.K.Pandey [ex]",
        dates: { csd: "15/Jan/23", ced: "14/May/23" },
      },
      firstOfficer: { name: "", dates: { csd: "", ced: "" } },
      chEngineer: {
        name: "Narsimhan Uppilli [ex]",
        dates: { csd: "17/Oct/22", ced: "18/Feb/23" },
      },
      secondEngineer: {
        name: "Frank Gomes [ex]",
        dates: { csd: "15/Jan/23", ced: "14/May/23" },
      },
      eto: {
        name: "Parimal Nijal [ex]",
        dates: { csd: "15/Jan/23", ced: "14/Jun/23" },
      },
      remark: "",
      masterEx: "LUQUE FERNANDES [EX]",
      chEngineerEx: "TRILOCHAN NAYAK [EX]",
    },
    {
      id: "4",
      vessel: "PANTHER   (MAN BW 7G80ME)  JRC9201",
      schedule: "China 18th Feb - Eld 25th Feb",
      master: {
        name: "Alok Prashant Singh [ex]",
        dates: { csd: "25/Sep/22", ced: "24/Jan/23" },
      },
      chOfficer: {
        name: "Vishvendra Gaharwar [ex]",
        dates: { csd: "13/Sep/22", ced: "12/Jan/23" },
      },
      firstOfficer: { name: "", dates: { csd: "", ced: "" } },
      chEngineer: {
        name: "Nitin Pakanti [ex]",
        dates: { csd: "13/Sep/22", ced: "12/Jan/23" },
      },
      secondEngineer: {
        name: "Tejinder Panesar [ex]",
        dates: { csd: "25/Sep/22", ced: "24/Jan/23" },
      },
      eto: {
        name: "Jai Prakash [ex]",
        dates: { csd: "25/Sep/22", ced: "24/Mar/23" },
      },
      remark: "",
      masterEx: "MANPREET DHALIWAL [EX]",
      chOfficerEx: "AMIT RATAN PAUL [EX]",
      chEngineerEx: "NEWYN VALADARES [EX]",
      secondEngineerEx: "AMOL GHULE [EX]",
      etoEx: "VIVEK SHUKLA [EX]",
    },
    {
      id: "5",
      vessel: "PUMA      (MAN BW 7G80ME)  JRC                HKG",
      schedule: "Singapore 24th Jan",
      master: {
        name: "Atul Divekar [ex]",
        dates: { csd: "5/Sep/22", ced: "4/Jan/23" },
      },
      chOfficer: {
        name: "Birendra Chaudhary [ex]",
        dates: { csd: "30/Oct/22", ced: "29-Feb-23" },
      },
      firstOfficer: { name: "", dates: { csd: "", ced: "" } },
      chEngineer: {
        name: "Satya Patharia [ex]",
        dates: { csd: "12/Sep/22", ced: "11/Jan/23" },
      },
      secondEngineer: {
        name: "Virappin [ex]",
        dates: { csd: "5/Sep/22", ced: "4/Jan/23" },
      },
      eto: { name: "Prince [ex]", dates: { csd: "5/Sep/22", ced: "4/Feb/23" } },
      remark: "",
      masterEx: "SRINIVAS VALLURI [EX]",
      chOfficerEx: "SHEKAR PUNIA [EX]",
      chEngineerEx: "ARJUN MOHANRAO [EX]",
      secondEngineerEx: "SUMIT VYAS [EX]",
      etoEx: "KULBIR VERMA [EX]",
    },
    {
      id: "6",
      vessel: "TIGER      (MAN BW 7G80ME)  JRC9201          HKG",
      schedule: "Singapore 29th Jan",
      master: {
        name: "Ankur Devgun [ex]",
        dates: { csd: "28/Nov/22", ced: "27/Mar/23" },
      },
      chOfficer: {
        name: "Sunit Shanbhag [ex]",
        dates: { csd: "16/Jan/23", ced: "15/May/23" },
      },
      firstOfficer: { name: "", dates: { csd: "", ced: "" } },
      chEngineer: {
        name: "Ashish Auti [ex]",
        dates: { csd: "16/Jan/23", ced: "15/May/23" },
      },
      secondEngineer: {
        name: "Manish Raut [ex]",
        dates: { csd: "28/Nov/22", ced: "27/Mar/23" },
      },
      eto: {
        name: "Gurmeet Singh [ex]",
        dates: { csd: "28/Nov/22", ced: "27/Apr/23" },
      },
      remark: "",
      masterEx: "RICHARD PATIAL [EX]",
      etoEx: "MERICK ROSARIO [EX]",
    },
    {
      id: "7",
      vessel: "STALLION  (MAN BW 6G80ME-C9.5)     FURUNO HKG",
      schedule: "Rio D Janeiro 24TH Jan",
      master: {
        name: "Vishal Kant [ex] EXT APRIL",
        dates: { csd: "5/Sep/22", ced: "4/Apr/23" },
      },
      chOfficer: {
        name: "Nabil Khot [ex]",
        dates: { csd: "30/Oct/22", ced: "29-Feb-23" },
      },
      firstOfficer: { name: "", dates: { csd: "", ced: "" } },
      chEngineer: {
        name: "Sachin Dhamal [ex]",
        dates: { csd: "30/Oct/22", ced: "29-Feb-23" },
      },
      secondEngineer: {
        name: "Ashish Lochan [ex]",
        dates: { csd: "26/Nov/22", ced: "25/Mar/23" },
      },
      eto: {
        name: "Mehta Man Singh [ex]",
        dates: { csd: "26/Nov/22", ced: "25/Apr/23" },
      },
      remark: "PETROBRAS",
      masterEx: "NOBLE PEREIRA [EX]",
      chOfficerEx: "ASHISH JANGIR [EX]",
      chEngineerEx: "SUDHIR DEVARAKONDA [EX]",
      etoEx: "VINOD YADAV [EX]",
    },
    {
      id: "8",
      vessel: "",
      schedule: "Zhoushan 24th Jan",
      master: { name: "Vara Prasad Bandaru [ex]", dates: { csd: "", ced: "" } },
      chOfficer: { name: "Jatendra Kumar [ex]", dates: { csd: "", ced: "" } },
      firstOfficer: { name: "", dates: { csd: "", ced: "" } },
      chEngineer: { name: "Rajiv Gandhi [ex]", dates: { csd: "", ced: "" } },
      secondEngineer: {
        name: "Neil Mendonsa [ex]",
        dates: { csd: "", ced: "" },
      },
      eto: { name: "Harsh Verma [ex]", dates: { csd: "", ced: "" } },
      remark: "PETROBRAS",
    },
  ]);

  const [editingCell, setEditingCell] = useState<{
    vesselId: string;
    field: string;
    subfield?: string;
  } | null>(null);

  const [showOfficersModal, setShowOfficersModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [selectedVesselId, setSelectedVesselId] = useState<string>("");
  const [callingOfficer, setCallingOfficer] = useState<string | null>(null);
  const [callStatus, setCallStatus] = useState<string>("");
  const [filteredOfficers, setFilteredOfficers] =
    useState<AvailableOfficer[]>(availableOfficers);
  const [callLogs, setCallLogs] = useState<
    Array<{
      officerId: string;
      officerName: string;
      timestamp: string;
      status: "success" | "failed" | "no_answer" | "busy";
      notes: string;
    }>
  >([]);

  // Filter officers based on selected position
  useEffect(() => {
    if (selectedPosition) {
      const filtered = availableOfficers.filter(
        (officer) =>
          officer.rank.toLowerCase().includes(selectedPosition.toLowerCase()) ||
          selectedPosition
            .toLowerCase()
            .includes(officer.rank.toLowerCase().split(" ")[0])
      );
      setFilteredOfficers(filtered);
    } else {
      setFilteredOfficers(availableOfficers);
    }
  }, [selectedPosition, availableOfficers]);

  const handleCellClick = (
    vesselId: string,
    field: string,
    subfield?: string
  ) => {
    setEditingCell({ vesselId, field, subfield });
  };

  const handleCellChange = (value: string) => {
    if (!editingCell) return;

    setVessels(
      vessels.map((vessel) => {
        if (vessel.id === editingCell.vesselId) {
          if (editingCell.subfield) {
            return {
              ...vessel,
              [editingCell.field]: {
                ...(vessel[editingCell.field as keyof VesselData] as Officer),
                dates: {
                  ...(vessel[editingCell.field as keyof VesselData] as Officer)
                    .dates,
                  [editingCell.subfield]: value,
                },
              },
            };
          } else if (
            [
              "master",
              "chOfficer",
              "firstOfficer",
              "chEngineer",
              "secondEngineer",
              "eto",
            ].includes(editingCell.field)
          ) {
            return {
              ...vessel,
              [editingCell.field]: {
                ...(vessel[editingCell.field as keyof VesselData] as Officer),
                name: value,
              },
            };
          } else {
            return {
              ...vessel,
              [editingCell.field]: value,
            };
          }
        }
        return vessel;
      })
    );
  };

  const handleBlur = () => {
    setEditingCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const getPositionFromField = (field: string): string => {
    const map: { [key: string]: string } = {
      master: "Master",
      chOfficer: "Chief Officer",
      firstOfficer: "1st Officer",
      chEngineer: "Chief Engineer",
      secondEngineer: "2nd Engineer",
      eto: "ETO",
    };
    return map[field] || field;
  };

  const openOfficersModal = (vesselId: string, field: string) => {
    const vessel = vessels.find((v) => v.id === vesselId);
    if (!vessel) return;

    const officer = vessel[field as keyof VesselData] as Officer;
    if (!officer.name || officer.name.trim() === "") {
      setSelectedPosition(getPositionFromField(field));
      setSelectedVesselId(vesselId);
      setShowOfficersModal(true);
    }
  };

  const simulateCall = (officer: AvailableOfficer) => {
    setCallingOfficer(officer.id);
    setCallStatus("Calling...");

    // Simulate call with random outcome
    const outcomes: Array<{
      status: "success" | "failed" | "no_answer" | "busy";
      message: string;
      notes: string;
    }> = [
      {
        status: "success",
        message: "Officer available and interested!",
        notes: "Confirmed availability for the position",
      },
      {
        status: "no_answer",
        message: "No answer - left voicemail",
        notes: "Called twice, no answer",
      },
      {
        status: "busy",
        message: "Line busy",
        notes: "Will try again in 30 minutes",
      },
      {
        status: "failed",
        message: "Not available until next month",
        notes: "Currently on another assignment",
      },
    ];

    // eslint-disable-next-line react-hooks/purity
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

    setTimeout(() => {
      setCallStatus(outcome.message);

      // Add to call logs
      setCallLogs((prev) => [
        ...prev,
        {
          officerId: officer.id,
          officerName: officer.name,
          timestamp: new Date().toLocaleTimeString(),
          status: outcome.status,
          notes: outcome.notes,
        },
      ]);

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setCallingOfficer(null);
        setCallStatus("");
      }, 3000);
    }, 2000);
  };

  const assignOfficer = (officer: AvailableOfficer) => {
    if (!selectedVesselId || !selectedPosition) return;

    const fieldMap: { [key: string]: string } = {
      Master: "master",
      "Chief Officer": "chOfficer",
      "1st Officer": "firstOfficer",
      "Chief Engineer": "chEngineer",
      "2nd Engineer": "secondEngineer",
      ETO: "eto",
    };

    const field = fieldMap[selectedPosition] || selectedPosition.toLowerCase();

    setVessels(
      vessels.map((vessel) => {
        if (vessel.id === selectedVesselId) {
          return {
            ...vessel,
            [field]: {
              ...(vessel[field as keyof VesselData] as Officer),
              name: `${officer.name} [assigned]`,
              dates: {
                csd: new Date().toLocaleDateString("en-GB").replace(/\//g, "/"),
                ced: "",
              },
            },
          };
        }
        return vessel;
      })
    );

    // Remove assigned officer from available list
    setAvailableOfficers((prev) => prev.filter((o) => o.id !== officer.id));
    setShowOfficersModal(false);
    setSelectedPosition("");
    setSelectedVesselId("");
  };

  const getStatusBadge = (status: string) => {
    const styles: { [key: string]: string } = {
      available: "bg-green-100 text-green-800 border-green-200",
      on_leave: "bg-yellow-100 text-yellow-800 border-yellow-200",
      on_duty: "bg-blue-100 text-blue-800 border-blue-200",
      pending: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${
          styles[status] || styles.pending
        }`}
      >
        {status.replace("_", " ").toUpperCase()}
      </span>
    );
  };

  const getCallStatusColor = (status: string) => {
    if (status.includes("available")) return "text-green-600";
    if (status.includes("busy") || status.includes("No answer"))
      return "text-yellow-600";
    if (status.includes("failed") || status.includes("Not available"))
      return "text-red-600";
    return "text-blue-600";
  };

  const renderEditableCell = (
    vesselId: string,
    field: string,
    value: string,
    subfield?: string,
    className: string = "",
    bgColor: string = ""
  ) => {
    const isEditing =
      editingCell?.vesselId === vesselId &&
      editingCell?.field === field &&
      editingCell?.subfield === subfield;

    const isEmpty = !value || value.trim() === "";
    const isOfficerField = [
      "master",
      "chOfficer",
      "firstOfficer",
      "chEngineer",
      "secondEngineer",
      "eto",
    ].includes(field);

    return (
      <div
        className={`relative ${className} ${bgColor}`}
        onClick={(e) => {
          if (isOfficerField && subfield === undefined && isEmpty) {
            e.stopPropagation();
            openOfficersModal(vesselId, field);
          } else {
            handleCellClick(vesselId, field, subfield);
          }
        }}
      >
        <div
          className={`
          p-1 text-xs cursor-pointer min-h-[28px] flex items-center justify-center
          transition-all duration-200
          ${
            isEmpty && isOfficerField && subfield === undefined
              ? "bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-dashed border-blue-300"
              : ""
          }
        `}
        >
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => handleCellChange(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full h-full px-1 text-xs text-center bg-white border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter value..."
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              {isEmpty && isOfficerField && subfield === undefined ? (
                <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Assign Officer
                </button>
              ) : isEmpty ? (
                <span className="text-xs italic text-gray-400">
                  Click to edit
                </span>
              ) : (
                <span className="px-1 truncate">{value}</span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const getOfficerBackground = (officerName: string): string => {
    if (!officerName || officerName.trim() === "") return "";
    if (officerName.includes("[ex]")) return "bg-amber-100";
    if (officerName.includes("[assigned]")) return "bg-green-100";
    return "bg-blue-50";
  };

  return (
    <div className="w-full min-h-screen p-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="p-4 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-gray-800">
              SENIOR OFFICERS PLANNING CHART - VLCC
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowOfficersModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 2.5L21 21"
                  />
                </svg>
                View Available Officers ({availableOfficers.length})
              </button>
              {callLogs.length > 0 && (
                <div className="relative">
                  <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg cursor-pointer">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Call Logs
                    <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                      {callLogs.length}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Chart - Simplified version */}
        <div className="mb-6 overflow-hidden bg-white border border-gray-300 rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <div className="min-w-[1600px]">
              {/* Column Headers */}
              <div className="sticky top-0 z-20 border-b-2 border-gray-800 bg-gradient-to-r from-gray-100 to-gray-50">
                <div className="flex">
                  <div className="w-64 p-3 font-bold text-center text-gray-700 border-r border-gray-300">
                    VESSEL
                  </div>
                  <div className="w-56 p-3 font-bold text-center text-gray-700 border-r border-gray-300">
                    SCHEDULE
                  </div>
                  {[
                    "MASTER",
                    "CH OFFICER",
                    "1ST OFFICER",
                    "CH ENGINEER",
                    "2ND ENGINEER",
                    "ETO",
                  ].map((title, idx) => (
                    <div
                      key={title}
                      className={`w-48 border-r border-gray-300 ${
                        idx === 0 || idx === 3 || idx === 4
                          ? "bg-cyan-50"
                          : idx === 1 || idx === 5
                          ? "bg-yellow-50"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="p-2 text-sm font-bold text-center border-b border-gray-300">
                        {title}
                      </div>
                      <div className="flex">
                        <div className="w-1/2 p-1 text-xs font-semibold text-center border-r border-gray-300">
                          CSD
                        </div>
                        <div className="w-1/2 p-1 text-xs font-semibold text-center">
                          CED
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="w-48 p-3 font-bold text-center text-gray-700">
                    REMARK
                  </div>
                </div>
              </div>

              {/* Data Rows */}
              {vessels.map((vessel) => (
                <div
                  key={vessel.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <div className="flex min-h-[60px]">
                    <div className="flex items-center w-64 p-2 border-r border-gray-300">
                      <span className="font-medium text-blue-900">
                        {vessel.vessel}
                      </span>
                    </div>
                    <div className="flex items-center w-56 p-2 border-r border-gray-300">
                      <span className="text-sm font-semibold text-gray-700">
                        {vessel.schedule}
                      </span>
                    </div>

                    {[
                      "master",
                      "chOfficer",
                      "firstOfficer",
                      "chEngineer",
                      "secondEngineer",
                      "eto",
                    ].map((field) => {
                      const officer = vessel[
                        field as keyof VesselData
                      ] as Officer;
                      return (
                        <div
                          key={field}
                          className="w-48 border-r border-gray-300"
                        >
                          <div className="border-b border-gray-200 h-1/2">
                            {renderEditableCell(
                              vessel.id,
                              field,
                              officer.name,
                              undefined,
                              "h-full",
                              getOfficerBackground(officer.name)
                            )}
                          </div>
                          <div className="flex h-1/2">
                            <div className="w-1/2 border-r border-gray-200">
                              {renderEditableCell(
                                vessel.id,
                                field,
                                officer.dates.csd,
                                "csd",
                                "h-full text-xs"
                              )}
                            </div>
                            <div className="w-1/2">
                              {renderEditableCell(
                                vessel.id,
                                field,
                                officer.dates.ced,
                                "ced",
                                "h-full text-xs"
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex items-center w-48 p-2">
                      <span className="px-2 py-1 text-xs font-medium text-red-700 rounded bg-red-50">
                        {vessel.remark}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Available Officers Modal */}
        {showOfficersModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 text-white border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-xl">
                <div>
                  <h2 className="text-xl font-bold">Available Officers</h2>
                  <p className="mt-1 text-sm text-blue-100">
                    {selectedPosition
                      ? `Position: ${selectedPosition}`
                      : "Browse all available officers"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {callingOfficer && (
                    <div
                      className={`bg-white px-4 py-2 rounded-lg ${getCallStatusColor(
                        callStatus
                      )} font-medium animate-pulse`}
                    >
                      {callStatus}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setShowOfficersModal(false);
                      setSelectedPosition("");
                      setSelectedVesselId("");
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Filter by Rank
                    </label>
                    <select
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Ranks</option>
                      <option value="Master">Master</option>
                      <option value="Chief Officer">Chief Officer</option>
                      <option value="1st Officer">1st Officer</option>
                      <option value="Chief Engineer">Chief Engineer</option>
                      <option value="2nd Engineer">2nd Engineer</option>
                      <option value="ETO">ETO</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Filter by Status
                    </label>
                    <select
                      onChange={(e) => {
                        const status = e.target.value;
                        setFilteredOfficers(
                          status
                            ? availableOfficers.filter(
                                (o) => o.currentStatus === status
                              )
                            : availableOfficers
                        );
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Status</option>
                      <option value="available">Available</option>
                      <option value="on_leave">On Leave</option>
                      <option value="on_duty">On Duty</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <div className="px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg">
                      Showing {filteredOfficers.length} officers
                    </div>
                  </div>
                </div>
              </div>

              {/* Officers List */}
              <div className="flex-1 p-6 overflow-auto">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {filteredOfficers.map((officer) => (
                    <div
                      key={officer.id}
                      className="p-5 transition-shadow duration-200 bg-white border border-gray-200 rounded-xl hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {officer.name}
                          </h3>
                          <p className="font-medium text-blue-600">
                            {officer.rank}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(officer.currentStatus)}
                          <span className="text-sm text-gray-500">
                            Available: {officer.availabilityDate}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="mb-1 text-sm text-gray-600">Contact</p>
                          <p className="font-medium">{officer.phone}</p>
                          <p className="text-sm text-gray-700">
                            {officer.email}
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 text-sm text-gray-600">
                            Experience
                          </p>
                          <p className="font-medium">{officer.experience}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="mb-1 text-sm text-gray-600">Notes</p>
                        <p className="italic text-gray-700">{officer.notes}</p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => simulateCall(officer)}
                          disabled={callingOfficer !== null}
                          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium ${
                            callingOfficer === officer.id
                              ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                              : "bg-green-600 text-white hover:bg-green-700"
                          } ${
                            callingOfficer
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          {callingOfficer === officer.id
                            ? "Calling..."
                            : "Call Officer"}
                        </button>

                        {selectedVesselId && (
                          <button
                            onClick={() => assignOfficer(officer)}
                            disabled={officer.currentStatus !== "available"}
                            className={`py-2 px-4 rounded-lg font-medium ${
                              officer.currentStatus === "available"
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            Assign to Vessel
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {filteredOfficers.length === 0 && (
                  <div className="py-12 text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 2.5L21 21"
                      />
                    </svg>
                    <h3 className="mb-2 text-lg font-medium text-gray-700">
                      No officers found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your filters or check back later for new
                      officers.
                    </p>
                  </div>
                )}
              </div>

              {/* Call Logs */}
              {callLogs.length > 0 && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <h4 className="mb-3 font-medium text-gray-700">
                    Recent Call Logs
                  </h4>
                  <div className="space-y-2 overflow-auto max-h-40">
                    {callLogs.slice(-5).map((log, index) => (
                      <div
                        key={index}
                        className="p-3 bg-white border border-gray-200 rounded"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">
                              {log.officerName}
                            </span>
                            <span className="ml-2 text-sm text-gray-500">
                              {log.timestamp}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              log.status === "success"
                                ? "bg-green-100 text-green-800"
                                : log.status === "failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {log.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {log.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-600">
                  {selectedVesselId ? (
                    <span>
                      Assigning to:{" "}
                      <span className="font-medium">
                        {vessels.find((v) => v.id === selectedVesselId)?.vessel}
                      </span>
                    </span>
                  ) : (
                    <span>
                      Select a position from the chart to assign officers
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowOfficersModal(false);
                    setSelectedPosition("");
                    setSelectedVesselId("");
                  }}
                  className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="p-4 bg-white border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="font-semibold text-blue-800">
              How to Assign Officers
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">
                  Click "Assign Officer"
                </h4>
                <p className="text-sm text-gray-600">
                  On any empty officer cell to open available officers
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full">
                <span className="font-bold text-blue-600">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Call & Verify</h4>
                <p className="text-sm text-gray-600">
                  Use the call button to check officer availability
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full">
                <span className="font-bold text-blue-600">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Assign to Vessel</h4>
                <p className="text-sm text-gray-600">
                  Click assign to automatically fill the position
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VesselPlanningChart;
