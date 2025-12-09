import { Plus, Calendar, Ship } from "lucide-react";
import type {
  PositionConfig,
  PositionKey,
  Vessel,
  VesselCardProps,
} from "../types/type";

const CrewPlanningSheet = () => {
  // 🔹 Correct TS typed state (uncomment when needed)
  // const [selectedCell, setSelectedCell] = useState<{
  //   vesselId: number;
  //   section: "feb" | "mar";
  //   position: PositionKey;
  //   field: "csd" | "ced";
  // } | null>(null);

  const positions: PositionConfig[] = [
    { key: "master", label: "MASTER", color: "bg-blue-50" },
    { key: "dlo", label: "DLO OFFICER", color: "bg-yellow-50" },
    { key: "officer1", label: "1ST OFFICER", color: "bg-white" },
    { key: "ch", label: "CH ENGINEER", color: "bg-blue-50" },
    { key: "eng2", label: "2ND ENGINEER", color: "bg-white" },
    { key: "eto", label: "ETO", color: "bg-white" },
  ];

  const vessels: Vessel[] = [
    {
      id: 1,
      name: "DHT JAGUAR",
      subtext: "IMAN BW 7569MEL JRO2021 - HKG",
      schedule: "Galle Dry Docks 25th Jan",
      feb: {
        master: { csd: "Bapuditya Bose [ex]", ced: "" },
        dlo: { csd: "Tarun Mehta [ex]", ced: "" },
        officer1: { csd: "", ced: "" },
        ch: { csd: "Sreekant Vijayan [ex]", ced: "" },
        eng2: { csd: "Chetan Dhondekar [ex]", ced: "" },
        eto: { csd: "Gurjit Sandhu [ex]", ced: "" },
      },
      remark: "DRY DOCKS 24TH JAN",
      nextVessel: "DHT HARRIER IMAN",
      nextSchedule: "Kizomba 20th Jan",
      mar: {
        master: { csd: "Suresh Kandath [ex]", ced: "" },
        dlo: { csd: "", ced: "" },
      },
      dates: {
        feb: {
          master: ["13/Oct/22", "12/Feb/23"],
          dlo: ["28/Nov/22", "28/Mar/23"],
          ch: ["19/Oct/22", "18/Feb/23"],
          eng2: ["13/Oct/22", "12/Feb/23"],
          eto: ["22/Aug/22", "21/Feb/23"],
        },
      },
      additional: {
        master: "AJAY YADAV [EX]",
        dlo: "SUBHAS SOMAN PILLAI [EX]",
        ch: "RAJU PETER GEORGE [EX]",
        eng2: "PRASHANT GARCHA [EX]",
        eto: "NAVEEN RAJ [EX]",
      },
    },
    {
      id: 2,
      name: "DHT LOKI",
      subtext: "IMAN BW 7569MEL JRO2021-HKG",
      schedule: "Corpus Christi 14th Feb",
      feb: {
        master: { csd: "AJAY YADAV [EX]", ced: "" },
        dlo: { csd: "Deepak Salunkhe [ex]", ced: "Vikas Malhotra [ex]" },
        officer1: { csd: "SUBHAS SOMAN PILLAI [EX]", ced: "" },
        ch: { csd: "Sachin Naik [ex]", ced: "Sudhir Salunke [ex]" },
        eng2: { csd: "RAJU PETER GEORGE [EX]", ced: "PRASHANT GARCHA [EX]" },
        eto: { csd: "BRUNO FIGUEIREDO [EX]", ced: "Aditya Mahla [ex]" },
      },
      remark: "",
      nextVessel: "DHT OSPREY IMAN",
      nextSchedule: "USA 19TH MAR",
      mar: {
        master: { csd: "NAVEEN RAJ [EX]", ced: "" },
        dlo: { csd: "Shashwat Sahai [ex]", ced: "" },
      },
      dates: {
        feb: {
          master: ["24/Nov/22", "23/Mar/23"],
          dlo: ["18/Jan/23", "17/May/23"],
          ch: ["15/Dec/22", "14/Apr/23"],
          eng2: ["27/Dec/22", "26/Apr/23"],
          eto: ["18/Jan/23", "17/Jun/23"],
        },
      },
      additional: {
        master: "CLIFFORD MENEZES [EX]",
        dlo: "",
        ch: "",
        eng2: "",
        eto: "",
      },
    },
    {
      id: 3,
      name: "DHT LEOPARD",
      subtext: "IMAN BW 7456MEL JRO2021 - HKG",
      schedule: "Galle 20th Jan",
      feb: {
        master: { csd: "Parimal Bhowmic [ex]", ced: "" },
        dlo: { csd: "C.K.Pandey [ex]", ced: "" },
        officer1: { csd: "", ced: "" },
        ch: { csd: "Narasimhan Uppilli [ex]", ced: "" },
        eng2: { csd: "Frank Gomes [ex]", ced: "" },
        eto: { csd: "Parimal Nijai [ex]", ced: "" },
      },
      remark: "",
      nextVessel: "DHT SCANDINAVIA",
      nextSchedule: "Sriracha 27th Jan",
      mar: {
        master: { csd: "Parasog Kale [ex]", ced: "" },
        dlo: { csd: "", ced: "" },
      },
      dates: {
        feb: {
          master: ["24/Oct/22", "23/Feb/23"],
          dlo: ["15/Jan/23", "14/May/23"],
          ch: ["17/Oct/22", "18/Feb/23"],
          eng2: ["15/Jan/23", "14/May/23"],
          eto: ["15/Jan/23", "14/Jun/23"],
        },
      },
      additional: {
        master: "LUQUE FERNANDES [EX]",
        dlo: "",
        ch: "TRILOCHAN NAYAK [EX]",
        eng2: "",
        eto: "",
      },
    },
    {
      id: 4,
      name: "DHT PANTHER",
      subtext: "IMAN BW 7456MEL JRO2021 - HKG",
      schedule: "China 16th Feb - Eid",
      feb: {
        master: { csd: "Alok Prashant Singh [ex]", ced: "" },
        dlo: { csd: "Vishvendra Gaharwar [ex]", ced: "" },
        officer1: { csd: "", ced: "" },
        ch: { csd: "Nitin Pakanti [ex]", ced: "" },
        eng2: { csd: "Tejinder Panesar [ex]", ced: "" },
        eto: { csd: "Jai Prakash [ex]", ced: "" },
      },
      remark: "",
      nextVessel: "DHT BAUHINIA",
      nextSchedule: "Singapore 15th Jan",
      mar: {
        master: { csd: "", ced: "" },
        dlo: { csd: "", ced: "" },
      },
      dates: {
        feb: {
          master: ["25/Sep/22", "24/Jan/23"],
          dlo: ["13/Sep/22", "12/Jan/23"],
          ch: ["13/Sep/22", "12/Jan/23"],
          eng2: ["25/Sep/22", "24/Jan/23"],
          eto: ["25/Sep/22", "24/Mar/23"],
        },
      },
      additional: {
        master: "MANPREET DHALIWAL [EX]",
        dlo: "AMIT RATAN PAUL [EX]",
        ch: "NEVYN VALADARES [EX]",
        eng2: "AMOL GHULE [EX]",
        eto: "VIVEK SHUKLA [EX]",
      },
    },
    {
      id: 5,
      name: "PUHA",
      subtext: "IMAN BW 7456MEL JRO - HKG",
      schedule: "Singapore 24th Jan",
      feb: {
        master: { csd: "Atul Divrekar [ex]", ced: "" },
        dlo: { csd: "Birendra Chaudhary [ex]", ced: "" },
        officer1: { csd: "", ced: "" },
        ch: { csd: "Satya Patiparla [ex]", ced: "" },
        eng2: { csd: "Viraspin [ex]", ced: "" },
        eto: { csd: "Prince [ex]", ced: "" },
      },
      remark: "",
      nextVessel: "DHT OPAL",
      nextSchedule: "Korea Eid 25th Jan",
      mar: {
        master: { csd: "Nisheeth [ex]", ced: "" },
        dlo: { csd: "", ced: "" },
      },
      dates: {
        feb: {
          master: ["5/Sep/22", "4/Jan/23"],
          dlo: ["30/Oct/22", "29-Feb-23"],
          ch: ["12/Sep/22", "11/Jan/23"],
          eng2: ["5/Sep/22", "4/Jan/23"],
          eto: ["5/Sep/22", "4/Feb/23"],
        },
      },
      additional: {
        master: "SRINIVAS VALLURI [EX]",
        dlo: "SHEKAR PUNJA [EX]",
        ch: "ARJUN MOHANRAO [EX]",
        eng2: "SUMIT VYAS [EX]",
        eto: "KULBIR VERMA [EX]",
      },
    },
    {
      id: 6,
      name: "TIGER",
      subtext: "IMAN BW 7456MEL JRO2021 - HKG",
      schedule: "Singapore 29th Jan",
      feb: {
        master: { csd: "Ankur Devgun [ex]", ced: "" },
        dlo: { csd: "Sumit Shanbhag [ex]", ced: "" },
        officer1: { csd: "", ced: "" },
        ch: { csd: "Ashish Auti [ex]", ced: "" },
        eng2: { csd: "Manish Raul [ex]", ced: "" },
        eto: { csd: "Gurmeet Singh [ex]", ced: "" },
      },
      remark: "",
      nextVessel: "DHT PEONY",
      nextSchedule: "Brazil 18th Jan",
      mar: {
        master: { csd: "Anurag Mishra [ex]", ced: "" },
        dlo: { csd: "", ced: "" },
      },
      dates: {
        feb: {
          master: ["28/Nov/22", "27/Mar/23"],
          dlo: ["16/Jan/23", "15/May/23"],
          ch: ["16/Jan/23", "15/May/23"],
          eng2: ["28/Nov/22", "27/Mar/23"],
          eto: ["28/Nov/22", "27/Apr/23"],
        },
      },
      additional: {
        master: "RICHARD PATIAL [EX]",
        dlo: "",
        ch: "",
        eng2: "",
        eto: "MERICK ROSARIO [EX]",
      },
    },
    {
      id: 7,
      name: "DHT STALLION",
      subtext: "IMAN BW 7456MEL C2 JL FURUNO HKG",
      schedule: "Rio D Janeiro 24TH Jan",
      feb: {
        master: { csd: "Vishal Kant [ex] EXT APRIL", ced: "" },
        dlo: { csd: "Nabil Khot [ex]", ced: "" },
        officer1: { csd: "", ced: "" },
        ch: { csd: "Sachin Dhamal [ex]", ced: "" },
        eng2: { csd: "Ashish Lochan [ex]", ced: "" },
        eto: { csd: "Mohis Man Singh [ex]", ced: "" },
      },
      remark: "PETROIBRAS",
      nextVessel: "DHT LOTUS (HULZEN) MARS - HKG",
      nextSchedule: "San Diego 15th Jan",
      mar: {
        master: { csd: "Mukesh Kumar [ex]", ced: "" },
        dlo: { csd: "", ced: "" },
      },
      dates: {
        feb: {
          master: ["5/Sep/22", "4/Apr/23"],
          dlo: ["30/Oct/22", "29-Feb-23"],
          ch: ["30/Oct/22", "29-Feb-23"],
          eng2: ["26/Nov/22", "26/Mar/23"],
          eto: ["26/Nov/22", "25/Apr/23"],
        },
      },
      additional: {
        master: "NOBLE PEREIRA [EX]",
        dlo: "ASHISH JANGIR [EX]",
        ch: "SUSHIR DEVARAKONDA [EX]",
        eng2: "",
        eto: "VINOD YADAV [EX]",
      },
    },
    {
      id: 8,
      name: "DHT REDWOOD",
      subtext: "IMAN BW 7456MEL - HKG",
      schedule: "Zhoushan 24th Jan",
      feb: {
        master: { csd: "Vara Prasad Bandaru [ex]", ced: "" },
        dlo: { csd: "Jatendra Kumar [ex]", ced: "" },
        officer1: { csd: "", ced: "" },
        ch: { csd: "Rajiv Gandhi [ex]", ced: "" },
        eng2: { csd: "Neil Mendonsa [ex]", ced: "" },
        eto: { csd: "Harsh Verma [ex]", ced: "" },
      },
      remark: "PETROIBRAS",
      nextVessel: "",
      nextSchedule: "",
      mar: {
        master: { csd: "", ced: "" },
        dlo: { csd: "", ced: "" },
      },
      dates: {
        feb: {
          master: [],
          dlo: [],
          ch: [],
          eng2: [],
          eto: [],
        },
      },
      additional: {
        master: "",
        dlo: "",
        ch: "",
        eng2: "",
        eto: "",
      },
    },
  ];

  const handleAddClick = (
    vesselId: number,
    section: "feb" | "mar",
    position: PositionKey,
    field: "csd" | "ced"
  ) => {
    console.log("Add crew to:", { vesselId, section, position, field });
  };

  /** -----------------------------------
   **  VESSEL CARD — FIXED + TYPESAFE
   ** ----------------------------------- */
  const VesselCard = ({ vessel }: VesselCardProps) => (
    <div className="overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-xl">
      {/* Header */}
      <div className="p-4 text-white bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Ship className="w-5 h-5" />
              <h3 className="text-lg font-bold">{vessel.name}</h3>
            </div>
            <p className="text-xs text-blue-100">{vessel.subtext}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 mt-3 text-sm rounded-lg bg-blue-800/30">
          <Calendar className="w-4 h-4" />
          <span>{vessel.schedule}</span>
        </div>
      </div>

      {vessel.remark && (
        <div className="px-4 py-2 text-xs font-semibold text-center text-white bg-red-500">
          ⚠️ {vessel.remark}
        </div>
      )}

      {/* Crew Grid — fixed safe indexing */}
      <div className="p-4 space-y-3">
        {positions.map((pos) => {
          const data = vessel.feb?.[pos.key]; // safe access
          if (!data) return null;

          return (
            <div
              key={pos.key}
              className={`${pos.color} rounded-lg p-3 border-2 border-gray-200 hover:border-blue-300 transition`}
            >
              {/* Row header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-700">
                  {pos.label}
                </span>

                {vessel.dates?.feb?.[pos.key]?.length ? (
                  <div className="flex gap-1">
                    {vessel.dates.feb[pos.key]!.map((date, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {date}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* CSD / CED Fields */}
              <div className="grid grid-cols-2 gap-2">
                {/* CSD */}
                <div>
                  <div className="text-[10px] text-gray-500 mb-1 font-medium">
                    CSD
                  </div>
                  {data.csd ? (
                    <div className="text-xs bg-white p-2 rounded border border-gray-300 min-h-[44px] flex items-center">
                      {data.csd}
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        handleAddClick(vessel.id, "feb", pos.key, "csd")
                      }
                      className="w-full bg-white p-2 rounded border-2 border-dashed border-gray-300 hover:bg-blue-50 flex items-center justify-center min-h-[44px]"
                    >
                      <Plus className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>

                {/* CED */}
                <div>
                  <div className="text-[10px] text-gray-500 mb-1 font-medium">
                    CED
                  </div>
                  {data.ced ? (
                    <div className="text-xs bg-white p-2 rounded border border-gray-300 min-h-[44px] flex items-center">
                      {data.ced}
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        handleAddClick(vessel.id, "feb", pos.key, "ced")
                      }
                      className="w-full bg-white p-2 rounded border-2 border-dashed border-gray-300 hover:bg-blue-50 flex items-center justify-center min-h-[44px]"
                    >
                      <Plus className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Additional Crew */}
              {vessel.additional?.[pos.key] && (
                <div className="mt-2 text-[10px] text-gray-600 bg-gray-100 p-2 rounded">
                  <strong>Additional:</strong> {vessel.additional[pos.key]}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {vessel.nextVessel && (
        <div className="p-4 border-t bg-gray-50">
          <div className="mb-1 text-xs font-medium text-gray-500">
            Next Assignment
          </div>
          <div className="mb-1 text-sm font-bold text-blue-600">
            {vessel.nextVessel}
          </div>
          {vessel.nextSchedule && (
            <div className="text-xs text-gray-600">{vessel.nextSchedule}</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      {/* <div className="sticky top-0 z-30 text-white shadow-lg bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-[2000px] mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="hidden p-2 bg-green-600 rounded-lg sm:block">
                <X className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold">CREW CHANGE PLANNING</h1>
                <p className="text-xs text-gray-300">February - April 2023</p>
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-700">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div> */}

      {/* GRID */}
      <div className="max-w-[2000px] mx-auto p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {vessels.map((v) => (
            <VesselCard key={v.id} vessel={v} />
          ))}
        </div>
      </div>

      {/* FOOTER TABS */}
      {/* <div className="max-w-[2000px] mx-auto p-6">
        <div className="flex flex-wrap gap-2 p-4 text-xs bg-white shadow-md rounded-xl">
          <button className="px-4 py-2 text-white bg-red-600 rounded-lg">
            Senior Officers - VLCCs
          </button>
          <button className="px-4 py-2 text-white bg-gray-600 rounded-lg">
            Junior Officers - VLCCs
          </button>
          <button className="px-4 py-2 text-white bg-gray-600 rounded-lg">
            AFR-SUEZ-MR
          </button>
          <button className="px-4 py-2 text-white bg-gray-600 rounded-lg">
            BULK SR-JR
          </button>
          <button className="px-4 py-2 text-white bg-gray-600 rounded-lg">
            BLANK1
          </button>
          <button className="px-4 py-2 text-white bg-gray-600 rounded-lg">
            BLANK2
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default CrewPlanningSheet;
