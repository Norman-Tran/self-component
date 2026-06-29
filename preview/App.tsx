import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AdminLayout } from './layout/AdminLayout';
import { ComponentDocPage } from './pages/ComponentDocPage';
import { IntroductionPage } from './pages/IntroductionPage';
import { PreviewPage } from './pages/PreviewPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<IntroductionPage />} />
          <Route path="preview" element={<PreviewPage />} />
          <Route path="components/:slug" element={<ComponentDocPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
