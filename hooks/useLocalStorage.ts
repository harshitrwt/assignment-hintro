"use client";

import { useState, useEffect } from "react";
import { storage } from "@/lib/storage";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    setValue(storage.get(key, initial));
  }, [key, initial]);

  const update = (val: T) => {
    setValue(val);
    storage.set(key, val);
  };

  return [value, update] as const;
}
