import React from 'react';

export enum ModelMode {
  FAST = 'FAST',
  THINKING = 'THINKING'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
  timestamp: number;
  audioData?: string; // Base64 encoded audio
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PricingPlan {
  price: string;
  name: string;
  features: string[];
  color: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}