
import React from 'react';

export const COLORS = {
  primary: '#166534', // Green-800
  secondary: '#3b82f6', // Blue-500
  warning: '#f59e0b', // Amber-500
  danger: '#ef4444', // Red-500
  background: '#f8fafc',
};

export const SECTIONS = [
  { id: 'overview', title: 'Overview' },
  { id: 'solutions', title: 'Solutions' },
  { id: 'tech-stack', title: 'Tech Stack' },
  { id: 'workflow', title: 'Workflow' },
  { id: 'simulator', title: 'Fraud Simulator' },
  { id: 'metrics', title: 'Model Metrics' }
];

export const MOCK_CLAIMS: any[] = [
  { claimId: 'CLM001', farmerName: 'John Doe', cropType: 'Wheat', region: 'Midwest', claimedAmount: 12000, yieldLossPercentage: 85, weatherAnomalyScore: 0.2, previousClaims: 0, status: 'Approved' },
  { claimId: 'CLM002', farmerName: 'Alice Smith', cropType: 'Corn', region: 'Central Valley', claimedAmount: 45000, yieldLossPercentage: 95, weatherAnomalyScore: 0.1, previousClaims: 4, status: 'Flagged' },
  { claimId: 'CLM003', farmerName: 'Bob Johnson', cropType: 'Soybeans', region: 'Southern Delta', claimedAmount: 8000, yieldLossPercentage: 30, weatherAnomalyScore: 0.9, previousClaims: 1, status: 'Pending' },
];

export const PERFORMANCE_METRICS = [
  { name: 'Accuracy', value: 94, fullMark: 100 },
  { name: 'Precision', value: 92, fullMark: 100 },
  { name: 'Recall', value: 89, fullMark: 100 },
  { name: 'F1-Score', value: 91, fullMark: 100 },
  { name: 'ROC-AUC', value: 96, fullMark: 100 },
];
