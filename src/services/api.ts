import type { Candidate, Document, Vessel, Interview, CallLog, DashboardMetrics } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

// Mock API service that simulates backend calls
export const apiService = {
    // Candidate endpoints
    async getCandidates(params?: any): Promise<Candidate[]> {
        const response = await fetch(`${API_BASE_URL}/candidates`);
        if (!response.ok) throw new Error('Failed to fetch candidates');
        return response.json();
    },

    async getCandidate(id: string): Promise<Candidate> {
        const response = await fetch(`${API_BASE_URL}/candidates/${id}`);
        if (!response.ok) throw new Error('Failed to fetch candidate');
        return response.json();
    },

    async updateCandidate(id: string, data: Partial<Candidate>): Promise<Candidate> {
        const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update candidate');
        return response.json();
    },

    async createCandidate(data: Omit<Candidate, 'id'>): Promise<Candidate> {
        const response = await fetch(`${API_BASE_URL}/candidates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create candidate');
        return response.json();
    },

    // Document endpoints
    async getDocuments(candidateId?: string): Promise<Document[]> {
        const url = candidateId
            ? `${API_BASE_URL}/documents?candidateId=${candidateId}`
            : `${API_BASE_URL}/documents`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch documents');
        return response.json();
    },

    async uploadDocument(file: File, candidateId: string, type: string): Promise<Document> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('candidateId', candidateId);
        formData.append('type', type);

        const response = await fetch(`${API_BASE_URL}/documents/upload`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('Failed to upload document');
        return response.json();
    },

    // Vessel endpoints
    async getVessels(): Promise<Vessel[]> {
        const response = await fetch(`${API_BASE_URL}/vessels`);
        if (!response.ok) throw new Error('Failed to fetch vessels');
        return response.json();
    },

    async getVessel(id: string): Promise<Vessel> {
        const response = await fetch(`${API_BASE_URL}/vessels/${id}`);
        if (!response.ok) throw new Error('Failed to fetch vessel');
        return response.json();
    },

    // Dashboard metrics
    async getDashboardMetrics(): Promise<DashboardMetrics> {
        const response = await fetch(`${API_BASE_URL}/dashboard/metrics`);
        if (!response.ok) throw new Error('Failed to fetch dashboard metrics');
        return response.json();
    },

    // Interview endpoints
    async getInterviews(): Promise<Interview[]> {
        const response = await fetch(`${API_BASE_URL}/interviews`);
        if (!response.ok) throw new Error('Failed to fetch interviews');
        return response.json();
    },

    async scheduleInterview(data: any): Promise<Interview> {
        const response = await fetch(`${API_BASE_URL}/interviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to schedule interview');
        return response.json();
    },

    // Call logs
    async getCallLogs(): Promise<CallLog[]> {
        const response = await fetch(`${API_BASE_URL}/call-logs`);
        if (!response.ok) throw new Error('Failed to fetch call logs');
        return response.json();
    },

    async logCall(data: Omit<CallLog, 'id'>): Promise<CallLog> {
        const response = await fetch(`${API_BASE_URL}/call-logs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to log call');
        return response.json();
    }
};

// Mock fetch implementation for development
const mockData = {
    candidates: [] as Candidate[],
    documents: [] as Document[],
    vessels: [] as Vessel[],
    interviews: [] as Interview[],
    callLogs: [] as CallLog[]
};

// Mock fetch implementation
const mockFetch = async (url: string, options?: RequestInit): Promise<Response> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay

    const path = url.replace(API_BASE_URL, '');

    if (path === '/candidates' && options?.method === 'GET') {
        return new Response(JSON.stringify(mockData.candidates), { status: 200 });
    }

    if (path.startsWith('/candidates/') && options?.method === 'PATCH') {
        const id = path.split('/')[2];
        const updates = JSON.parse(options.body as string);
        const candidate = mockData.candidates.find(c => c.id === id);
        if (candidate) {
            Object.assign(candidate, updates);
            return new Response(JSON.stringify(candidate), { status: 200 });
        }
        return new Response(null, { status: 404 });
    }

    if (path === '/dashboard/metrics') {
        const metrics: DashboardMetrics = {
            totalCandidates: mockData.candidates.length,
            sourcedToday: mockData.candidates.filter(c =>
                new Date(c.dateApplied).toDateString() === new Date().toDateString()
            ).length,
            expiringDocuments: 23,
            rosterAlerts: 8,
            openPositions: 15,
            candidatesInReview: mockData.candidates.filter(c => c.status === 'In Review').length,
            deploymentPending: mockData.candidates.filter(c => c.status === 'Approved').length
        };
        return new Response(JSON.stringify(metrics), { status: 200 });
    }

    return new Response(null, { status: 404 });
};

// Override fetch for development
if (process.env.NODE_ENV === 'development') {
    window.fetch = mockFetch as any;
}