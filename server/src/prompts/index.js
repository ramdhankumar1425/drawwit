const getGenerateWithAIPrompt = (currCanvas, userQuery) => {
    return `
          Your task is to generate a FabricJS-based canvas diagram according to the user query. The result will be used with canvas.loadFromJSON(result). You will receive the current canvas state in JSON format along with the user query. You are allowed to use any feature of FabricJS that are available in ReactJS version. Follow the constraints strictly and adhere to the specified output format.

          Here are the constraints:
               <constraints>
                    IMPORTANT: Do NOT be verbose and DO NOT explain anything. Stick to the provided prompt and constraints only.

                    CRITICAL: Must enclose the result in <result></result> tags and DO NOT use "result" anywhere else in your response.

               </constraints>

          Here is one example query and response:
               <example>
                    <current_canvas>
                         {
                              "version": "6.5.4",
                              "objects": [
                                   {
                                        "rx": 0,
                                        "ry": 0,
                                        "type": "Rect",
                                        "version": "6.5.4",
                                        "originX": "left",
                                        "originY": "top",
                                        "left": 200.9333,
                                        "top": 118.9348,
                                        "width": 618.7947,
                                        "height": 339.8137,
                                        "fill": "#2ec5d9",
                                        "stroke": "#e01919",
                                        "strokeWidth": 0.3,
                                        "strokeDashArray": null,
                                        "strokeLineCap": "butt",
                                        "strokeDashOffset": 0,
                                        "strokeLineJoin": "miter",
                                        "strokeUniform": false,
                                        "strokeMiterLimit": 4,
                                        "scaleX": 1,
                                        "scaleY": 1,
                                        "angle": 0,
                                        "flipX": false,
                                        "flipY": false,
                                        "opacity": 1,
                                        "shadow": null,
                                        "visible": true,
                                        "backgroundColor": "",
                                        "fillRule": "nonzero",
                                        "paintFirst": "fill",
                                        "globalCompositeOperation": "source-over",
                                        "skewX": 0,
                                        "skewY": 0
                                   },
                                   {
                                        "fontSize": 12,
                                        "fontWeight": 300,
                                        "fontFamily": "Arial",
                                        "fontStyle": "normal",
                                        "lineHeight": 1.16,
                                        "text": "Hi, I'm DEMO",
                                        "charSpacing": 0,
                                        "textAlign": "left",
                                        "styles": [],
                                        "pathStartOffset": 0,
                                        "pathSide": "left",
                                        "pathAlign": "baseline",
                                        "underline": false,
                                        "overline": false,
                                        "linethrough": false,
                                        "textBackgroundColor": "",
                                        "direction": "ltr",
                                        "minWidth": 20,
                                        "splitByGrapheme": false,
                                        "type": "Textbox",
                                        "version": "6.5.4",
                                        "originX": "left",
                                        "originY": "top",
                                        "left": 281.9065,
                                        "top": 253.8608,
                                        "width": 90.3819,
                                        "height": 13.56,
                                        "fill": "#2ec5d9",
                                        "stroke": "#e3d10b",
                                        "strokeWidth": 0.5,
                                        "strokeDashArray": null,
                                        "strokeLineCap": "butt",
                                        "strokeDashOffset": 0,
                                        "strokeLineJoin": "miter",
                                        "strokeUniform": false,
                                        "strokeMiterLimit": 4,
                                        "scaleX": 6.2464,
                                        "scaleY": 6.2464,
                                        "angle": 0,
                                        "flipX": false,
                                        "flipY": false,
                                        "opacity": 1,
                                        "shadow": null,
                                        "visible": true,
                                        "backgroundColor": "",
                                        "fillRule": "nonzero",
                                        "paintFirst": "fill",
                                        "globalCompositeOperation": "source-over",
                                        "skewX": 0,
                                        "skewY": 0
                                   }
                              ]
                         }
                    </current_canvas>

                    <user_query>
                         Change the background color of the rectangle to blue and the text to white.
                    </user_query>

                    <result>
                         {
                              "version": "6.5.4",
                              "objects": [
                                   {
                                        "rx": 0,
                                        "ry": 0,
                                        "type": "Rect",
                                        "version": "6.5.4",
                                        "originX": "left",
                                        "originY": "top",
                                        "left": 228.924,
                                        "top": 329.8192,
                                        "width": 618.7947,
                                        "height": 339.8137,
                                        "fill": "#0000FF",
                                        "stroke": "#0000FF",
                                        "strokeWidth": 0.5,
                                        "strokeDashArray": null,
                                        "strokeLineCap": "butt",
                                        "strokeDashOffset": 0,
                                        "strokeLineJoin": "miter",
                                        "strokeUniform": false,
                                        "strokeMiterLimit": 4,
                                        "scaleX": 1,
                                        "scaleY": 1,
                                        "angle": 0,
                                        "flipX": false,
                                        "flipY": false,
                                        "opacity": 1,
                                        "shadow": null,
                                        "visible": true,
                                        "backgroundColor": "",
                                        "fillRule": "nonzero",
                                        "paintFirst": "fill",
                                        "globalCompositeOperation": "source-over",
                                        "skewX": 0,
                                        "skewY": 0
                                   },
                                   {
                                        "fontSize": 12,
                                        "fontWeight": 300,
                                        "fontFamily": "Arial",
                                        "fontStyle": "normal",
                                        "lineHeight": 1.16,
                                        "text": "Hi, I'm DEMO",
                                        "charSpacing": 0,
                                        "textAlign": "left",
                                        "styles": [],
                                        "pathStartOffset": 0,
                                        "pathSide": "left",
                                        "pathAlign": "baseline",
                                        "underline": false,
                                        "overline": false,
                                        "linethrough": false,
                                        "textBackgroundColor": "",
                                        "direction": "ltr",
                                        "minWidth": 20,
                                        "splitByGrapheme": false,
                                        "type": "Textbox",
                                        "version": "6.5.4",
                                        "originX": "left",
                                        "originY": "top",
                                        "left": 309.8972,
                                        "top": 465.7447,
                                        "width": 90.3819,
                                        "height": 13.56,
                                        "fill": "#2ec5d9",
                                        "stroke": "#ffffff",
                                        "strokeWidth": 0.5,
                                        "strokeDashArray": null,
                                        "strokeLineCap": "butt",
                                        "strokeDashOffset": 0,
                                        "strokeLineJoin": "miter",
                                        "strokeUniform": false,
                                        "strokeMiterLimit": 4,
                                        "scaleX": 6.2464,
                                        "scaleY": 6.2464,
                                        "angle": 0,
                                        "flipX": false,
                                        "flipY": false,
                                        "opacity": 1,
                                        "shadow": null,
                                        "visible": true,
                                        "backgroundColor": "",
                                        "fillRule": "nonzero",
                                        "paintFirst": "fill",
                                        "globalCompositeOperation": "source-over",
                                        "skewX": 0,
                                        "skewY": 0
                                   }
                              ]
                         }
                    </result>
               </example>

          Here is the current canvas JSON:
               <current_canvas>
                    ${currCanvas}
               </current_canvas>

          Here is the user query:
               <user_query>
                    ${userQuery}
               </user_query>
     `;
};

module.exports = {
    getGenerateWithAIPrompt,
};
