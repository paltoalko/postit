"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Toggle from "./Toggle";

type EditProps = {
	id: string;
	avatar: string;
	name: string;
	title: string;
	comments?: {
		id: string;
		postId: string;
		userId: string;
	}[];
};

export default function EditPost({ avatar, name, title, comments, id }: EditProps) {
	const [toggle, setToggle] = useState(false);
	let deleteToastID: string;

	const { mutate } = useMutation(async (id: string) => await axios.delete("/api/posts/deletePost", { data: id }), {
		onError: (error) => {
			console.log(error);
			toast.error("Error deleting that post.", { id: deleteToastID });
		},
		onSuccess: (data) => {
			toast.success("Post has been deleted.", { id: deleteToastID });
			const queryClient = useQueryClient();
			queryClient.invalidateQueries(["auth-posts"]);
		},
	});

	const deletePosts = () => {
		deleteToastID = toast.loading("Deleting you post.", { id: deleteToastID });
		mutate(id);
	};
	return (
		<>
			<div className='bg-white my-8 p-8 rounded-lg'>
				<div className='flex items-center gap-2'>
					<Image className='rounded-full' width={32} height={32} src={avatar} alt='avatar' />
					<h3 className='font-bold text-gray-700'>{name}</h3>
				</div>
				<div className='my-8'>
					<p className='break-all'>{title}</p>
				</div>
				<div className='flex items-center gap-4'>
					<p className='text-sm font-bold text-gray-700'>{comments?.length} Comments</p>
					<button onClick={(e) => setToggle(true)} className='text-sm font-bold text-red-500'>
						Delete
					</button>
				</div>
			</div>
			{toggle && <Toggle deletePost={deletePosts} setToggle={setToggle} />}
		</>
	);
}
