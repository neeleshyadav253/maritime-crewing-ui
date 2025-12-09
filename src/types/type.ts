export type CrewRole = {
    csd: string;
    ced: string;
};

export type PositionKey = "master" | "dlo" | "officer1" | "ch" | "eng2" | "eto";

// Stores CSD/CED crew in Feb/Mar etc
export type MonthCrew = {
    [key in PositionKey]?: CrewRole;
};

// Stores date ranges per crew role
export type MonthDates = {
    [key in PositionKey]?: string[];
};

// Additional standby/relievers
export type AdditionalCrew = {
    [key in PositionKey]?: string;
};

export interface VesselCardProps {
    vessel: Vessel;
}

export interface Vessel {
    id: number;
    name: string;
    subtext: string;
    schedule: string;
    remark?: string;
    nextVessel?: string;
    nextSchedule?: string;

    feb: MonthCrew;
    mar?: MonthCrew;

    dates?: {
        feb?: MonthDates;
        mar?: MonthDates;
    };

    additional?: AdditionalCrew;
}

export interface PositionConfig {
    key: PositionKey;
    label: string;
    color: string;
}
