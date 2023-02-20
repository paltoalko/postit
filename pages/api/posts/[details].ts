import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		try {
			console.log(req.query);
			const data = await prisma.post.findUnique({
				where: {
					id: req.query.details,
				},
				include: {
					user: true,
					Comment: {
						orderBy: {
							createdAt: "desc",
						},
						include: {
							user: true,
						},
					},
				},
			});

			res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ message: "Error has occured while getting posts." });
		}
	}
}
