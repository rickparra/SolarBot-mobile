import { type ClassValue } from 'clsx';

// Utility function for merging class names (NativeWind compatible)
export function cn(...inputs: ClassValue[]) {
  // For NativeWind, we can simply filter and join
  return inputs.filter(Boolean).join(' ');
}

