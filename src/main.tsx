import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize global performance optimizations
import './core/optimization/GlobalOptimizer'

createRoot(document.getElementById("root")!).render(<App />);
