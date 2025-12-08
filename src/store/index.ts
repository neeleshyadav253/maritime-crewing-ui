import { create } from 'zustand';
import type {
    Candidate,
    Document,
    Vessel,
    DashboardMetrics,
    PositionRequirement
} from '../types';
import {
    mockCandidates,
    mockDocuments,
    mockVessels,
    initialMetrics
} from '../services/mockData';

interface CandidateStore {
    candidates: Candidate[];
    selectedCandidate: Candidate | null;
    filters: {
        rank: string;
        status: string;
        source: string;
    };
    setCandidates: (candidates: Candidate[]) => void;
    setSelectedCandidate: (candidate: Candidate | null) => void;
    updateCandidate: (id: string, updates: Partial<Candidate>) => void;
    addCandidate: (candidate: Candidate) => void;
    setFilters: (filters: Partial<CandidateStore['filters']>) => void;
    getFilteredCandidates: () => Candidate[];
}

interface DocumentStore {
    documents: Document[];
    updateDocumentStatus: (id: string, status: Document['status']) => void;
    addDocument: (document: Document) => void;
}

interface VesselStore {
    vessels: Vessel[];
    selectedVessel: Vessel | null;
    setSelectedVessel: (vessel: Vessel | null) => void;
    updatePosition: (vesselId: string, position: PositionRequirement) => void;
}

interface DashboardStore {
    metrics: DashboardMetrics;
    updateMetrics: () => void;
}

export const useCandidateStore = create<CandidateStore>((set, get) => ({
    candidates: mockCandidates,
    selectedCandidate: null,
    filters: {
        rank: '',
        status: '',
        source: ''
    },
    setCandidates: (candidates) => set({ candidates }),
    setSelectedCandidate: (candidate) => set({ selectedCandidate: candidate }),
    updateCandidate: (id, updates) => set((state) => ({
        candidates: state.candidates.map(c =>
            c.id === id ? { ...c, ...updates, lastUpdated: new Date().toISOString() } : c
        )
    })),
    addCandidate: (candidate) => set((state) => ({
        candidates: [...state.candidates, candidate]
    })),
    setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
    })),
    getFilteredCandidates: () => {
        const { candidates, filters } = get();
        return candidates.filter(candidate => {
            if (filters.rank && candidate.rank !== filters.rank) return false;
            if (filters.status && candidate.status !== filters.status) return false;
            if (filters.source && candidate.source !== filters.source) return false;
            return true;
        });
    }
}));

export const useDocumentStore = create<DocumentStore>(() => ({
    documents: mockDocuments,
    updateDocumentStatus: (id, status) => {
        // Implementation would go here
        console.log('Update document status:', id, status);
    },
    addDocument: (document) => {
        // Implementation would go here
        console.log('Add document:', document);
    }
}));

export const useVesselStore = create<VesselStore>((set) => ({
    vessels: mockVessels,
    selectedVessel: null,
    setSelectedVessel: (vessel) => set({ selectedVessel: vessel }),
    updatePosition: (vesselId, position) => {
        // Implementation would go here
        console.log('Update position:', vesselId, position);
    }
}));

export const useDashboardStore = create<DashboardStore>(() => ({
    metrics: initialMetrics,
    updateMetrics: () => {
        // Implementation would go here
        console.log('Update metrics');
    }
}));