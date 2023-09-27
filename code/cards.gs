function simpleCard(cardId, title, subtitle, imageUrl = "", imageType = "CIRCLE") {
  return {
    "cardId": cardId,
    "card": {
      "header": {
        "title": title,
        "subtitle": subtitle,
        "imageUrl": imageUrl,
        "imageType": imageType
      }
    }
  };
}

function advancedCard(cardId, header, sections, sectionDividerStyle) {
  const card = JSON.parse(`{"cardId":"${cardId}","card":{${(header ? `"header":${JSON.stringify(header)}${(sections ? "," : "")}` : "")}${(sections ? `"sections":${JSON.stringify(sections)}${sectionDividerStyle ? "," : ""}` : "")}}${sectionDividerStyle ? `"sectionDividerStyle": "${sectionDividerStyle}"` : ""}}`);
  return(card)
}

function cardHeader(title, subtitle, imageUrl, imageType) {
  const header = JSON.parse(`{"title": "${title}","subtitle": "${subtitle}"${(imageUrl ? `,"imageUrl": "${imageUrl}", "imageType": "${(imageType ? imageType : "SQUARE")}"` : "")}}`)
  return(header)
}

function cardSections(header, collapsible, uncollapsibleWidgetsCount, widgets) {
  const sections = JSON.parse(`{${header ? `"header": "${header}",` : ""}${collapsible ? `"collapsible": ${collapsible},"uncollapsibleWidgetsCount": ${uncollapsibleWidgetsCount},` : ""}"widgets": ${JSON.stringify(widgets)}}`)
  return sections
}

function textParagraph(text) {
  return {"text": text}
}

function image(url, onClick, altText) {
  return JSON.parse(`"url": "${url}"${onClick || altText ? "," : ""}${onClick ? `"onClick":${onClick}${altText ? "," : ""}` : ""}${altText ? `"altText":"${altText}"` : ""}`)
}


