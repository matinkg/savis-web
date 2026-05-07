const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const extractSVG = (htmlString: string) => {
  const decodedString = decodeHtml(htmlString);

  // حذف تگ‌های <br> از رشته دیکود شده
  const cleanedString = decodedString.replace(/<br>/g, "");

  // پیدا کردن و تغییر تمامی مقدارهای fill به currentColor
  let modifiedSvg = cleanedString.replace(
    /fill="#[0-9A-Fa-f]{6}"/g,
    'fill="currentColor"'
  );

  // حذف ویژگی‌های height و width از تگ <svg>
  //   modifiedSvg = modifiedSvg.replace(/(height|width)="[0-9]+"/g, "");

  const svgStart = modifiedSvg.indexOf("<svg");
  const svgEnd = modifiedSvg.indexOf("</svg>") + 6;

  return modifiedSvg.slice(svgStart, svgEnd);
};

export const fetchAndExtractSVG = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch SVG: ${response.statusText}`);
    }

    const htmlString = await response.text();

    const decodedString = decodeHtml(htmlString);
    const cleanedString = decodedString.replace(/<br>/g, "");

    const modifiedSvg = cleanedString.replace(
      /fill="#[0-9A-Fa-f]{6}"/g,
      'fill="currentColor"'
    );

    const svgStart = modifiedSvg.indexOf("<svg");
    const svgEnd = modifiedSvg.indexOf("</svg>") + 6;

    return modifiedSvg.slice(svgStart, svgEnd);
  } catch (error) {
    console.error("Error fetching and processing SVG:", error);
    return null;
  }
};
