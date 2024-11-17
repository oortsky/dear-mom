"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { generateAIContent } from "@/utils/ai";
import { ulid } from "ulid";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, { message: "Content is required" })
});

export default function Create() {
  const router = useRouter();
  const [magic, setMagic] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(formSchema)
  });

  const handleMagic = () => {
    setMagic(!magic);
    setValue("content", "");
  };

  const onSubmit = async data => {
    if (magic) {
      setLoading(true);
      try {
        const aiContent = await generateAIContent(data.content);
        setValue("content", aiContent);
        setMagic(false);
      } catch (error) {
        console.error("Error generating AI content:", error);
      } finally {
        setLoading(false);
      }
    } else {
      const generatedId = ulid();
      const { error } = await supabase.from("letters").insert({
        id: generatedId,
        title: data.title,
        content: data.content
      });
      if (error) {
        console.error("Error inserting data to Supabase:", error);
      } else {
        router.push(`/preview/${generatedId}`);
        reset();
      }
    }
  };

  return (
    <section className="p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create Letter</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-lg">
              Title
            </Label>
            <Input
              id="title"
              className="w-full text-base"
              placeholder="Enter the title here"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-lg">
              {magic ? "Prompt" : "Content"}
            </Label>
            <Textarea
              id="content"
              className={`w-full text-base h-40 transition-all ${
                magic ? "border-2 border-blue-400 animate-glow" : "border"
              }`}
              placeholder={
                magic
                  ? "Enter your prompt for AI to generate content..."
                  : "Write your content here..."
              }
              {...register("content")}
              disabled={loading}
            />
            {errors.content && (
              <p className="text-red-600 text-sm">{errors.content.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button type="button" onClick={handleMagic} variant="secondary">
              <Sparkles className="mr-2" />
              {magic ? "Disable AI Assist" : "Enable AI Assist"}
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? "Generating..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
