// src/lib/jwt.ts

interface JWTPayload {
  sub: string;
  userId?: number;
  id?: number;
  email?: string;
  exp?: number;
  iat?: number;
}

export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const getUserIdFromToken = (token: string): number | null => {
  const payload = decodeJWT(token);
  if (!payload) return null;

  // Try different possible field names for user ID
  return payload.userId || payload.id || parseInt(payload.sub) || null;
};

export const getUserEmailFromToken = (token: string): string | null => {
  const payload = decodeJWT(token);
  if (!payload) return null;

  // The email can be in 'email' field or 'sub' field
  return payload.email || payload.sub || null;
};
