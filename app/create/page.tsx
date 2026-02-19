"use client";


import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";



const schema = z.object({
  title : z.string().min(3,"Title is too short"),
  body: z.string().min(5, "Body is too short")
});

type FormData = z.infer<typeof schema>;

export default function Create() {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<FormData>({
    resolver : zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    await new Promise(res => 
      setTimeout(res,1500)
    );

    toast.success("Post Created");
    reset();
  }

  return(
    <div className="p-10 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb -6">
            Create Post
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <input 
          placeholder="title"
          className="border p-3 rounded"
          {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500">
              {errors.title.message}
            </p>
          )}

          
        <textarea
          placeholder="Body"
          rows={5}
          className="border p-3 rounded"
          {...register("body")}
        />
        {errors.body && (
          <p className="text-red-500">
            {errors.body.message}
          </p>
        )}

            <button
          disabled={isSubmitting}
          className="bg-black text-white p-3 rounded"
        >
          {isSubmitting
            ? "Creating..."
            : "Create Post"}
        </button>
        </form>
    </div>
  )
}