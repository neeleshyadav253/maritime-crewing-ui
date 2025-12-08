import type {
    Candidate,
    Document,
    Vessel,
    Interview,
    CallLog,
    DashboardMetrics,
    PositionRequirement,
    CrewAssignment
} from '../types';

export const mockCandidates: Candidate[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Smith',
        rank: 'Captain',
        email: 'john.smith@email.com',
        phone: '+1 234 567 8900',
        nationality: 'British',
        status: 'Available',
        source: 'Portal',
        dateApplied: '2024-01-15',
        lastUpdated: '2024-01-20',
        documentStatus: 'Complete',
        medicalStatus: 'Valid',
        availabilityDate: '2024-02-01'
    },
    {
        id: '2',
        firstName: 'Maria',
        lastName: 'Garcia',
        rank: 'Chief Engineer',
        email: 'maria.g@email.com',
        phone: '+34 123 456 789',
        nationality: 'Spanish',
        status: 'Onboard',
        source: 'Agent',
        dateApplied: '2024-01-10',
        lastUpdated: '2024-01-18',
        documentStatus: 'Pending',
        medicalStatus: 'Expiring',
        availabilityDate: '2024-03-15'
    },
    {
        id: '3',
        firstName: 'Raj',
        lastName: 'Patel',
        rank: 'Second Officer',
        email: 'raj.patel@email.com',
        phone: '+91 98765 43210',
        nationality: 'Indian',
        status: 'In Review',
        source: 'Direct Application',
        dateApplied: '2024-01-20',
        lastUpdated: '2024-01-20',
        documentStatus: 'Pending',
        medicalStatus: 'Valid',
        availabilityDate: '2024-02-10'
    },
    {
        id: '4',
        firstName: 'Anna',
        lastName: 'Kowalski',
        rank: 'Rating',
        email: 'anna.k@email.com',
        phone: '+48 123 456 789',
        nationality: 'Polish',
        status: 'Available',
        source: 'Reference',
        dateApplied: '2024-01-05',
        lastUpdated: '2024-01-15',
        documentStatus: 'Complete',
        medicalStatus: 'Valid',
        availabilityDate: '2024-01-25'
    }
];

export const mockDocuments: Document[] = [
    {
        id: '1',
        candidateId: '1',
        type: 'COC',
        name: 'Master Mariner Certificate',
        fileUrl: '/docs/coc_1.pdf',
        expiryDate: '2025-12-31',
        status: 'Valid',
        uploadedDate: '2023-01-15'
    },
    {
        id: '2',
        candidateId: '1',
        type: 'Medical Certificate',
        name: 'MLC Medical Certificate',
        fileUrl: '/docs/medical_1.pdf',
        expiryDate: '2024-06-30',
        status: 'Valid',
        uploadedDate: '2024-01-10'
    }
];

export const mockVessels: Vessel[] = [
    {
        id: 'v1',
        name: 'MS Atlantic Star',
        type: 'Container',
        imo: '9876543',
        company: 'Oceanic Lines',
        nextPort: 'Rotterdam',
        eta: '2024-01-25',
        etd: '2024-01-28',
        requiredPositions: [
            { rank: 'Second Officer', requiredBy: '2024-02-15', status: 'Open' } as PositionRequirement,
            { rank: 'Rating', requiredBy: '2024-02-01', status: 'Open' } as PositionRequirement
        ],
        currentCrew: [
            { candidateId: '1', rank: 'Captain', joiningDate: '2024-01-01', signOffDate: '2024-04-01' } as CrewAssignment
        ]
    },
    {
        id: 'v2',
        name: 'Tanker Prosperity',
        type: 'Tanker',
        imo: '1234567',
        company: 'Global Tankers',
        nextPort: 'Singapore',
        eta: '2024-01-30',
        etd: '2024-02-02',
        requiredPositions: [
            { rank: 'Chief Engineer', requiredBy: '2024-03-01', status: 'Open' } as PositionRequirement
        ],
        currentCrew: []
    }
];

export const mockInterviews: Interview[] = [
    {
        id: 'i1',
        candidateId: '3',
        type: 'Technical',
        date: '2024-01-22',
        interviewer: 'Capt. James Wilson',
        result: 'Passed',
        remarks: 'Excellent knowledge of navigation systems',
        nextSteps: 'Forward to HR for final interview'
    }
];

export const mockCallLogs: CallLog[] = [
    {
        id: 'c1',
        candidateId: '4',
        date: '2024-01-20',
        duration: '15:30',
        agent: 'Sarah Johnson',
        outcome: 'Contacted',
        notes: 'Candidate confirmed availability for February deployment'
    }
];

export const initialMetrics: DashboardMetrics = {
    totalCandidates: 156,
    sourcedToday: 12,
    expiringDocuments: 23,
    rosterAlerts: 8,
    openPositions: 15,
    candidatesInReview: 28,
    deploymentPending: 7
};