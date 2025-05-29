// src/setupTests.js
import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";
import "jest-environment-jsdom";

window.IS_TESTING = true;


// Configure testing library
configure({
  testIdAttribute: "data-testid",
});

if (typeof window !== "undefined") {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
}

// // Proper console mocking with error handling
// const originalConsole = { ...console };
// try {
//   global.console = {
//     ...console,
//     // Keep original log for debugging
//     log: jest.fn((...args) => originalConsole.log(...args)),
//     warn: jest.fn((...args) => originalConsole.warn(...args)),
//     error: jest.fn((...args) => originalConsole.error(...args)),
//     info: jest.fn((...args) => originalConsole.info(...args)),
//     debug: jest.fn((...args) => originalConsole.debug(...args)),
//   };
// } catch (error) {
//   console.error('Failed to mock console methods:', error);
// }

// Mock window.matchMedia with error handling
try {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
} catch (error) {
  console.error("Failed to mock matchMedia:", error);
}

// Mock IntersectionObserver
try {
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {
      return null;
    }
    unobserve() {
      return null;
    }
    disconnect() {
      return null;
    }
  };
} catch (error) {
  console.error("Failed to mock IntersectionObserver:", error);
}

// Mock localStorage
try {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
} catch (error) {
  console.error("Failed to mock localStorage:", error);
}

// Mock ResizeObserver
try {
  global.ResizeObserver = class ResizeObserver {
    observe() {
      return null;
    }
    unobserve() {
      return null;
    }
    disconnect() {
      return null;
    }
  };
} catch (error) {
  console.error("Failed to mock ResizeObserver:", error);
}

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
});
