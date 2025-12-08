import { useEffect, useState } from 'react';
import type { Candidate } from '../types';
import { apiService } from '../services/api';

export const useCandidates = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadCandidates();
    }, []);

    const loadCandidates = async () => {
        try {
            setLoading(true);
            const data = await apiService.getCandidates();
            setCandidates(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load candidates');
        } finally {
            setLoading(false);
        }
    };

    const updateCandidate = async (id: string, updates: Partial<Candidate>) => {
        try {
            const updated = await apiService.updateCandidate(id, updates);
            setCandidates(prev => prev.map(c => c.id === id ? updated : c));
            return updated;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update candidate');
            throw err;
        }
    };

    const createCandidate = async (candidateData: Omit<Candidate, 'id'>) => {
        try {
            const newCandidate = await apiService.createCandidate(candidateData);
            setCandidates(prev => [...prev, newCandidate]);
            return newCandidate;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create candidate');
            throw err;
        }
    };

    return {
        candidates,
        loading,
        error,
        updateCandidate,
        createCandidate,
        refresh: loadCandidates
    };
};