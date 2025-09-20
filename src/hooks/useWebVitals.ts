import { useEffect, useState, useCallback } from "react";

interface WebVitalsState {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
  tbt: number | null;
  inp: number | null;
}

interface CustomMetrics {
  componentRenderTime: number;
  dataLoadTime: number;
  userInteractionTime: number;
}

export function useWebVitals() {
  const [vitals, setVitals] = useState<WebVitalsState>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    tbt: null,
    inp: null,
  });

  const [customMetrics, setCustomMetrics] = useState<CustomMetrics>({
    componentRenderTime: 0,
    dataLoadTime: 0,
    userInteractionTime: 0,
  });

  // Track component render time
  const trackComponentRender = useCallback(
    (componentName: string, renderTime: number) => {
      setCustomMetrics((prev) => ({
        ...prev,
        componentRenderTime: renderTime,
      }));

      console.log(`⚡ Component Render: ${componentName} - ${renderTime}ms`);
    },
    []
  );

  // Track data loading time
  const trackDataLoad = useCallback((dataType: string, loadTime: number) => {
    setCustomMetrics((prev) => ({
      ...prev,
      dataLoadTime: loadTime,
    }));

    console.log(`📊 Data Load: ${dataType} - ${loadTime}ms`);
  }, []);

  // Track user interaction time
  const trackUserInteraction = useCallback(
    (interactionType: string, responseTime: number) => {
      setCustomMetrics((prev) => ({
        ...prev,
        userInteractionTime: responseTime,
      }));

      console.log(
        `👆 User Interaction: ${interactionType} - ${responseTime}ms`
      );
    },
    []
  );

  // Get current vitals summary
  const getVitalsSummary = useCallback(() => {
    const summary = {
      timestamp: new Date().toISOString(),
      vitals,
      customMetrics,
      performance: {
        memoryUsage: (performance as any).memory
          ? {
              used: Math.round(
                (performance as any).memory.usedJSHeapSize / 1024 / 1024
              ),
              total: Math.round(
                (performance as any).memory.totalJSHeapSize / 1024 / 1024
              ),
              limit: Math.round(
                (performance as any).memory.jsHeapSizeLimit / 1024 / 1024
              ),
            }
          : null,
        timing: performance.timing
          ? {
              domContentLoaded:
                performance.timing.domContentLoadedEventEnd -
                performance.timing.navigationStart,
              loadComplete:
                performance.timing.loadEventEnd -
                performance.timing.navigationStart,
              firstByte:
                performance.timing.responseStart -
                performance.timing.navigationStart,
            }
          : null,
      },
    };

    console.group("📈 Web Vitals Summary");
    console.table(summary.vitals);
    console.table(summary.customMetrics);
    if (summary.performance.memoryUsage) {
      console.table(summary.performance.memoryUsage);
    }
    if (summary.performance.timing) {
      console.table(summary.performance.timing);
    }
    console.groupEnd();

    return summary;
  }, [vitals, customMetrics]);

  // Performance observer for real-time updates
  useEffect(() => {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();

        entries.forEach((entry: any) => {
          switch (entry.entryType) {
            case "largest-contentful-paint":
              setVitals((prev) => ({ ...prev, lcp: entry.startTime }));
              break;
            case "first-input":
              setVitals((prev) => ({
                ...prev,
                fid: entry.processingStart - entry.startTime,
              }));
              break;
            case "layout-shift":
              if (!entry.hadRecentInput) {
                setVitals((prev) => ({
                  ...prev,
                  cls: (prev.cls || 0) + entry.value,
                }));
              }
              break;
            case "paint":
              if (entry.name === "first-contentful-paint") {
                setVitals((prev) => ({ ...prev, fcp: entry.startTime }));
              }
              break;
          }
        });
      });

      observer.observe({
        entryTypes: [
          "largest-contentful-paint",
          "first-input",
          "layout-shift",
          "paint",
        ],
      });

      return () => observer.disconnect();
    }
  }, []);

  return {
    vitals,
    customMetrics,
    trackComponentRender,
    trackDataLoad,
    trackUserInteraction,
    getVitalsSummary,
  };
}
