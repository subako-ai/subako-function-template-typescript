import { serve, tool } from "@subako-ai/function-sdk";
import { z } from "zod";

const add = tool({
	name: "add",
	description: "Add two numbers.",
	input: z.object({
		a: z.number().describe("the first number"),
		b: z.number().describe("the second number"),
	}),
	output: z.object({ sum: z.number() }),
	run: ({ a, b }) => ({ sum: a + b }),
});

serve([add]);
