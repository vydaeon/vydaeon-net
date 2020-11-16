import m from "mithril"

export function request<T>(path: string, options?: m.RequestOptions<T>): Promise<T> {
    const url = location.port !== "9000"
        ? path
        : path.startsWith("/")
            ? `http://localhost:8080${path}`
            : `http://localhost:8080/${path}`
    return m.request(url, options)
}
