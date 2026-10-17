import { tool } from "@subako-ai/function-sdk";
import { z } from "zod";

interface Repository {
	full_name: string;
	description: string | null;
	stargazers_count: number;
	open_issues_count: number;
	html_url: string;
}

export const repo = tool({
	name: "repo",
	description: "A GitHub repository's description, stars and open issue count.",
	input: z.object({
		owner: z.string().describe("the user or organization, e.g. microsoft"),
		repo: z.string().describe("the repository name, e.g. typescript"),
	}),
	output: z.object({
		full_name: z.string(),
		description: z.string().nullable(),
		stars: z.number(),
		open_issues: z.number(),
		url: z.string(),
	}),
	run: async ({ owner, repo }) => {
		const path = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
		const response = await fetch(`https://api.github.com${path}`, {
			headers: { accept: "application/vnd.github+json" },
		});
		// A thrown error becomes a result the model reads, so say what to do about it.
		if (response.status === 404) throw new Error(`GitHub has no repository ${owner}/${repo}`);
		if (!response.ok) throw new Error(`GitHub answered ${response.status} for ${path}`);
		const found: Repository = await response.json();
		return {
			full_name: found.full_name,
			description: found.description,
			stars: found.stargazers_count,
			open_issues: found.open_issues_count,
			url: found.html_url,
		};
	},
});
