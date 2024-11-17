"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Letter({ params }) {
  const { id } = params;
  const router = useRouter();
  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLetter = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("letters")
        .select("title, content, is_preview")
        .eq("id", id)
        .single();

      if (error || !data || data.is_preview) {
        setError("Data not found or error occurred.");
        setLoading(false);
        router.push("/");
        return;
      }

      setLetter(data);
      setLoading(false);
    };

    fetchLetter();
  }, [id, router]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="w-full h-[100dvh] bg-teal-100 p-6">
      <h1 className="text-xl font-serif font-bold text-center mb-6">
        {letter?.title || "Letter"}
      </h1>
      <pre className="whitespace-pre-wrap leading-relaxed p-4 border border-teal-500 rounded-lg">
        {letter?.content || "No Content"}
      </pre>
    </div>
  );
}
