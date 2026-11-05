export interface Config {
  baseUrl: string;
  email: string;
  password: string;
  accountId?: number;
  readOnly: boolean;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: string,
    message: string,
  ) {
    super(message);
  }
}

type Query = Record<string, string | number | undefined>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const email = env.COURSIFY_EMAIL;
  const password = env.COURSIFY_PASSWORD;
  if (!email || !password) {
    throw new Error("COURSIFY_EMAIL dan COURSIFY_PASSWORD mesti ditetapkan (akaun Coursify anda sendiri).");
  }
  return {
    baseUrl: (env.COURSIFY_URL ?? "https://coursify.guru").replace(/\/+$/, ""),
    email,
    password,
    accountId: env.COURSIFY_ACCOUNT_ID ? Number(env.COURSIFY_ACCOUNT_ID) : undefined,
    readOnly: ["1", "true", "yes"].includes((env.COURSIFY_READ_ONLY ?? "").toLowerCase()),
  };
}

export class CoursifyClient {
  private token: string | undefined;

  constructor(private readonly cfg: Config) {}

  get readOnly(): boolean {
    return this.cfg.readOnly;
  }

  private url(path: string, query?: Query): URL {
    const u = new URL(`${this.cfg.baseUrl}/api/${path.replace(/^\/+/, "")}`);
    for (const [k, v] of Object.entries(query ?? {})) {
      if (v !== undefined && v !== "") u.searchParams.set(k, String(v));
    }
    return u;
  }

  private async login(): Promise<void> {
    const res = await fetch(this.url("auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email: this.cfg.email,
        password: this.cfg.password,
        ...(this.cfg.accountId ? { account_id: this.cfg.accountId } : {}),
      }),
    });
    const text = await res.text();
    if (!res.ok) throw new ApiError(res.status, text, `Login gagal (HTTP ${res.status})`);
    const data = JSON.parse(text) as { token?: string };
    if (!data.token) {
      throw new Error(
        "Login berjaya tetapi tiada token dalam respons. Jika akaun anda ada beberapa account, tetapkan COURSIFY_ACCOUNT_ID.",
      );
    }
    this.token = data.token;
  }

  async request<T = unknown>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    opts: { query?: Query; body?: unknown } = {},
    retried = false,
  ): Promise<T> {
    if (!this.token) await this.login();
    const res = await fetch(this.url(path, opts.query), {
      method,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: "application/json",
        ...(opts.body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    });
    if (res.status === 401 && !retried) {
      this.token = undefined;
      return this.request<T>(method, path, opts, true);
    }
    const text = await res.text();
    if (!res.ok) throw new ApiError(res.status, text, `${method} ${path} -> HTTP ${res.status}`);
    if (!text) return undefined as T;
    try {
      return JSON.parse(text) as T;
    } catch {
      return text as unknown as T;
    }
  }
}
