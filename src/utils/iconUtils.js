import * as Icons from 'lucide-react';

export const getIcon = (iconName) => {
  // Try direct match first
  if (Icons[iconName] && typeof Icons[iconName] === 'function') {
    return Icons[iconName];
  }
  
  // Convert kebab-case to PascalCase
  if (typeof iconName === 'string' && iconName.includes('-')) {
    const pascalCase = iconName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    if (Icons[pascalCase] && typeof Icons[pascalCase] === 'function') {
      return Icons[pascalCase];
    }
  }
  
  // Fallback to Smile icon
  return Icons.Smile;
};