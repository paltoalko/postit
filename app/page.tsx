"use client";

import axios from "axios";
import AddPosts from "./components/AddPosts";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";
import { PostType } from "../app/types/Posts";

const allPosts = async () => {
	const response = await axios.get("/api/posts/getPosts");
	return response.data;
};

export default function Home() {
	const { data, error, isLoading } = useQuery<PostType[]>({ queryFn: allPosts, queryKey: ["posts"] });
	if (error) return error;
	if (isLoading) return "Loading...";
	console.log(data);
	return (
		<main>
			<AddPosts />
			{data?.map((post) => (
				<Post
					key={post.id}
					name={post.user.name}
					avatar={post.user.image}
					postTitle={post.title}
					id={post.id}
					comments={post.Comment}
				/>
			))}
		</main>
	);
}
