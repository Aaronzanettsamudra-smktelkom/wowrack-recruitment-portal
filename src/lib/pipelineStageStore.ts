import { useSyncExternalStore } from 'react';

export interface PipelineStageConfig {
  key: string;
  label: string;
  color: string;
}

const STAGE_COLORS = [
  'bg-blue-500', 'bg-purple-500', 'bg-indigo-500', 'bg-cyan-500',
  'bg-teal-500', 'bg-amber-500', 'bg-pink-500', 'bg-orange-500',
  'bg-lime-500', 'bg-sky-500',
];

const DEFAULT_STAGES: PipelineStageConfig[] = [
  { key: 'applied', label: 'Applied', color: 'bg-blue-500' },
  { key: 'selected', label: 'Selected', color: 'bg-purple-500' },
  { key: 'contacted', label: 'Contacted', color: 'bg-indigo-500' },
  { key: 'hr-interview', label: 'HR Interview', color: 'bg-cyan-500' },
  { key: 'user-interview', label: 'User Interview', color: 'bg-teal-500' },
  { key: 'salary-negotiation', label: 'Salary Negotiation', color: 'bg-amber-500' },
  { key: 'hired', label: 'Hired', color: 'bg-green-500' },
  { key: 'rejected', label: 'Rejected', color: 'bg-red-500' },
];

// Fixed stages that cannot be removed
export const FIXED_STAGES = ['applied', 'hired', 'rejected'];

let stages: PipelineStageConfig[] = [...DEFAULT_STAGES];
let listeners: Set<() => void> = new Set();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return stages;
}

export function setStages(newStages: PipelineStageConfig[]) {
  stages = newStages;
  emit();
}

export function getNextColor(existingStages: PipelineStageConfig[]): string {
  const usedColors = new Set(existingStages.map((s) => s.color));
  return STAGE_COLORS.find((c) => !usedColors.has(c)) || STAGE_COLORS[0];
}

export function labelToKey(label: string): string {
  return label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function usePipelineStages() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
