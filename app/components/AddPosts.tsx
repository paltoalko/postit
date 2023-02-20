"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function CreatePost() {
	const [title, setTitle] = useState("");
	const [isDisabled, setDisabled] = useState(false);
	const queryClient = useQueryClient();
	let toastPostID: string;

	// Create post
	const { mutate } = useMutation(async (title: string) => await axios.post("/api/posts/addPosts", { title }), {
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data.message, { id: toastPostID });
			}
			setDisabled(false);
		},
		onSuccess: (data) => {
			setTitle("");
			setDisabled(false);
			queryClient.invalidateQueries(["posts"]);
			toast.success("Post has been made. 📩 ", { id: toastPostID });
		},
	});
	const submitPost = async (e: React.FormEvent) => {
		e.preventDefault();
		toastPostID = toast.loading("Creating your post", { id: toastPostID });

		setDisabled(true);
		mutate(title);
	};
	return (
		<form onSubmit={submitPost} className='bg-white my-8 p-8 rounded-md'>
			<div className='flex flex-col my-4'>
				<textarea
					onChange={(e) => setTitle(e.target.value)}
					name='title'
					value={title}
					placeholder="What's on your mind?"
					className='p-4 text-lg rounded-md my-2 bg-gray-200'></textarea>
			</div>
			<div className='flex items-center justify-between gap-2'>
				<p
					className={`font-bold text-sm ${
						title.length > 300 ? "text-red-700" : "text-gray-700"
					}`}>{`${title.length}/300`}</p>
				<button
					type='submit'
					disabled={isDisabled}
					className='text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25 '>
					Create a post
				</button>
			</div>
		</form>
	);
}
