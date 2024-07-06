<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
            "Afrikanns",
            "Albanian",
            "Arabic",
            "Armenian",
            "Basque",
            "Bengali",
            "Bulgarian",
            "Catalan",
            "Cambodian",
            "Chinese (Mandarin)",
            "Croation",
            "Czech",
            "Danish",
            "Dutch",
            "English",
            "Estonian",
            "Fiji",
            "Finnish",
            "French",
            "Georgian",
            "German",
            "Greek",
            "Gujarati",
            "Hebrew",
            "Hindi",
            "Hungarian",
            "Icelandic",
            "Indonesian",
            "Irish",
            "Italian",
            "Japanese",
            "Javanese",
            "Korean",
            "Latin",
            "Latvian",
            "Lithuanian",
            "Macedonian",
            "Malay",
            "Malayalam",
            "Maltese",
            "Maori",
            "Marathi",
            "Mongolian",
            "Nepali",
            "Norwegian",
            "Persian",
            "Polish",
            "Portuguese",
            "Punjabi",
            "Quechua",
            "Romanian",
            "Russian",
            "Samoan",
            "Serbian",
            "Slovak",
            "Slovenian",
            "Spanish",
            "Swahili",
            "Swedish ",
            "Tamil",
            "Tatar",
            "Telugu",
            "Thai",
            "Tibetan",
            "Tonga",
            "Turkish",
            "Ukrainian",
            "Urdu",
            "Uzbek",
            "Vietnamese",
            "Welsh",
            "Xhosa",
        ];

        foreach ($languages as $language) {
            Language::create([
                'name' => $language,
            ]);
        }
    }
}
