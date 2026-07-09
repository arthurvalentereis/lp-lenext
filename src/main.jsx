import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import EbookPoliticaCredito from './pages/resources/EbookPoliticaCredito.jsx'
import PromptAnaliseCredito from './pages/resources/PromptAnaliseCredito.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* Rotas por material (URLs distintas para medir conversão via analytics) */}
          <Route path="/resources/ebook-politica-credito" element={<EbookPoliticaCredito />} />
          <Route path="/resources/prompt-analise-credito" element={<PromptAnaliseCredito />} />
          {/* Compatibilidade: rota antiga aponta para o e-book */}
          <Route path="/resources" element={<Navigate to="/resources/ebook-politica-credito" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
