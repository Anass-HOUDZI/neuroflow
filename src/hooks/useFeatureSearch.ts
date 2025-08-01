
import { useState, useMemo } from 'react';
import { Feature } from '@/data/features';

export function useFeatureSearch(features: Feature[]) {
  const [search, setSearch] = useState('');

  const filteredFeatures = useMemo(() => {
    if (!search.trim()) return features;
    
    const searchLower = search.toLowerCase();
    return features.filter(feature =>
      feature.title.toLowerCase().includes(searchLower) ||
      feature.description.toLowerCase().includes(searchLower) ||
      feature.category.toLowerCase().includes(searchLower)
    );
  }, [features, search]);

  return {
    search,
    setSearch,
    filteredFeatures
  };
}
