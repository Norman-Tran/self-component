import { Navigate, useParams } from 'react-router-dom';

import { componentDemos } from '../config/navigation';

export function ComponentDocPage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = componentDemos.find((demo) => demo.slug === slug);

  if (!entry) {
    return <Navigate to="/" replace />;
  }

  return <entry.Page />;
}
