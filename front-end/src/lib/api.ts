export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"

export function buildApiUrl(path: string) {
  return new URL(path, apiBaseUrl).toString()
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers)

  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  const response = await fetch(buildApiUrl(path), {
    ...init,
    headers,
  })

  const contentType = response.headers.get("content-type") ?? ""
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const error = new Error("API request failed") as Error & {
      status: number
      data: unknown
    }

    error.status = response.status
    error.data = data
    throw error
  }

  return data as T
}

export function getApiErrorMessage(data: unknown, fallback: string) {
  if (typeof data === "string" && data.trim()) {
    return data
  }

  if (data && typeof data === "object") {
    const message = (data as { message?: unknown }).message

    if (typeof message === "string" && message.trim()) {
      return message
    }

    const error = (data as { error?: unknown }).error

    if (typeof error === "string" && error.trim()) {
      return error
    }
  }

  return fallback
}
