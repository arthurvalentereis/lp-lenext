import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import EbookPoliticaCredito from './pages/resources/EbookPoliticaCredito.jsx'
import PromptAnaliseCredito from './pages/resources/PromptAnaliseCredito.jsx'
import BlogIndex from './pages/blog/BlogIndex.jsx'
import BlogPost from './pages/blog/BlogPost.jsx'
import Medicao from './components/Medicao.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        {/* Fora de <Routes>: vale em todas as páginas, não só na home. */}
        <Medicao />
        <Routes>
          <Route path="/" element={<App />} />

          {/* Rotas por material (URLs distintas para medir conversão via analytics) */}
          <Route path="/resources/ebook-politica-credito" element={<EbookPoliticaCredito />} />
          <Route path="/resources/prompt-analise-credito" element={<PromptAnaliseCredito />} />
          {/* Compatibilidade: rota antiga aponta para o e-book */}
          <Route path="/resources" element={<Navigate to="/resources/ebook-politica-credito" replace />} />

          {/* Blog. Só aqui o idioma entra na URL: post indexável precisa de
              endereço próprio por idioma, e o resto do site guarda o idioma
              apenas no localStorage. */}
          <Route path="/blog" element={<BlogIndex lang="pt" />} />
          <Route path="/blog/:slug" element={<BlogPost lang="pt" />} />
          <Route path="/en/blog" element={<BlogIndex lang="en" />} />
          <Route path="/en/blog/:slug" element={<BlogPost lang="en" />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
