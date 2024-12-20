import hljs from "highlight.js"; // Import highlight.js
import { Remarkable } from "remarkable";

export const markDownToHtml = (markdown: string) => {
    const md = new Remarkable({
        html: true,
        breaks: true,
        xhtmlOut: true,
        typographer: true,
        highlight: (str, lang) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(str, { language: lang }).value;
                } catch (err) {
                    console.error(err);
                }
            }

            // Use auto-highlighting if no language is specified
            try {
                return hljs.highlightAuto(str).value;
            } catch (err) {
                console.error(err);
            }

            return ''; // Return unformatted text if highlighting fails
        },
    });

    return md.render(markdown);
};
