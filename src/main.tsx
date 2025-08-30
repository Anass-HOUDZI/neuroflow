import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize security and performance optimizations
import './core/optimization/GlobalOptimizer'
import './core/security/SecurityManager'

createRoot(document.getElementById("root")!).render(<App />);
