import React from 'react';

export interface BentoItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  colSpan?: number;
  rowSpan?: number;
}

export interface AnatomyLayer {
  id: number;
  label: string;
  title: string;
  detail: string;
  technical: string;
}

export interface DeepDiveBlock {
  title: string;
  description: string;
  result: string;
  image: string; // URL placeholder
}