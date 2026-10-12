import { useEffect, useState } from "react";
import { STATUS_TIMEOUT } from "@/lib/contact-form/constants";
import type { ContactFormStatus } from "@/lib/contact-form/types";

export default function useTemporaryStatus() {
  const [status, setStatus] = useState<ContactFormStatus>("default");

  useEffect(() => {
    if (status === "default") {
      return;
    }

    const timeoutId = setTimeout(() => {
      setStatus("default");
    }, STATUS_TIMEOUT);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [status]);

  return [status, setStatus] as const;
}
