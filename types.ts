
export interface ClaimData {
  claimId: string;
  farmerName: string;
  cropType: string;
  region: string;
  claimedAmount: number;
  yieldLossPercentage: number;
  weatherAnomalyScore: number;
  previousClaims: number;
  status: 'Pending' | 'Flagged' | 'Approved' | 'Rejected';
}

export interface MetricData {
  name: string;
  value: number;
  fullMark: number;
}

export interface AssessmentResponse {
  fraudClassification: 'Genuine' | 'Fraudulent';
  riskScore: number;
  reasoning: string;
  confidence: number;
  recommendedAction: string;
}
