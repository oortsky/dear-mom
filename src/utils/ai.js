import axios from "axios";

const API_KEY = "AIzaSyBrk123mAvChdI-VbUMgOJCsfZ-VwZoeps";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain"
};

const parts = [
  {
    text: "input: Buatkan ucapan untuk Hari Ibu yang sederhana tapi bermakna."
  },
  {
    text: "output: Selamat Hari Ibu untuk Ibu tercinta! Terima kasih atas cinta dan perhatian yang selalu engkau berikan. Kehadiranmu adalah anugerah terindah dalam hidupku. Semoga Ibu selalu diberkahi kesehatan dan kebahagiaan."
  },
  {
    text: "input: Saya ingin ucapan yang puitis dan menyentuh hati untuk ibuku."
  },
  {
    text: "output: Hari ini adalah hari untukmu, Ibu tersayang,\nPenuh cinta, kekuatan, dan ketulusan tiada tanding.\nTerima kasih atas pelukan hangat yang selalu menyambut,\nDan cinta yang menguatkan dalam setiap langkahku.\nSelamat Hari Ibu, Ibu adalah inspirasiku selamanya."
  },
  {
    text: "input: Tolong buat ucapan terima kasih untuk ibu yang selalu sabar dan mendukung."
  },
  {
    text: "output: Selamat Hari Ibu untuk wanita yang menjadi pilar dan sumber kekuatanku. Terima kasih karena selalu sabar mendampingiku, selalu memberiku harapan saat aku merasa lelah. Engkau adalah inspirasiku, Ibu. Semoga bahagia dan sehat selalu!"
  },
  { text: "input: Bisa buatkan ucapan Hari Ibu yang ceria dan penuh humor?" },
  {
    text: "output: Selamat Hari Ibu untuk sahabat terbaik dan koki favoritku! Terima kasih karena sudah mengurusku dengan sabar dan penuh cinta. Terima kasih juga untuk selalu sabar menjawab pertanyaan, 'Ibu, di mana baju bersihku?' tiap pagi! Kamu memang ibu terbaik!"
  },
  {
    text: "input: Saya ingin ucapan terima kasih untuk ibu dengan nuansa keagamaan."
  },
  {
    text: "output: Selamat Hari Ibu untuk bidadari yang dikirim Tuhan dalam hidupku. Terima kasih telah menjadi panutan dalam iman dan kasih sayang. Semoga Tuhan selalu melindungi dan memberkati Ibu dengan kebahagiaan dan kesehatan."
  },
  {
    text: "input: Langsung keluar output-nya saja."
  },
    {
    text: "input: Jika hasil text-nya panjang, buat menjadi paragraf atau berjarak agar tetap rapih dan terlihat bagus."
  },
  {
    text: "input: Tambahkan emoticon-emoticon sebagai pemanis."
  }
];

export async function generateAIContent(prompt) {
  const requestData = {
    contents: [
      {
        role: "user",
        parts: [{ text: `input: ${prompt}` }, ...parts]
      }
    ],
    generationConfig
  };

  try {
    const response = await axios.post(URL, requestData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return (
      response.data?.candidates[0]?.content.parts[0].text ||
      "No output text found"
    );
  } catch (error) {
    console.error(
      "Error generating AI content:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate AI content");
  }
}
