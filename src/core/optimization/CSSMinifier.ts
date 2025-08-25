/**
 * CSS Minifier - Runtime CSS optimization
 * Minifies and optimizes CSS for better performance
 */

export class CSSMinifier {
  private static instance: CSSMinifier;
  private optimizedStylesheets: Set<string> = new Set();

  private constructor() {}

  public static getInstance(): CSSMinifier {
    if (!CSSMinifier.instance) {
      CSSMinifier.instance = new CSSMinifier();
    }
    return CSSMinifier.instance;
  }

  /**
   * Minify CSS string
   */
  public minify(css: string): string {
    return css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove unnecessary whitespace
      .replace(/\s+/g, ' ')
      // Remove spaces around specific characters
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
      // Remove trailing semicolons before closing braces
      .replace(/;}/g, '}')
      // Remove empty rules
      .replace(/[^{}]+{\s*}/g, '')
      // Trim
      .trim();
  }

  /**
   * Optimize CSS by removing unused styles
   */
  public optimizeCSS(css: string, usedSelectors: string[]): string {
    const rules = css.split('}').filter(rule => rule.trim());
    const optimizedRules: string[] = [];

    rules.forEach(rule => {
      const selector = rule.split('{')[0]?.trim();
      if (selector && usedSelectors.some(used => selector.includes(used))) {
        optimizedRules.push(rule + '}');
      }
    });

    return this.minify(optimizedRules.join(''));
  }

  /**
   * Extract critical CSS for above-the-fold content
   */
  public extractCriticalCSS(css: string): string {
    const criticalSelectors = [
      'body', 'html', 'header', 'nav', 'main', 'hero',
      '.container', '.grid', '.flex', '.text-',
      '.bg-', '.p-', '.m-', '.w-', '.h-'
    ];

    const rules = css.split('}').filter(rule => rule.trim());
    const criticalRules: string[] = [];

    rules.forEach(rule => {
      const selector = rule.split('{')[0]?.trim();
      if (selector && criticalSelectors.some(critical => selector.includes(critical))) {
        criticalRules.push(rule + '}');
      }
    });

    return this.minify(criticalRules.join(''));
  }

  /**
   * Inline critical CSS in document head
   */
  public inlineCriticalCSS(css: string): void {
    const criticalCSS = this.extractCriticalCSS(css);
    const minifiedCSS = this.minify(criticalCSS);

    if (!this.optimizedStylesheets.has('critical')) {
      const style = document.createElement('style');
      style.id = 'critical-css';
      style.textContent = minifiedCSS;
      document.head.appendChild(style);
      this.optimizedStylesheets.add('critical');
    }
  }

  /**
   * Lazy load non-critical CSS
   */
  public lazyLoadCSS(href: string, media = 'all'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.optimizedStylesheets.has(href)) {
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.media = 'print';
      link.onload = () => {
        link.media = media;
        this.optimizedStylesheets.add(href);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  /**
   * Compress CSS using gzip-like algorithm
   */
  public compress(css: string): string {
    const minified = this.minify(css);
    
    // Simple compression by replacing common patterns
    const compressionMap: Record<string, string> = {
      'display:flex': 'd:f',
      'justify-content:': 'jc:',
      'align-items:': 'ai:',
      'flex-direction:': 'fd:',
      'background-color:': 'bg:',
      'border-radius:': 'br:',
      'margin:': 'm:',
      'padding:': 'p:',
    };

    let compressed = minified;
    Object.entries(compressionMap).forEach(([original, short]) => {
      compressed = compressed.replace(new RegExp(original, 'g'), short);
    });

    return compressed;
  }

  /**
   * Decompress CSS
   */
  public decompress(compressedCSS: string): string {
    const decompressionMap: Record<string, string> = {
      'd:f': 'display:flex',
      'jc:': 'justify-content:',
      'ai:': 'align-items:',
      'fd:': 'flex-direction:',
      'bg:': 'background-color:',
      'br:': 'border-radius:',
      'm:': 'margin:',
      'p:': 'padding:',
    };

    let decompressed = compressedCSS;
    Object.entries(decompressionMap).forEach(([short, original]) => {
      decompressed = decompressed.replace(new RegExp(short, 'g'), original);
    });

    return decompressed;
  }

  /**
   * Remove unused CSS selectors
   */
  public removeUnusedSelectors(css: string): string {
    const usedClasses = new Set<string>();
    
    // Scan document for used classes
    document.querySelectorAll('*').forEach(element => {
      element.classList.forEach(className => {
        usedClasses.add(`.${className}`);
      });
    });

    // Get used IDs
    document.querySelectorAll('[id]').forEach(element => {
      usedClasses.add(`#${element.id}`);
    });

    return this.optimizeCSS(css, Array.from(usedClasses));
  }

  /**
   * Get optimization statistics
   */
  public getOptimizationStats(originalCSS: string, optimizedCSS: string): {
    originalSize: number;
    optimizedSize: number;
    compressionRatio: number;
    sizeSaved: number;
  } {
    const originalSize = new Blob([originalCSS]).size;
    const optimizedSize = new Blob([optimizedCSS]).size;
    const sizeSaved = originalSize - optimizedSize;
    const compressionRatio = (sizeSaved / originalSize) * 100;

    return {
      originalSize,
      optimizedSize,
      compressionRatio: Math.round(compressionRatio * 100) / 100,
      sizeSaved
    };
  }
}