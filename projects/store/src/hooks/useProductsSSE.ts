import { useEffect, useRef, useState } from "react";
import { apiUrl, storeId } from "utils/apiUrl";

interface ProductUpdateEvent {
  type: "product" | "package";
  storeId?: string;
  data: {
    id: string;
    name: string;
    action: "created" | "updated" | "deleted";
    timestamp: string;
  };
}

interface UseProductsSSEOptions {
  onProductUpdate?: (event: ProductUpdateEvent) => void;
  onError?: (error: Event) => void;
  onReconnect?: () => void;
}

interface SSEStatus {
  isConnected: boolean;
  lastEvent: ProductUpdateEvent | null;
  eventCount: number;
  reconnectAttempts: number;
  lastConnectionTime: Date | null;
}

export function useProductsSSE(options: UseProductsSSEOptions = {}) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  // Status state for monitoring
  const [status, setStatus] = useState<SSEStatus>({
    isConnected: false,
    lastEvent: null,
    eventCount: 0,
    reconnectAttempts: 0,
    lastConnectionTime: null,
  });

  const updateStatus = (updates: Partial<SSEStatus>) => {
    setStatus((prev) => ({ ...prev, ...updates }));
  };

  const connectSSE = () => {
    try {
      // Close existing connection if any
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      console.log("Connecting to SSE for product updates...");
      const eventSource = new EventSource(
        `${apiUrl}/sse/product-updates/${storeId}`,
      );

      eventSource.onopen = () => {
        console.log("SSE connection established for product updates");
        reconnectAttempts.current = 0; // Reset reconnect attempts on successful connection
        updateStatus({
          isConnected: true,
          reconnectAttempts: 0,
          lastConnectionTime: new Date(),
        });
      };

      eventSource.onmessage = (event) => {
        try {
          const data: ProductUpdateEvent = JSON.parse(event.data);
          console.log("SSE product update received:", data);

          // Update status
          updateStatus({
            lastEvent: data,
            eventCount: status.eventCount + 1,
          });

          // Only handle package events for this specific store
          if (data.type === "package" && data.storeId === storeId) {
            console.log("Processing package update for store:", storeId);
            options.onProductUpdate?.(data);
          }

          // Also handle global product events
          if (data.type === "product") {
            console.log("Processing global product update");
            options.onProductUpdate?.(data);
          }
        } catch (error) {
          console.error("Error parsing SSE data:", error);
        }
      };

      eventSource.onerror = (error) => {
        console.error("SSE connection error:", error);
        updateStatus({ isConnected: false });
        options.onError?.(error);

        // Attempt to reconnect
        if (reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.min(
            1000 * Math.pow(2, reconnectAttempts.current),
            30000,
          ); // Exponential backoff, max 30s

          console.log(
            `SSE reconnecting in ${delay}ms (attempt ${reconnectAttempts.current + 1}/${maxReconnectAttempts})`,
          );

          updateStatus({ reconnectAttempts: reconnectAttempts.current + 1 });

          reconnectTimeoutRef.current = window.setTimeout(() => {
            reconnectAttempts.current++;
            options.onReconnect?.();
            connectSSE();
          }, delay);
        } else {
          console.error("Max SSE reconnection attempts reached");
        }
      };

      eventSourceRef.current = eventSource;
    } catch (error) {
      console.error("Error creating SSE connection:", error);
      updateStatus({ isConnected: false });
    }
  };

  useEffect(() => {
    connectSSE();

    // Cleanup on unmount
    return () => {
      if (eventSourceRef.current) {
        console.log("Closing SSE connection");
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        window.clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run on mount/unmount

  // Return function to manually reconnect
  const reconnect = () => {
    reconnectAttempts.current = 0;
    updateStatus({ reconnectAttempts: 0 });
    connectSSE();
  };

  return { reconnect, status };
}
