export type Step = 1 | 2 | 3;

export type OSPlatform = 'ios' | 'android';

export interface EdgeCase {
  id: string;
  title: string;
  category: 'hardware' | 'identity' | 'security' | 'lifecycle' | 'fraud';
  triggerLabel: string;
  errorTitle: string;
  microcopy: string;
  technicalReason: string;
  primaryAction: string;
  secondaryAction?: string;
  severity: 'warning' | 'error' | 'critical';
}

export interface MotionSpec {
  element: string;
  trigger: string;
  curve: string;
  durationMs: number;
  properties: string;
  uxRationale: string;
}

export interface PasswordValidation {
  noSequential: boolean;
  noBirthdateOrYear: boolean;
  noFourIdentical: boolean;
}
