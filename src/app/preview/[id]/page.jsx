"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Share2, Twitter, Link, MessageCircleMore } from "lucide-react";

export default function Preview({ params }) {
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();
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

      setLetter(data);
      setLoading(false);
    };

    fetchLetter();
  }, [id, router]);

  const shareToPlatform = async platform => {
    const url = `https://dear-mom-xi.vercel.app/letter/${id}`;

    // Update is_preview to false in the database
    const { data, error } = await supabase
      .from("letters")
      .update({ is_preview: false })
      .eq("id", id);

    if (error) {
      alert("Error updating the letter preview status.");
      toast({
        title: "Something Wrong!",
        description: "Error updating the letter preview status."
      });
      return;
    }

    // Share to the selected platform
    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${url}`, "_blank");
    } else if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${url}`, "_blank");
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied to clipboard!"
      });
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="flex flex-col items-center gap-4 p-4 max-w-xl mx-auto">
      {/* Bagian Surat */}
      <div className="bg-teal-100 rounded-lg p-6 shadow-lg w-full border border-teal-200">
        <h1 className="text-xl font-serif font-bold text-center mb-6">
          {letter?.title || "Preview"}
        </h1>

        <pre className="whitespace-pre-wrap leading-relaxed p-4 border border-teal-500 rounded-lg">
          {letter?.content || "Surat ini tidak memiliki isi."}
        </pre>
      </div>

      {/* Bagian Share dan QR Code */}
      <div className="w-full p-6 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-center mb-6">
          Silakan bagikan dengan menekan tombol di bawah ini.
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full">
              <Share2 size={18} />
              <span>Share</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-full bg-white border border-gray-200 rounded-md shadow-lg">
            <DropdownMenuItem
              className="flex items-center space-x-2 p-3 hover:bg-teal-50 transition"
              onClick={() => shareToPlatform("twitter")}
            >
              <Twitter size={16} className="text-blue-500" />
              <span>Share on Twitter</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center space-x-2 p-3 hover:bg-teal-50 transition"
              onClick={() => shareToPlatform("whatsapp")}
            >
              <MessageCircleMore size={16} className="text-green-500" />
              <span>Share on WhatsApp</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center space-x-2 p-3 hover:bg-teal-50 transition"
              onClick={() => shareToPlatform("link")}
            >
              <Link size={16} className="text-gray-500" />
              <span>Copy Link</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
