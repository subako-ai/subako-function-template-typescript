import { afterEach, describe, expect, it, vi } from "vitest";

import { repo } from "../src/tools.js";

const answering = (status: number, body: unknown) =>
	vi.fn(async (_url: string) => new Response(JSON.stringify(body), { status }));

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("repo", () => {
	it("returns the repository's stats", async () => {
		const fetch = answering(200, {
			full_name: "microsoft/TypeScript",
			description: "TypeScript is a superset of JavaScript.",
			stargazers_count: 100000,
			open_issues_count: 5000,
			html_url: "https://github.com/microsoft/TypeScript",
		});
		vi.stubGlobal("fetch", fetch);

		const result = await repo.call({ owner: "microsoft", repo: "typescript" });

		expect(fetch.mock.calls[0]?.[0]).toBe("https://api.github.com/repos/microsoft/typescript");
		expect(result.structuredContent).toEqual({
			full_name: "microsoft/TypeScript",
			description: "TypeScript is a superset of JavaScript.",
			stars: 100000,
			open_issues: 5000,
			url: "https://github.com/microsoft/TypeScript",
		});
	});

	it("tells the model when the repository does not exist", async () => {
		vi.stubGlobal("fetch", answering(404, { message: "Not Found" }));

		const result = await repo.call({ owner: "nobody", repo: "nothing" });

		expect(result.isError).toBe(true);
		expect(result.content).toEqual([{ type: "text", text: "GitHub has no repository nobody/nothing" }]);
	});

	it("refuses input without an owner", async () => {
		const result = await repo.call({ repo: "typescript" });

		expect(result.isError).toBe(true);
	});
});
