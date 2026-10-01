import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Lazy/safe initialization of Gemini AI
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString(),
  });
});

// Main Analysis Endpoint
app.post("/api/analyze", async (req: Request, res: Response) => {
  const reqStartTime = Date.now();
  const MAX_AI_BUDGET_MS = 22000; // 22-second hard budget to guarantee response before 30-second client limit

  try {
    const { imageBase64, mimeType = "image/jpeg", userGoal = "create", textPrompt = "" } = req.body;
    
    // Robust extraction of base64 data and mimeType from any data URI format
    let cleanBase64: string | null = null;
    let normalizedMime = "image/jpeg";

    if (imageBase64 && typeof imageBase64 === "string") {
      if (imageBase64.includes(",")) {
        const [header, data] = imageBase64.split(",");
        cleanBase64 = data ? data.trim() : null;
        const match = header.match(/data:([^;]+);base64/i);
        if (match && match[1]) {
          normalizedMime = match[1].toLowerCase();
        }
      } else {
        cleanBase64 = imageBase64.trim();
        if (mimeType) normalizedMime = mimeType.toLowerCase();
      }
    }

    const validMimes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
    if (!validMimes.includes(normalizedMime)) {
      normalizedMime = "image/jpeg";
    }

    // 1. Request started log
    console.log(
      `[Analysis] Request started: mimeType=${normalizedMime}, hasImage=${Boolean(cleanBase64)}, userGoal=${userGoal}, notes="${(textPrompt || "").slice(0, 60)}"`
    );

    const ai = getGenAI();

    if (!ai) {
      console.warn("[Analysis] Fallback activated: GEMINI_API_KEY is not configured");
      const fallbackData: any = generateFallbackAnalysis(textPrompt || (cleanBase64 ? "Identified Object" : "Household Object"), userGoal);
      fallbackData.id = "fallback-" + Date.now();
      fallbackData.timestamp = Date.now();
      fallbackData.sourceType = cleanBase64 ? "user_upload" : "text_prompt";
      if (imageBase64) fallbackData.imageUrl = imageBase64;
      if (textPrompt) fallbackData.userNotes = textPrompt;
      fallbackData.isHighDemandFallback = true;
      fallbackData.highDemandNotice = "Live AI API key not configured. Displaying instant circular pathways for your item.";

      console.log(`[Analysis] Final result returned: source=local-engine, itemName="${fallbackData.itemName}", isHighDemandFallback=true`);
      return res.status(200).json({
        success: true,
        source: "local-engine",
        isHighDemandFallback: true,
        highDemandNotice: fallbackData.highDemandNotice,
        analysis: fallbackData,
      });
    }

    const systemPrompt = `You are SecondLife AI, an expert AI circular-economy analyst, material scientist, and upcycling master with advanced visual recognition and deep knowledge of Ghanaian and global circular ecosystems.

PRIMARY DIRECTIVE:
You are analyzing a REAL user-provided item. Inspect the CURRENT uploaded image directly using your visual recognition capability.
Do NOT rely on canned or preset data. Do NOT assume the object is something specific if the image is ambiguous or unclear.

VISUAL IDENTIFICATION REQUIREMENTS:
1. Object Type: Detect the exact physical object visible in the image (e.g., 'Broken Monobloc Plastic Chair', 'Worn Radial Car Tyre', 'Faded Cotton Graphic T-Shirt', 'Glass Beverage Bottle', etc.).
2. Visible Material: Identify the primary material and sub-materials by visual texture, gloss, weave, or molding seams (e.g., Polypropylene #5, Vulcanized Rubber with steel belt, 100% Ring-spun Cotton, Soda-lime Glass).
3. Apparent Condition: Inspect visible wear, structural cracks, puncturing, tears, stains, mold, oxidation, or fading.
4. Identification Confidence:
   - "High": The object is clear, in focus, well-lit, and unmistakably identifiable.
   - "Medium": The object is partially visible, angled, or has minor visual ambiguities.
   - "Low": The image is blurry, dark, low-resolution, ambiguous, or the item cannot be discerned with certainty.
5. MANDATORY LOW-CONFIDENCE SAFETY RULE:
   If confidence is "Low":
   - Clearly state in "confidenceNote": "Identification is uncertain. Please upload a clearer image under good lighting or provide additional details."
   - Set "itemName" to a cautious general descriptor (e.g. "Unidentified Object / Unclear Shape").
   - Do NOT generate highly specific, intricate, or dangerous repair, cutting, or recycling instructions based on an uncertain identification. Instead, provide safe exploratory inspection steps, cleaning advice, and verification instructions.

SAFETY & RESPONSIBLE PRINCIPLES:
1. Comprehensive Safety Layer:
   - Identify chemical contamination (oil, pesticides, industrial solvents).
   - Identify electrical hazards (frayed cords, capacitors, shock risk).
   - Identify sharp hazards (broken glass, razor edges, jagged plastic, rusty nails).
   - Identify structural instability (e.g., cracked chair collapsing under weight).
   - Food-contact suitability: Strictly warn NEVER to use chemical/motor oil containers for food, drinking water, or cooking.
   - Set "isHazardousDisposalRecommended": true if reuse poses toxic or electrical danger.
2. Responsible Resale Pricing:
   - Always set "priceDisclaimer": "Indicative resale value — verify current local market prices. Actual prices vary significantly by physical condition, location, and buyer."
3. Realistic Community Guidance:
   - Never invent nonexistent local businesses, recyclers, or collection shops.
   - Use: "Check with your local assembly or municipal waste management department", "Visit registered scrap dealers or community recycling collection points", "Confirm acceptance criteria before dropping off".
4. Grounded Qualitative Impact:
   - Do NOT invent CO2, water, or diverted kg numbers.
   - Set "hasVerifiedData": false, set quantitative fields to null, and provide "qualitativeImpact": "Environmental impact: Potential waste reduction through reuse" and "dataSourceOrMethodology": "Impact estimate unavailable without verified lifecycle data."

SCHEMA REQUIREMENTS:
Generate a JSON response strictly complying with this schema:
{
  "itemName": string (Exact item identified from the image),
  "objectCategory": string,
  "primaryMaterial": string,
  "allMaterials": [string],
  "lifecycleStatus": "reusable" | "repairable" | "upcyclable" | "recyclable" | "disposable",
  "conditionAssessment": string,
  "confidence": "High" | "Medium" | "Low",
  "confidenceNote": string,
  "ghanaContextNotes": string,
  
  "safetyAssessment": {
    "overallRisk": "Low Risk" | "Caution Required" | "High Risk / Hazardous",
    "hazardsDetected": [string],
    "foodContactWarning": string,
    "safeHandlingAdvice": [string],
    "isHazardousDisposalRecommended": boolean
  },

  "repair": {
    "possibleDamage": string,
    "repairFeasibility": "Easy" | "Moderate" | "Advanced" | "Professional Only",
    "toolsAndMaterials": [string],
    "estimatedTime": string,
    "estimatedCostGHS": string,
    "repairSteps": [string],
    "safetyPrecautions": [string]
  },
  
  "upcycleIdeas": [
    {
      "id": string,
      "title": string,
      "description": string,
      "difficulty": "Beginner" | "Intermediate" | "Advanced",
      "timeRequired": string,
      "materialsNeeded": [string],
      "steps": [string],
      "category": "Home & Garden" | "Furniture" | "Art & Decor" | "Utility & Storage" | "Fashion & Accessories",
      "ghanaRelevance": string,
      "potentialEarningsGHS": string
    }
  ],
  
  "resell": {
    "hasResaleValue": boolean,
    "productTitle": string,
    "marketplaceDescription": string,
    "conditionGrade": string,
    "suggestedPriceGHS": { "min": number, "max": number },
    "suggestedPriceUSD": { "min": number, "max": number },
    "priceDisclaimer": "Indicative resale value — verify current local market prices. Actual prices vary by condition, location, and buyer.",
    "keywords": [string],
    "recommendedPlatforms": [string],
    "listingTips": [string]
  },
  
  "donate": {
    "isDonatable": boolean,
    "targetOrganizations": [
      {
        "type": string,
        "suitability": string,
        "ghanaExamples": string,
        "contactAdvice": string
      }
    ],
    "preparationTips": [string]
  },
  
  "recycle": {
    "materialType": string,
    "recyclingCategory": string,
    "recyclabilityRating": "High" | "Moderate" | "Specialized Facility Required" | "Not Recyclable",
    "preparationSteps": [string],
    "disposalAndRecyclingOptions": [string],
    "ghanaEcosystemNotes": string
  },
  
  "environmentalImpact": {
    "hasVerifiedData": false,
    "qualitativeImpact": "Environmental impact: Potential waste reduction through reuse",
    "dataSourceOrMethodology": "Impact estimate unavailable without verified lifecycle data.",
    "impactExplanation": string,
    "circularEconomyPrinciple": string,
    "wasteDivertedKg": null,
    "co2SavedKg": null,
    "waterSavedLiters": null
  },
  
  "goalRecommendations": {
    "money": {
      "goal": "money",
      "headline": string,
      "summary": string,
      "actionSteps": [string],
      "highlightedBenefit": string,
      "resourceLinksOrTips": [string]
    },
    "create": {
      "goal": "create",
      "headline": string,
      "summary": string,
      "actionSteps": [string],
      "highlightedBenefit": string,
      "resourceLinksOrTips": [string]
    },
    "home": {
      "goal": "home",
      "headline": string,
      "summary": string,
      "actionSteps": [string],
      "highlightedBenefit": string,
      "resourceLinksOrTips": [string]
    },
    "donate": {
      "goal": "donate",
      "headline": string,
      "summary": string,
      "actionSteps": [string],
      "highlightedBenefit": string,
      "resourceLinksOrTips": [string]
    },
    "recycle": {
      "goal": "recycle",
      "headline": string,
      "summary": string,
      "actionSteps": [string],
      "highlightedBenefit": string,
      "resourceLinksOrTips": [string]
    }
  }
}`;

    const parts: any[] = [];
    if (cleanBase64) {
      parts.push({
        inlineData: {
          mimeType: normalizedMime,
          data: cleanBase64,
        },
      });
    }

    parts.push({
      text: `Identify this item thoroughly and provide comprehensive circular pathways for repair, creative transformation (3-5 ideas), resale with Ghanaian Cedi (GH₵) & USD price ranges, donation channels, recycling instructions, environmental impact metrics, and goal-specific action plans (Money, Create, Home, Donate, Recycle). ${
        textPrompt ? `User notes / item details: ${textPrompt}.` : ""
      } Current primary user goal: ${userGoal}. Output pure valid JSON strictly complying with schema.`,
    });

    // Cascade across available models with strict budget and timeout per attempt
    const modelsToTry = [
      "gemini-3.8-flash",
      "gemini-3.1-flash-lite",
      "gemini-flash-latest",
    ];

    let responseText = "";
    let usedModel = "gemini-3.8-flash";
    let parsedData: any = null;

    for (const modelName of modelsToTry) {
      const budgetLeft = MAX_AI_BUDGET_MS - (Date.now() - reqStartTime);
      if (budgetLeft < 3000) {
        // Budget exhausted: break cascade and invoke fallback immediately
        break;
      }

      let attempts = 0;
      const maxAttempts = 2;

      while (attempts < maxAttempts) {
        attempts++;
        const currentBudgetLeft = MAX_AI_BUDGET_MS - (Date.now() - reqStartTime);
        if (currentBudgetLeft < 2500) {
          break;
        }

        const callTimeoutMs = Math.min(8000, currentBudgetLeft);

        // 2. Model attempted log
        console.log(`[Analysis] Model attempted: ${modelName} (attempt ${attempts}/${maxAttempts})`);

        try {
          // Wrapped call with timeout to prevent hanging connections
          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout after ${callTimeoutMs}ms`)), callTimeoutMs)
          );

          const apiCall = ai.models.generateContent({
            model: modelName,
            contents: parts,
            config: {
              systemInstruction: systemPrompt,
              responseMimeType: "application/json",
            },
          });

          const response: any = await Promise.race([apiCall, timeoutPromise]);

          if (response?.text) {
            let cleaned = response.text.trim();
            if (cleaned.startsWith("```json")) {
              cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
            } else if (cleaned.startsWith("```")) {
              cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
            }
            const rawParsed = JSON.parse(cleaned);
            const baselineFallback = generateFallbackAnalysis(
              rawParsed?.itemName || textPrompt || (cleanBase64 ? "Uploaded Object" : "Household Object"),
              userGoal
            );
            parsedData = normalizeAnalysisResult(rawParsed, baselineFallback);
            responseText = response.text;
            usedModel = modelName;
            break; // Success with this model!
          }
        } catch (err: any) {
          // 3. Model failed log
          console.warn(`[Analysis] Model failed: ${modelName} (attempt ${attempts}) - ${err?.message || err}`);

          const status = err?.status || err?.code || err?.statusCode;
          const isHighDemandOrTimeout =
            status === 503 ||
            status === 429 ||
            String(err?.message || "").includes("high demand") ||
            String(err?.message || "").includes("UNAVAILABLE") ||
            String(err?.message || "").includes("RESOURCE_EXHAUSTED") ||
            String(err?.message || "").includes("quota") ||
            String(err?.message || "").includes("Timeout");

          const remainingAfterError = MAX_AI_BUDGET_MS - (Date.now() - reqStartTime);

          if (isHighDemandOrTimeout && attempts < maxAttempts && remainingAfterError > 3500) {
            const delayMs = Math.min(600 * Math.pow(2, attempts - 1), 2000);
            // 4. Retry attempted log
            console.log(`[Analysis] Retry attempted: ${modelName} with exponential backoff ${delayMs}ms`);
            await new Promise((resolve) => setTimeout(resolve, delayMs));
          } else {
            // Move to next model in cascade
            break;
          }
        }
      }

      if (parsedData) {
        break; // Successfully received and parsed response
      }
    }

    // 5. Fallback activated if all external AI models failed or timed out
    if (!parsedData) {
      console.warn("[Analysis] Fallback activated: external AI cascade exhausted or timed out");
      const baselineFallback = generateFallbackAnalysis(
        textPrompt || (cleanBase64 ? "Uploaded Object" : "Household Object"),
        userGoal
      );
      parsedData = normalizeAnalysisResult(baselineFallback, baselineFallback);
      parsedData.isHighDemandFallback = true;
      parsedData.highDemandNotice =
        "Live AI analysis temporarily unavailable. Instant circular pathways have been activated for your item.";
      usedModel = "fallback-circular-engine";
    }

    // Attach unique ID and metadata
    parsedData.id = "analysis-" + Date.now();
    parsedData.timestamp = Date.now();
    parsedData.sourceType = cleanBase64 ? "user_upload" : "text_prompt";
    if (imageBase64) {
      parsedData.imageUrl = imageBase64;
    }
    if (textPrompt) {
      parsedData.userNotes = textPrompt;
    }

    // 6. Final result returned log
    console.log(
      `[Analysis] Final result returned: source=${usedModel}, itemName="${parsedData?.itemName}", isHighDemandFallback=${Boolean(parsedData?.isHighDemandFallback)}`
    );

    return res.status(200).json({
      success: true,
      source: usedModel,
      isHighDemandFallback: Boolean(parsedData.isHighDemandFallback),
      highDemandNotice: parsedData.highDemandNotice,
      analysis: parsedData,
    });
  } catch (error: any) {
    console.error("[Analysis] Critical error in analyze route:", error);
    // 5. Fallback activated log on critical exception
    console.warn("[Analysis] Fallback activated: unexpected server exception caught");

    try {
      const fallback: any = generateFallbackAnalysis(
        req.body?.textPrompt || (req.body?.imageBase64 ? "Uploaded Item" : "Household Item"),
        req.body?.userGoal || "create"
      );
      const normalizedFallback = normalizeAnalysisResult(fallback, fallback);
      normalizedFallback.id = "fallback-" + Date.now();
      normalizedFallback.timestamp = Date.now();
      normalizedFallback.sourceType = req.body?.imageBase64 ? "user_upload" : "text_prompt";
      if (req.body?.imageBase64) {
        normalizedFallback.imageUrl = req.body.imageBase64;
      }
      if (req.body?.textPrompt) {
        normalizedFallback.userNotes = req.body.textPrompt;
      }
      normalizedFallback.isHighDemandFallback = true;
      normalizedFallback.highDemandNotice =
        "Live AI analysis temporarily unavailable. Displaying instant circular pathways for your item.";

      // 6. Final result returned log
      console.log(
        `[Analysis] Final result returned: source=emergency-fallback, itemName="${normalizedFallback?.itemName}", isHighDemandFallback=true`
      );

      return res.status(200).json({
        success: true,
        source: "emergency-fallback",
        isHighDemandFallback: true,
        highDemandNotice: normalizedFallback.highDemandNotice,
        analysis: normalizedFallback,
      });
    } catch (fallbackErr) {
      console.error("[Analysis] Fallback generation failure:", fallbackErr);
      return res.status(500).json({
        success: false,
        error: "Analysis temporarily unavailable. Please try again, or use a Demo Object.",
      });
    }
  }
});

// Follow-up DIY / Goal Advisor Endpoint
app.post("/api/ask-advice", async (req: Request, res: Response) => {
  try {
    const { itemName, question, currentGoal } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        answer: `For ${itemName}, the most effective approach for "${currentGoal}" is to inspect the structural seams, prepare safe cutting tools, and utilize local materials like sandpaper, cordage, and non-toxic sealants. In Ghana, check local hardware retailers for affordable fasteners.`,
      });
    }

    const adviceModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-3.1-pro-preview"];
    let answerText = "";

    for (const model of adviceModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: `You are the SecondLife AI Assistant. The user is asking about transforming or recycling: "${itemName}".
User's chosen goal is: "${currentGoal}".
User's question: "${question}".
Provide a concise, practical, inspiring answer in 2-3 friendly paragraphs with actionable steps, safety tips, and Ghanaian context where relevant.`,
        });
        if (response?.text) {
          answerText = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`Advice model ${model} error:`, err?.message || err);
      }
    }

    return res.json({
      answer:
        answerText ||
        `For ${itemName}, start by thoroughly cleaning all surfaces and inspecting structural seams. When pursuing "${currentGoal}", ensure you wear protective gloves and use simple hand tools like sandpaper and utility knives. In Ghana, you can find affordable fasteners and replacement materials at local hardware shops or timber markets.`,
    });
  } catch (err: any) {
    return res.json({
      answer:
        "Start by thoroughly cleaning the object. For repairs or crafting, ensure you have basic tools like sandpaper, utility knife, and protective eyewear.",
    });
  }
});

function generateFallbackAnalysis(itemHint: string = "", userGoal: string = "create") {
  const hintLower = itemHint.toLowerCase();
  let title = itemHint.trim() ? itemHint : "Household Container / Object";

  // Category detection
  const isBottle =
    hintLower.includes("bottle") ||
    hintLower.includes("beverage") ||
    hintLower.includes("flask") ||
    hintLower.includes("drink") ||
    hintLower.includes("water") ||
    hintLower.includes("soda") ||
    hintLower.includes("coke") ||
    hintLower.includes("fanta") ||
    hintLower.includes("sprite") ||
    hintLower.includes("jar") ||
    hintLower.includes("plastic bottle") ||
    hintLower.includes("glass bottle");
  const isTextile = hintLower.includes("shirt") || hintLower.includes("cloth") || hintLower.includes("fabric") || hintLower.includes("textile");
  const isTyre = hintLower.includes("tyre") || hintLower.includes("tire") || hintLower.includes("rubber");
  const isChair = hintLower.includes("chair") || hintLower.includes("seat") || hintLower.includes("furniture");

  let primaryMaterial = "Rigid Polypropylene (PP #5)";
  let objectCategory = "Household Reusable";
  let upcycleIdeas = [
    {
      id: "idea-planter",
      title: "Sub-Irrigated Compound Planter",
      description: "Transform the vessel into a self-watering planter for fresh herbs, chili peppers, or flowering ornamentals.",
      difficulty: "Beginner",
      timeRequired: "20 mins",
      materialsNeeded: ["Drill or hot nail", "Potting soil", "Drainage gravel", "Plant seedling"],
      steps: [
        "Create drainage holes 3cm from base.",
        "Add 2cm layer of coarse gravel for aeration.",
        "Fill with nutrient-rich compost soil.",
        "Plant your seeds and position in sunlit veranda."
      ],
      category: "Home & Garden",
      ghanaRelevance: "Ideal for compound walls in Accra or Kumasi.",
      potentialEarningsGHS: "Indicative: GH₵ 30 - 50"
    },
    {
      id: "idea-organizer",
      title: "Modular Workshop & Kitchen Caddy",
      description: "Section or mount the object into a durable multi-compartment organizer for tools, cutlery, or craft supplies.",
      difficulty: "Beginner",
      timeRequired: "25 mins",
      materialsNeeded: ["Utility knife", "Sandpaper", "Dividers"],
      steps: [
        "Measure and cut clean openings.",
        "Sand down rough contact edges.",
        "Insert cardboard or plastic partitions.",
        "Label compartments for fast sorting."
      ],
      category: "Utility & Storage",
      ghanaRelevance: "Popular among local tailors, mechanics, and household keepers.",
      potentialEarningsGHS: "Indicative: GH₵ 25 - 40"
    },
    {
      id: "idea-lamp",
      title: "Artisanal Compound Ambient Lantern",
      description: "Perforate decorative geometric patterns on the body and install an energy-efficient warm LED bulb.",
      difficulty: "Intermediate",
      timeRequired: "45 mins",
      materialsNeeded: ["Soldering iron / drill", "LED light kit or solar garden light", "Acrylic paint"],
      steps: [
        "Trace traditional Adinkra or geometric symbols on surface.",
        "Perforate tiny holes along the lines to let light filter through.",
        "Coat in rich terracotta or brass tone paint.",
        "Insert solar light cap or LED filament."
      ],
      category: "Art & Decor",
      ghanaRelevance: "Adds stunning outdoor ambiance to verandas and patio gatherings.",
      potentialEarningsGHS: "Indicative: GH₵ 55 - 90"
    }
  ];

  let hazards = [
    "Surface dust and particulate residue",
    "Potential sharp edges or splinters during cutting / disassembly",
    "Unverified for food or drinking water contact"
  ];
  let foodContactWarning = "Never use containers previously storing industrial fluids, dirty liquids, or unknown substances for food, cooking, or drinking water.";

  if (isBottle) {
    const isPlastic = !hintLower.includes("glass");
    primaryMaterial = isPlastic ? "Polyethylene Terephthalate (PET #1)" : "Flint / Amber Soda-Lime Glass";
    objectCategory = "Beverage Packaging & Containers";
    title = itemHint.trim() ? itemHint : (isPlastic ? "Plastic Beverage Bottle" : "Glass Bottle");
    hazards = [
      "Sharp jagged rim or cuts if severed or fractured",
      "Chemical leaching if exposed to direct flames or open burning",
      "Choking hazard from loose bottle caps around toddlers"
    ];
    foodContactWarning = "If repurposing for storing drinking water or fresh juices, ensure the bottle originally contained food/beverages and wash thoroughly with hot soapy water. Never store food or drink in bottles previously used for chemicals, paint, kerosene, or motor oil.";
    upcycleIdeas = [
      {
        id: "idea-bottle-irrigation",
        title: "Sub-Surface Drip Irrigation Feeder",
        description: "Invert the water-filled bottle into root soil or planter boxes to provide slow, steady hydration for plants.",
        difficulty: "Beginner",
        timeRequired: "10 mins",
        materialsNeeded: ["Hot pin or small nail", "Water", "Planter box or garden bed"],
        steps: [
          "Wash the bottle thoroughly to remove any sweet beverage residue.",
          "Perforate 2-3 tiny pinholes in the screw cap.",
          "Fill with clean water and securely tighten the cap.",
          "Invert and insert neck 5cm deep into moist compound soil next to plant roots."
        ],
        category: "Agriculture & Gardening",
        ghanaRelevance: "Keeps compound pepper, garden egg, and tomato plants hydrated during hot dry seasons in Accra or Tamale.",
        potentialEarningsGHS: "Indicative: GH₵ 15 - 30 (set of 3)"
      },
      {
        id: "idea-bottle-planter",
        title: "Self-Watering Seedling Nursery",
        description: "Cut bottle horizontally into two halves; invert top funnel with a cotton wick into bottom water reservoir.",
        difficulty: "Beginner",
        timeRequired: "15 mins",
        materialsNeeded: ["Utility scissors / craft knife", "Cotton fabric strip or twine", "Potting soil", "Seedlings"],
        steps: [
          "Cut bottle cleanly in half approximately 10cm from base.",
          "Drill or poke hole in cap and thread a 15cm cotton wick through it.",
          "Invert top half like a funnel inside the base reservoir.",
          "Fill base with water, add rich organic compost to top funnel, and plant nursery seeds."
        ],
        category: "Urban Farming",
        ghanaRelevance: "Commonly used in urban micro-gardens and rooftop nurseries across Kumasi and Tema.",
        potentialEarningsGHS: "Indicative: GH₵ 20 - 45"
      },
      {
        id: "idea-bottle-organizer",
        title: "Modular Compound & Workshop Storage Jar",
        description: "Trim neck to create sturdy cylindrical containers for sorting screws, nails, sewing buttons, or dry spices.",
        difficulty: "Beginner",
        timeRequired: "12 mins",
        materialsNeeded: ["Utility knife", "Sandpaper or hot iron edge", "Masking tape label"],
        steps: [
          "Cut off top tapering cone cleanly with craft knife.",
          "Smooth the cut edge by briefly touching against a warm iron or sanding with fine grit sandpaper.",
          "Attach a visible label indicating contents.",
          "Stack or place on workshop shelves or kitchen racks."
        ],
        category: "Storage & Organization",
        ghanaRelevance: "Indispensable organizer for tailoring apprentices, electronics repairers, and carpenters across Ghana.",
        potentialEarningsGHS: "Indicative: GH₵ 10 - 25"
      }
    ];
  } else if (isTextile) {
    primaryMaterial = "100% Cotton / Knit Fabric";
    objectCategory = "Apparel & Textiles";
    hazards = [
      "Frayed fibers and seam unravelling",
      "Dust and lint inhalation during heavy cutting",
      "Dye bleeding if washed with light fabrics"
    ];
    foodContactWarning = "Not suitable for storing uncovered moist food. Launder thoroughly before any household use.";
    upcycleIdeas = [
      {
        id: "idea-tote",
        title: "No-Sew Market Tote Bag",
        description: "Transform the T-shirt into a sturdy zero-waste grocery tote bag by cutting off sleeves and tying bottom fringes.",
        difficulty: "Beginner",
        timeRequired: "15 mins",
        materialsNeeded: ["Fabric scissors", "Ruler"],
        steps: [
          "Cut off both sleeves along the inner seam line.",
          "Cut out a wider neckline to create comfortable shoulder straps.",
          "Cut 5cm vertical fringe strips along the bottom hemline.",
          "Tightly double-knot matching front and back fringes together to seal the bottom."
        ],
        category: "Fashion & Utility",
        ghanaRelevance: "Perfect alternative to single-use black polyethene carrier bags at Makola or Kejetia markets.",
        potentialEarningsGHS: "Indicative: GH₵ 20 - 35"
      },
      {
        id: "idea-cleaning-cloth",
        title: "Braided Kitchen Wipe & Floor Duster",
        description: "Cut soft absorbent cotton fabric into modular cleaning squares or braided mop pads for household chores.",
        difficulty: "Beginner",
        timeRequired: "10 mins",
        materialsNeeded: ["Scissors"],
        steps: [
          "Cut the body panel into 25cm x 25cm uniform squares.",
          "Hem or leave raw edges (cotton knit naturally curls without fraying excessively).",
          "Store in a clean container next to water points for washing compound tiles."
        ],
        category: "Utility & Cleaning",
        ghanaRelevance: "Saves money on disposable paper napkins or commercial imported microfibers.",
        potentialEarningsGHS: "Indicative: GH₵ 10 - 20"
      },
      {
        id: "idea-cushion",
        title: "Pillow Stuffing & Patchwork Cushion Cover",
        description: "Shred worn fabric into ultra-soft organic stuffing for lounge pillows or combine contrasting panels for a patchwork seat pad.",
        difficulty: "Intermediate",
        timeRequired: "40 mins",
        materialsNeeded: ["Needle & thread or sewing machine", "Fabric scraps"],
        steps: [
          "Shred body fabric into 2cm strips to serve as resilient cushion batting.",
          "Square off remaining decorative graphic panels.",
          "Stitch edges together with an envelope closure.",
          "Pack firmly with textile batting and sew closed."
        ],
        category: "Home & Decor",
        ghanaRelevance: "Great for wooden armchairs and veranda seating across Ghanaian homes.",
        potentialEarningsGHS: "Indicative: GH₵ 40 - 70"
      }
    ];
  } else if (isTyre) {
    primaryMaterial = "Vulcanized Synthetic and Natural Rubber";
    objectCategory = "Automotive & Rubber Products";
    hazards = [
      "Protruding steel wire strands that can cause deep puncture lacerations",
      "Stagnant water retention breeding mosquitoes (malaria hazard)",
      "Leaching of zinc and petroleum hydrocarbons into soil",
      "Toxic fumes if ever exposed to heat or fire"
    ];
    foodContactWarning = "CRITICAL: Never grow edible vegetables or store drinking water in direct contact with tyres due to chemical leaching. Always use an impermeable non-toxic liner.";
    upcycleIdeas = [
      {
        id: "idea-tyre-planter",
        title: "Raised Compound Flower Planter",
        description: "Clean, elevate, and coat the tyre with vibrant weatherproof paint to create a statement garden planter.",
        difficulty: "Beginner",
        timeRequired: "30 mins",
        materialsNeeded: ["Wire brush & detergent", "Exterior oil-based or acrylic paint", "Heavy duty plastic liner", "Potting soil"],
        steps: [
          "Scrub thoroughly with wire brush and soapy water to remove road grease and brake dust.",
          "Drill 4 large drainage holes in the bottom sidewall to prevent stagnant water retention.",
          "Paint exterior in bright vibrant colors or traditional patterns.",
          "Line inside with thick plastic liner, add potting soil, and plant flowering bougainvillea or ornamental shrubs."
        ],
        category: "Garden & Landscape",
        ghanaRelevance: "A beloved sight outside shops, schools, and compounds across Ghana.",
        potentialEarningsGHS: "Indicative: GH₵ 40 - 80"
      },
      {
        id: "idea-tyre-ottoman",
        title: "Rustic Jute Rope Veranda Ottoman",
        description: "Wrap the perimeter in natural jute or sisal rope and cap with a round plywood seat to build a sturdy outdoor stool.",
        difficulty: "Intermediate",
        timeRequired: "60 mins",
        materialsNeeded: ["15mm Manila or jute rope", "Contact adhesive", "Circular wood disc", "Padded fabric"],
        steps: [
          "Fasten two circular wooden panels to top and bottom of tyre with screws.",
          "Starting from center, spiral and glue thick jute rope over the entire outer face.",
          "Upholster the top wooden circle with foam and colorful Ghanaian fabric.",
          "Seal with clear varnish for weather resistance."
        ],
        category: "Furniture & Decor",
        ghanaRelevance: "Highly durable artisan furniture suitable for outdoor verandas, cafes, and compound lounges.",
        potentialEarningsGHS: "Indicative: GH₵ 90 - 160"
      },
      {
        id: "idea-tyre-fitness",
        title: "Community Fitness Agility Ring & Ground Stepper",
        description: "Install anchored ground tyres for athletic speed drills, schoolyard obstacle courses, or slam-ball resistance.",
        difficulty: "Beginner",
        timeRequired: "20 mins",
        materialsNeeded: ["Shovel", "Gravel", "Bright marking paint"],
        steps: [
          "Excavate half-depth trench in compound sand or lawn.",
          "Firmly pack tyre vertically or flat with gravel to eliminate standing water pockets.",
          "Coat with high-visibility reflective paint.",
          "Test footing stability before athletic use."
        ],
        category: "Fitness & Recreation",
        ghanaRelevance: "Commonly used in local community football pitches and boxing academies in Bukom.",
        potentialEarningsGHS: "Indicative: GH₵ 35 - 60"
      }
    ];
  } else if (isChair) {
    primaryMaterial = "Rigid Polypropylene (PP #5) / Molded Plastic";
    objectCategory = "Household Furniture";
    hazards = [
      "Sharp plastic splinters along cracked fracture lines",
      "Structural failure and collapse risk under human body weight",
      "UV embrittlement reducing tensile strength"
    ];
    foodContactWarning = "Surface may harbor grime; sanitize before placing any food-adjacent items.";
    upcycleIdeas = [
      {
        id: "idea-chair-planter",
        title: "Compound Flower Stand & Planter Cradle",
        description: "Cut out damaged seat center and nest an ornamental terracotta pot or bucket firmly into the frame.",
        difficulty: "Beginner",
        timeRequired: "25 mins",
        materialsNeeded: ["Handsaw or utility knife", "Sandpaper", "Planter bucket", "Spray paint"],
        steps: [
          "Carefully cut away cracked seat center following the inner rib curve.",
          "Sand down any rough or jagged plastic burs completely smooth.",
          "Apply spray paint to refresh UV-faded surface.",
          "Drop a round planter pot through the opening so its rim rests securely on the frame."
        ],
        category: "Home & Garden",
        ghanaRelevance: "Popular way to keep beautiful potted plants elevated off muddy compound ground during rainy season.",
        potentialEarningsGHS: "Indicative: GH₵ 35 - 65"
      },
      {
        id: "idea-chair-stool",
        title: "Reinforced Low Work Stool",
        description: "Trim broken backrest down to create a robust, low-profile squatting stool for kitchen and laundry chores.",
        difficulty: "Intermediate",
        timeRequired: "30 mins",
        materialsNeeded: ["Hacksaw", "Sandpaper", "Support brackets / screws"],
        steps: [
          "Saw off the damaged backrest flush with the seat base.",
          "Round and file the cut points to eliminate sharp pinch zones.",
          "Inspect legs and brace with zip-ties or metal strapping if cracked.",
          "Add non-slip rubber pads to foot bases."
        ],
        category: "Utility Furniture",
        ghanaRelevance: "Essential height for outdoor cooking, food prep, or washing clothes in Ghanaian households.",
        potentialEarningsGHS: "Indicative: GH₵ 25 - 45"
      },
      {
        id: "idea-chair-kids",
        title: "Children's Creative Activity Table Base",
        description: "Invert or modify the chair base to support a smooth tabletop for drawing, homework, and outdoor games.",
        difficulty: "Intermediate",
        timeRequired: "40 mins",
        materialsNeeded: ["Wood / plywood scrap", "Screws", "Screwdriver"],
        steps: [
          "Secure a flat square plywood board to the level seat base.",
          "Countersink screws to prevent snags.",
          "Paint board with chalkboard paint or bright enamel.",
          "Place in shaded veranda for study or play."
        ],
        category: "Children & Education",
        ghanaRelevance: "Affordable home study corner for students in residential areas.",
        potentialEarningsGHS: "Indicative: GH₵ 50 - 85"
      }
    ];
  }

  return {
    id: "fallback-" + Date.now(),
    timestamp: Date.now(),
    itemName: title,
    objectCategory,
    primaryMaterial,
    allMaterials: [primaryMaterial, "Surface Finish / Additives", "Fasteners / Reinforcements"],
    lifecycleStatus: "upcyclable",
    conditionAssessment: "Shows signs of wear and surface weathering, but base material remains structurally salvageable for secondary circular use.",
    confidence: "High",
    confidenceNote: "Identified based on object features. If this item differs, please confirm or provide a clearer photo.",
    ghanaContextNotes: "Readily repurposable in Ghanaian urban compounds, workshops, and markets where resourceful second-life circularity is celebrated.",
    safetyAssessment: {
      overallRisk: "Caution Required",
      hazardsDetected: hazards,
      foodContactWarning,
      safeHandlingAdvice: [
        "Wear gloves and eye protection when cutting, sawing, or cleaning",
        "Work in an open, well-ventilated compound or outdoor space",
        "Inspect stability and smooth all cut edges before putting into service"
      ],
      isHazardousDisposalRecommended: false
    },
    repair: {
      possibleDamage: isBottle ? "Label peeling, sticky residue, minor dent" : isChair ? "Cracked plastic joint or leg fatigue" : isTyre ? "Bald tread, surface rubber oxidation" : isTextile ? "Frayed hem, loose seam, surface discoloration" : "Superficial scratches, dusty residue, slight joint looseness.",
      repairFeasibility: isBottle ? "High" : "Moderate",
      toolsAndMaterials: isBottle ? ["Warm soapy water", "Soft brush / sponge", "Mineral oil or vinegar for glue removal"] : isTextile ? ["Fabric needle", "Matching cotton thread", "Scissors"] : isTyre ? ["Wire brush", "Detergent water", "Rubber patch kit"] : ["Reinforcement bracket", "Sandpaper", "Adhesive / wire ties"],
      estimatedTime: isBottle ? "5-10 mins" : "20-30 mins",
      estimatedCostGHS: isBottle ? "GH₵ 0 - 5" : "GH₵ 5 - 20",
      repairSteps: isBottle ? [
        "Soak in warm soapy water for 5 minutes to dissolve sticky residue and dirt.",
        "Scrub interior and exterior with soft brush.",
        "Rinse with clean water and air dry upside-down in shaded area.",
        "Inspect neck rim and seal for chips or cracks before repurposing."
      ] : [
        "Clean surface thoroughly to inspect underlying structural integrity.",
        "Smooth down sharp burrs or frayed fringes.",
        "Apply reinforcement fasteners, stitching, or structural strapping.",
        "Test stability under controlled conditions before full deployment."
      ],
      safetyPrecautions: ["Work in well-lit open space. Wear safety glasses or gloves during cutting."]
    },
    upcycleIdeas,
    resell: {
      hasResaleValue: true,
      productTitle: `Cleaned & Refurbished ${title} - Ready for Home & Garden Use`,
      marketplaceDescription: `Sturdy and versatile ${title}. Thoroughly cleaned, reinforced, and in sound condition. Ideal for home storage, compound utility, or DIY upcycling. Available for pickup or delivery.`,
      conditionGrade: "Good (Cleaned & Checked)",
      suggestedPriceGHS: isBottle ? { min: 5, max: 15 } : { min: 25, max: 60 },
      suggestedPriceUSD: isBottle ? { min: 0.5, max: 1.2 } : { min: 2.0, max: 5.0 },
      priceDisclaimer: "Indicative resale value — verify current local market prices. Actual prices vary by physical condition, location, and buyer.",
      keywords: [title.toLowerCase(), "cheap home item Accra", "refurbished Ghana", "second life item"],
      recommendedPlatforms: ["Jiji Ghana", "Tonaton", "Facebook Marketplace Ghana", "Local community noticeboards"],
      listingTips: ["Include clear photos from top and side angles with good natural lighting. State physical condition accurately."]
    },
    donate: {
      isDonatable: true,
      targetOrganizations: [
        {
          type: "Community Basic Schools & Nurseries",
          suitability: isBottle ? "Ideal for student science experiments, nursery seedling starters, and arts & crafts." : "Can be adapted for practical student learning, storage of learning aids, or garden nurseries.",
          ghanaExamples: "Local basic schools, municipal youth community centres",
          contactAdvice: "Check with the headteacher or school administration to confirm acceptance before dropping off."
        },
        {
          type: "Vocational & Artisan Apprenticeship Hubs",
          suitability: "Apprentices often utilize robust containers and materials for workshop parts storage.",
          ghanaExamples: "Mechanic clusters, carpentry workshops",
          contactAdvice: "Visit the workshop master during working hours to verify need."
        }
      ],
      preparationTips: ["Wipe clean and remove any personal marks or hazardous debris."]
    },
    recycle: {
      materialType: isBottle ? (hintLower.includes("glass") ? "Flint / Amber Container Glass" : "PET #1 Post-Consumer Polymer") : "Polymer / Secondary Composite Scrap",
      recyclingCategory: isBottle ? "Post-Consumer Beverage Packaging" : "Rigid Post-Consumer Scrap",
      recyclabilityRating: "High",
      preparationSteps: isBottle ? [
        "Empty all liquid and rinse thoroughly with clean water.",
        "Remove plastic cap and ring; sort caps separately if possible.",
        "Crush plastic bottles flat to reduce space during transportation."
      ] : [
        "Clean off grease, soil, and stickers.",
        "Separate any dissimilar metallic or rubber fasteners.",
        "Stack or crush flat to minimize storage volume."
      ],
      disposalAndRecyclingOptions: [
        "Check with your local assembly or municipal waste management department for scheduled collection points.",
        "Visit registered scrap dealers or community recycling collection points.",
        "Confirm acceptance criteria and cleanliness standards before dropping off."
      ],
      ghanaEcosystemNotes: isBottle ? "PET plastic bottles and glass containers are actively collected across Ghana by informal waste pickers, buyback aggregators (e.g. Coliba, Nelplast, Sesa Recycling), and brewery deposit schemes." : "Recycling collection hubs operate across urban centers in Ghana, where scrap aggregators accept cleaned sorted polymers."
    },
    environmentalImpact: {
      hasVerifiedData: false,
      qualitativeImpact: "Environmental impact: Potential waste reduction through reuse",
      dataSourceOrMethodology: "Impact estimate unavailable without verified lifecycle data.",
      wasteDivertedKg: null,
      co2SavedKg: null,
      waterSavedLiters: null,
      impactExplanation: "Extending this item's useful life prevents virgin raw material extraction and keeps municipal drainage channels clear from debris.",
      circularEconomyPrinciple: "Lifetime Extension & Waste-to-Resource Cascading"
    },
    goalRecommendations: {
      money: {
        goal: "money",
        headline: "Turn into Cash on Local Marketplaces",
        summary: "Clean thoroughly, capture clear photos in sunlight, and list on Jiji Ghana or WhatsApp business for quick turnover.",
        actionSteps: [
          "Wash and polish exterior.",
          "Take 3 bright photos.",
          "List with prompt response contact info."
        ],
        highlightedBenefit: "Generates instant cash while clearing compound clutter.",
        resourceLinksOrTips: ["Compare similar items on Jiji Ghana for competitive pricing"]
      },
      create: {
        goal: "create",
        headline: "Unleash Artistic Upcycling",
        summary: "Use paint, rope, or perforation to build a unique centerpiece that sparks conversation.",
        actionSteps: [
          "Sketch design idea.",
          "Prepare tools and adhesives.",
          "Apply protective UV topcoat."
        ],
        highlightedBenefit: "Zero-cost raw material for an authentic custom craft.",
        resourceLinksOrTips: ["Explore Adinkra geometric motifs for inspiration"]
      },
      home: {
        goal: "home",
        headline: "Functional Upgrade for Your Living Space",
        summary: "Integrate directly into your garden, kitchen, or veranda to organize daily essentials.",
        actionSteps: [
          "Sanitize interior.",
          "Position at point of need (kitchen, garden, compound)."
        ],
        highlightedBenefit: "Avoids purchasing costly new plastic or metal organizers.",
        resourceLinksOrTips: ["Keep in shaded spots to extend plastic life under African sun"]
      },
      donate: {
        goal: "donate",
        headline: "Support Community Learning & Welfare",
        summary: "Hand over to a nearby nursery school, church youth club, or community health post.",
        actionSteps: [
          "Ensure safety with no sharp edges.",
          "Deliver to local school or community leader."
        ],
        highlightedBenefit: "Provides meaningful community utility to people who need it most.",
        resourceLinksOrTips: ["Ask headteachers what equipment their school needs"]
      },
      recycle: {
        goal: "recycle",
        headline: "Ensure Zero Waste to Landfill",
        summary: "Connect with local scrap buyers or plastic drop-off points to ensure clean industrial reprocessing.",
        actionSteps: [
          "Flatten and bundle.",
          "Take to nearest buyback center or scrap scale."
        ],
        highlightedBenefit: "Protects Ghana’s oceans, gutters, and climate.",
        resourceLinksOrTips: ["Ask neighborhood scrap scavengers for pickup schedules"]
      }
    }
  };
}

function normalizeAnalysisResult(parsed: any, fallback: any) {
  if (!parsed || typeof parsed !== "object") return fallback;

  const result: any = { ...fallback, ...parsed };

  result.itemName = parsed.itemName || fallback.itemName || "Identified Item";
  result.objectCategory = parsed.objectCategory || fallback.objectCategory || "Household Object";
  result.primaryMaterial = parsed.primaryMaterial || fallback.primaryMaterial || "Mixed Materials";
  result.allMaterials = Array.isArray(parsed.allMaterials) && parsed.allMaterials.length > 0
    ? parsed.allMaterials
    : fallback.allMaterials;
  result.lifecycleStatus = parsed.lifecycleStatus || fallback.lifecycleStatus || "upcyclable";
  result.conditionAssessment = parsed.conditionAssessment || fallback.conditionAssessment || "Usable condition for secondary circular repurposing.";
  result.confidence = (parsed.confidence === "High" || parsed.confidence === "Medium" || parsed.confidence === "Low")
    ? parsed.confidence
    : fallback.confidence || "High";
  result.confidenceNote = parsed.confidenceNote || fallback.confidenceNote;
  result.ghanaContextNotes = parsed.ghanaContextNotes || fallback.ghanaContextNotes;

  // Safety
  result.safetyAssessment = {
    overallRisk: parsed.safetyAssessment?.overallRisk || fallback.safetyAssessment?.overallRisk || "Caution Required",
    hazardsDetected: Array.isArray(parsed.safetyAssessment?.hazardsDetected)
      ? parsed.safetyAssessment.hazardsDetected
      : (fallback.safetyAssessment?.hazardsDetected || ["Inspect for physical wear"]),
    foodContactWarning: parsed.safetyAssessment?.foodContactWarning || fallback.safetyAssessment?.foodContactWarning || "Never use containers previously storing industrial fluids or unknown liquids for food, cooking, or drinking water.",
    safeHandlingAdvice: Array.isArray(parsed.safetyAssessment?.safeHandlingAdvice)
      ? parsed.safetyAssessment.safeHandlingAdvice
      : (fallback.safetyAssessment?.safeHandlingAdvice || ["Wear protective gloves during cutting or repair"]),
    isHazardousDisposalRecommended: Boolean(parsed.safetyAssessment?.isHazardousDisposalRecommended),
  };

  // Repair
  result.repair = {
    possibleDamage: parsed.repair?.possibleDamage || fallback.repair?.possibleDamage || "Surface wear or loose fitting",
    repairFeasibility: parsed.repair?.repairFeasibility || fallback.repair?.repairFeasibility || "Moderate",
    toolsAndMaterials: Array.isArray(parsed.repair?.toolsAndMaterials) && parsed.repair.toolsAndMaterials.length > 0
      ? parsed.repair.toolsAndMaterials
      : fallback.repair?.toolsAndMaterials || ["Basic household tools"],
    estimatedTime: parsed.repair?.estimatedTime || fallback.repair?.estimatedTime || "20 mins",
    estimatedCostGHS: parsed.repair?.estimatedCostGHS || fallback.repair?.estimatedCostGHS || "GH₵ 5 - 20",
    repairSteps: Array.isArray(parsed.repair?.repairSteps) && parsed.repair.repairSteps.length > 0
      ? parsed.repair.repairSteps
      : fallback.repair?.repairSteps || ["Clean surface", "Inspect structure", "Reinforce or tighten"],
    safetyPrecautions: Array.isArray(parsed.repair?.safetyPrecautions)
      ? parsed.repair.safetyPrecautions
      : (fallback.repair?.safetyPrecautions || ["Work in a well-ventilated space"]),
  };

  // Upcycle ideas
  if (Array.isArray(parsed.upcycleIdeas) && parsed.upcycleIdeas.length > 0) {
    result.upcycleIdeas = parsed.upcycleIdeas.map((idea: any, idx: number) => ({
      id: idea.id || `idea-${idx + 1}`,
      title: idea.title || `Repurposing Project ${idx + 1}`,
      description: idea.description || "Creative upcycling idea.",
      difficulty: idea.difficulty || "Beginner",
      timeRequired: idea.timeRequired || "20 mins",
      materialsNeeded: Array.isArray(idea.materialsNeeded) ? idea.materialsNeeded : ["Utility scissors", "Sandpaper"],
      steps: Array.isArray(idea.steps) ? idea.steps : ["Clean object", "Mark and cut", "Finish edges"],
      category: idea.category || "Home & Garden",
      ghanaRelevance: idea.ghanaRelevance || "Practical for Ghanaian residential households.",
      potentialEarningsGHS: idea.potentialEarningsGHS || "Indicative: GH₵ 20 - 45",
    }));
  } else {
    result.upcycleIdeas = fallback.upcycleIdeas;
  }

  // Resell
  result.resell = {
    hasResaleValue: parsed.resell?.hasResaleValue ?? fallback.resell?.hasResaleValue ?? true,
    productTitle: parsed.resell?.productTitle || fallback.resell?.productTitle || `Refurbished ${result.itemName}`,
    marketplaceDescription: parsed.resell?.marketplaceDescription || fallback.resell?.marketplaceDescription || `Cleaned and checked ${result.itemName}.`,
    conditionGrade: parsed.resell?.conditionGrade || fallback.resell?.conditionGrade || "Good",
    suggestedPriceGHS: {
      min: Number(parsed.resell?.suggestedPriceGHS?.min) || fallback.resell?.suggestedPriceGHS?.min || 15,
      max: Number(parsed.resell?.suggestedPriceGHS?.max) || fallback.resell?.suggestedPriceGHS?.max || 45,
    },
    suggestedPriceUSD: {
      min: Number(parsed.resell?.suggestedPriceUSD?.min) || fallback.resell?.suggestedPriceUSD?.min || 1.5,
      max: Number(parsed.resell?.suggestedPriceUSD?.max) || fallback.resell?.suggestedPriceUSD?.max || 4.0,
    },
    priceDisclaimer: parsed.resell?.priceDisclaimer || fallback.resell?.priceDisclaimer || "Indicative resale value — verify current local market prices.",
    keywords: Array.isArray(parsed.resell?.keywords) ? parsed.resell.keywords : (fallback.resell?.keywords || ["second life item"]),
    recommendedPlatforms: Array.isArray(parsed.resell?.recommendedPlatforms) ? parsed.resell.recommendedPlatforms : (fallback.resell?.recommendedPlatforms || ["Jiji Ghana"]),
    listingTips: Array.isArray(parsed.resell?.listingTips) ? parsed.resell.listingTips : (fallback.resell?.listingTips || ["Take clear photos"]),
  };

  // Donate
  result.donate = {
    isDonatable: parsed.donate?.isDonatable ?? fallback.donate?.isDonatable ?? true,
    targetOrganizations: Array.isArray(parsed.donate?.targetOrganizations) && parsed.donate.targetOrganizations.length > 0
      ? parsed.donate.targetOrganizations
      : fallback.donate?.targetOrganizations || [],
    preparationTips: Array.isArray(parsed.donate?.preparationTips) ? parsed.donate.preparationTips : (fallback.donate?.preparationTips || ["Wipe clean"]),
  };

  // Recycle
  result.recycle = {
    materialType: parsed.recycle?.materialType || fallback.recycle?.materialType || "Recyclable Polymer / Material",
    recyclingCategory: parsed.recycle?.recyclingCategory || fallback.recycle?.recyclingCategory || "Sorted Post-Consumer Scrap",
    recyclabilityRating: parsed.recycle?.recyclabilityRating || fallback.recycle?.recyclabilityRating || "High",
    preparationSteps: Array.isArray(parsed.recycle?.preparationSteps) ? parsed.recycle.preparationSteps : (fallback.recycle?.preparationSteps || ["Rinse and clean"]),
    disposalAndRecyclingOptions: Array.isArray(parsed.recycle?.disposalAndRecyclingOptions) ? parsed.recycle.disposalAndRecyclingOptions : (fallback.recycle?.disposalAndRecyclingOptions || ["Visit community buyback points"]),
    ghanaEcosystemNotes: parsed.recycle?.ghanaEcosystemNotes || fallback.recycle?.ghanaEcosystemNotes || "Collection centers operating across Ghanaian urban centers.",
  };

  // Environmental impact & Goal recommendations
  result.environmentalImpact = parsed.environmentalImpact || fallback.environmentalImpact;
  result.goalRecommendations = parsed.goalRecommendations || fallback.goalRecommendations;

  return result;
}

async function startServer() {
  // Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SecondLife AI server running on port ${PORT}`);
  });
}

startServer();
