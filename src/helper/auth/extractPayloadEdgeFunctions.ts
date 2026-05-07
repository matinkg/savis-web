export function ExtractPayloadEdgeFunctions(token: string): string | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);

    // Assuming the role is stored in the 'role' field of the payload
    return payload;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
