import React, { createContext, useContext, useEffect, useState } from "react";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";

const FingerprintContext = createContext();

export function FingerprintProvider({ children }) {
  const { data } = useVisitorData({ extendedResult: true }, { immediate: true });
  const [visitorId, setVisitorId] = useState(null);

  useEffect(() => {
    if (data?.visitorId) {
      setVisitorId(data.visitorId); // Save visitor ID in state
    }
  }, [data]);

  return (
    <FingerprintContext.Provider value={{ visitorId }}>
      {children}
    </FingerprintContext.Provider>
  );
}

// Custom hook to use the Fingerprint context
export function useFingerprint() {
  return useContext(FingerprintContext);
}
