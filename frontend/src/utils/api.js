const cashier = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function fetchMenu() {
  const response = await fetch(`${cashier}/cashier/all`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = await response.json();
      if (body && body.message) message = body.message;
    } catch {
      // No JSON body available; keep the status-based message.
    }
    throw new Error(message);
  }

  return response.json();
}
