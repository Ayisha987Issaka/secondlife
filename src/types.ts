export type LifecycleStatus = 'reusable' | 'repairable' | 'upcyclable' | 'recyclable' | 'disposable';

export type UserGoal = 'money' | 'create' | 'home' | 'donate' | 'recycle';

export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export interface UpcycleIdea {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeRequired: string;
  materialsNeeded: string[];
  steps: string[];
  category: 'Home & Garden' | 'Furniture' | 'Art & Decor' | 'Utility & Storage' | 'Fashion & Accessories' | 'Kids & Play';
  ghanaRelevance?: string;
  potentialEarningsGHS?: string;
}

export interface TargetOrganization {
  type: string;
  suitability: string;
  ghanaExamples: string;
  contactAdvice: string;
}

export interface ResaleDetails {
  hasResaleValue: boolean;
  productTitle: string;
  marketplaceDescription: string;
  conditionGrade: string;
  suggestedPriceGHS: { min: number; max: number };
  suggestedPriceUSD: { min: number; max: number };
  priceDisclaimer?: string;
  keywords: string[];
  recommendedPlatforms: string[];
  listingTips: string[];
}

export interface RepairDetails {
  possibleDamage: string;
  repairFeasibility: 'Easy' | 'Moderate' | 'Advanced' | 'Professional Only';
  toolsAndMaterials: string[];
  estimatedTime: string;
  estimatedCostGHS: string;
  repairSteps: string[];
  safetyPrecautions: string[];
}

export interface DonationDetails {
  isDonatable: boolean;
  targetOrganizations: TargetOrganization[];
  preparationTips: string[];
}

export interface RecyclingDetails {
  materialType: string;
  recyclingCategory: string;
  recyclabilityRating: 'High' | 'Moderate' | 'Specialized Facility Required' | 'Not Recyclable';
  preparationSteps: string[];
  disposalAndRecyclingOptions: string[];
  ghanaEcosystemNotes: string;
}

export interface EnvironmentalImpact {
  hasVerifiedData?: boolean;
  qualitativeImpact?: string;
  impactExplanation: string;
  circularEconomyPrinciple: string;
  dataSourceOrMethodology?: string;
  wasteDivertedKg?: number | null;
  co2SavedKg?: number | null;
  waterSavedLiters?: number | null;
}

export interface SafetyAssessment {
  overallRisk: 'Low Risk' | 'Caution Required' | 'High Risk / Hazardous';
  hazardsDetected: string[];
  foodContactWarning?: string;
  safeHandlingAdvice: string[];
  isHazardousDisposalRecommended?: boolean;
}

export interface GoalRecommendation {
  goal: UserGoal;
  headline: string;
  summary: string;
  actionSteps: string[];
  highlightedBenefit: string;
  resourceLinksOrTips: string[];
}

export interface ObjectAnalysis {
  id: string;
  timestamp: number;
  itemName: string;
  objectCategory: string;
  primaryMaterial: string;
  allMaterials: string[];
  lifecycleStatus: LifecycleStatus;
  conditionAssessment: string;
  confidence: ConfidenceLevel;
  confidenceNote?: string;
  safetyAssessment: SafetyAssessment;
  imageUrl?: string;
  sourceType?: 'demo' | 'user_upload' | 'text_prompt';
  ghanaContextNotes: string;
  
  // 7 Core features
  repair: RepairDetails;
  upcycleIdeas: UpcycleIdea[];
  resell: ResaleDetails;
  donate: DonationDetails;
  recycle: RecyclingDetails;
  environmentalImpact: EnvironmentalImpact;
  
  // Goal-driven recommendations
  goalRecommendations: Record<UserGoal, GoalRecommendation>;

  // Resilient fallback indicators
  isHighDemandFallback?: boolean;
  highDemandNotice?: string;
  userNotes?: string;
}

export interface GhanaPresetItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  localNickname?: string;
  thumbnail: string;
  sampleAnalysis: ObjectAnalysis;
}
