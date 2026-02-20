"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * HealthMonitor - A client-side component that checks API health in the background.
 * This ensures the user is not blocked during initial page load, but will be
 * redirected to the 503 page if the backend services are unreachable.
 */
export default function HealthMonitor() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // if (pathname === "/service-unavailable") return;

    const checkHealth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST_URL}/healthcheck`,
          {
            method: "GET",
            headers: { accept: "*/*" },
            cache: "no-store",

            signal: AbortSignal.timeout(5000),
          },
        );
          
        if (response.status == 200) {
          router.push("/");
        }

        if (response.status !== 200) {
          router.push("/service-unavailable");
        }
      } catch (error) {
        console.error("Background health check failed:", error);
        // If the API is completely down/unreachable, redirect to 503
        router.push("/service-unavailable");
      }
    };

    checkHealth();

    const interval = setInterval(checkHealth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [pathname, router]);

  return null;
}
