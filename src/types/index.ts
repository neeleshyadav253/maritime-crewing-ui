export interface Candidate {
    id: string;
    firstName: string;
    lastName: string;
    rank: 'Captain' | 'Chief Officer' | 'Second Officer' | 'Third Officer' | 'Chief Engineer' | 'Second Engineer' | 'Third Engineer' | 'Rating' | 'Deck Cadet' | 'Engine Cadet';
    email: string;
    phone: string;
    nationality: string;
    status: 'New' | 'In Review' | 'Approved' | 'Rejected' | 'On Hold' | 'Available' | 'Onboard' | 'On Leave';
    source: 'Portal' | 'Direct Application' | 'Agent' | 'Reference' | 'Database';
    dateApplied: string;
    lastUpdated: string;
    documentStatus: 'Complete' | 'Pending' | 'Expired';
    medicalStatus: 'Valid' | 'Expiring' | 'Expired';
    availabilityDate: string;
}

export interface Document {
    id: string;
    candidateId: string;
    type: 'COC' | 'GMDSS' | 'Medical Certificate' | 'Passport' | 'Visa' | 'SEA' | 'STCW' | 'Vaccination';
    name: string;
    fileUrl: string;
    expiryDate: string;
    status: 'Valid' | 'Expired' | 'Pending Renewal' | 'Under Review';
    uploadedDate: string;
}

export interface Appraisal {
    id: string;
    candidateId: string;
    vesselId: string;
    date: string;
    performance: number;
    remarks: string;
    reviewer: string;
    recommendations: string[];
}

export interface Vessel {
    id: string;
    name: string;
    type: 'Container' | 'Tanker' | 'Bulk Carrier' | 'LNG' | 'Offshore' | 'Passenger';
    imo: string;
    company: string;
    nextPort: string;
    eta: string;
    etd: string;
    requiredPositions: PositionRequirement[];
    currentCrew: CrewAssignment[];
}

export interface PositionRequirement {
    rank: Candidate['rank'];
    requiredBy: string;
    status: 'Open' | 'Filled' | 'Pending Joining';
}

export interface CrewAssignment {
    candidateId: string;
    rank: Candidate['rank'];
    joiningDate: string;
    signOffDate: string;
}

export interface Interview {
    id: string;
    candidateId: string;
    type: 'Technical' | 'HR' | 'Final' | 'Reference Check';
    date: string;
    interviewer: string;
    result: 'Passed' | 'Failed' | 'Pending' | 'Rescheduled';
    remarks: string;
    nextSteps: string;
}

export interface CallLog {
    id: string;
    candidateId: string;
    date: string;
    duration: string;
    agent: string;
    outcome: 'Contacted' | 'No Answer' | 'Call Back' | 'Not Interested';
    notes: string;
}

export interface DashboardMetrics {
    totalCandidates: number;
    sourcedToday: number;
    expiringDocuments: number;
    rosterAlerts: number;
    openPositions: number;
    candidatesInReview: number;
    deploymentPending: number;
}

// Re-export types that might be used elsewhere