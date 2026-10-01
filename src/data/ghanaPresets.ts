import { GhanaPresetItem, ObjectAnalysis } from '../types';

export const GHANA_PRESETS: GhanaPresetItem[] = [
  {
    id: 'kufuor-gallon',
    name: 'Used cooking-oil container',
    localNickname: '20L Jerrycan / "Kufuor Gallon"',
    tagline: 'Iconic Ghanaian heavy-duty oil container with endless upcycling potential',
    category: 'Plastics & Containers',
    thumbnail: '🛢️',
    sampleAnalysis: {
      id: 'sample-kufuor-gallon',
      timestamp: Date.now(),
      itemName: 'Used 20L HDPE Cooking-Oil Gallon',
      objectCategory: 'Heavy Industrial Container',
      primaryMaterial: 'High-Density Polyethylene (HDPE #2)',
      allMaterials: ['HDPE Plastic', 'Screw-on Polypropylene Cap', 'Molded Plastic Handle'],
      lifecycleStatus: 'upcyclable',
      conditionAssessment: 'Oily residue inside, sturdy plastic structure with intact handle and no fatal puncture.',
      confidence: 'High',
      confidenceNote: 'Curated preset item for demonstration and prototype exploration.',
      safetyAssessment: {
        overallRisk: 'Caution Required',
        hazardsDetected: [
                'Chemical & oil residue in container lining',
                'Bacterial buildup if unsterilized',
                'Not certified for safe drinking water storage'
        ],
        foodContactWarning: 'CRITICAL: Never use containers previously storing industrial fluids, dirty liquids, or chemical cooking oils for food or drinking water without verified food-grade certification.',
        safeHandlingAdvice: [
                'Wear protective gloves during initial degreasing',
                'Use coarse sand and warm detergent water for agitation scouring',
                'Aerate thoroughly in direct sunlight to eliminate residual odors'
        ],
        isHazardousDisposalRecommended: false
},
      ghanaContextNotes: 'Widely used in Ghana for transporting cooking oil from markets like Makola and Kejetia. Originally coined during water rationing periods, now a staple for compound water storage and farming.',
      repair: {
        possibleDamage: 'Residual rancid oil odor, slight surface grime, loose cap threads.',
        repairFeasibility: 'Easy',
        toolsAndMaterials: ['Hot water & liquid detergent / Omo', 'Wood ash or caustic soda scrub', 'Coarse sand / pebbles for agitation', 'Sponge'],
        estimatedTime: '15-20 mins',
        estimatedCostGHS: 'GH₵ 5 - 10 (cleaning supplies)',
        repairSteps: [
          'Pour 2 cups of warm water mixed with powdered detergent and coarse sand into the gallon.',
          'Shake vigorously for 3 minutes to scour the inner oil residue.',
          'Rinse 3 times with clean water and leave upside down in the sun to air-dry and deodorize.',
          'Inspect the neck and handle for structural integrity.'
        ],
        safetyPrecautions: ['Ensure gallon is not previously used for toxic agricultural chemicals before domestic reuse.']
      },
      upcycleIdeas: [
        {
          id: 'kufuor-planter',
          title: 'Sub-Irrigated Self-Watering Compound Planter',
          description: 'Slice the top third horizontally, invert the spout into the base as a reservoir funnel, and plant tomatoes, garden eggs, or pepper.',
          difficulty: 'Beginner',
          timeRequired: '25 mins',
          materialsNeeded: ['Utility knife / heated blade', 'Cotton rope or strip of cotton cloth (wick)', 'Potting soil & compost'],
          steps: [
            'Mark a line 15cm from the top and carefully cut around with a heated blade.',
            'Drill 2 overflow holes 5cm from the bottom of the lower base.',
            'Thread a cotton cloth wick through the inverted nozzle into the lower water reservoir.',
            'Fill top section with soil and plant seeds; water reservoir keeps roots hydrated for up to 5 days!'
          ],
          category: 'Home & Garden',
          ghanaRelevance: 'Perfect for urban homes in Accra and Kumasi with concrete compounds and limited garden space.',
          potentialEarningsGHS: 'GH₵ 35 - 50 each sold to urban plant lovers'
        },
        {
          id: 'kufuor-veronica',
          title: 'Mini Portable Handwashing "Veronica" Station',
          description: 'Install a low-cost push-tap or small valve at the lower base for a clean, hygienic compound handwashing unit.',
          difficulty: 'Intermediate',
          timeRequired: '30 mins',
          materialsNeeded: ['Small 1/2-inch plastic tap valve', 'Rubber washer / silicone sealant', 'Soldering iron or drill'],
          steps: [
            'Thoroughly sanitize the interior with chlorine bleach solution.',
            'Melt a 20mm round hole 3cm above the base.',
            'Insert the plastic tap with rubber O-rings on both sides and tighten the locknut.',
            'Place by outdoor kitchen or shop entrance for customers and visitors.'
          ],
          category: 'Utility & Storage',
          ghanaRelevance: 'Essential for chop bars, outdoor barber shops, and schools needing reliable hand hygiene.',
          potentialEarningsGHS: 'GH₵ 60 - 85'
        },
        {
          id: 'kufuor-toolbox',
          title: 'Contractor Tool Caddy / Workshop Organizer',
          description: 'Cut out a side flank while preserving the molded handle to create an indestructible carpenter or plumber tool tote.',
          difficulty: 'Beginner',
          timeRequired: '15 mins',
          materialsNeeded: ['Craft utility knife', 'Marker pen', 'Sandpaper to smooth cut edges'],
          steps: [
            'Trace an opening along one side, leaving 4cm margins and keeping the top handle intact.',
            'Carefully cut along the line with a sharp box cutter.',
            'Sand down the rough plastic edges to prevent hand scratches.',
            'Organize hammers, spanners, nails, and screwdrivers.'
          ],
          category: 'Utility & Storage',
          ghanaRelevance: 'Popular among artisans at Suame Magazine and Kokompe workshops.',
          potentialEarningsGHS: 'GH₵ 25 - 40'
        }
      ],
      resell: {
        hasResaleValue: true,
        productTitle: 'Cleaned 20L Yellow Kufuor Gallon / Jerrycan - Food Grade HDPE',
        marketplaceDescription: 'Thoroughly washed, clean 20-litre yellow oil gallon. Perfect for water storage, kerosene, detergent dispensing, palm oil, or DIY gardening planters. Sturdy handle, zero leaks, tight lid included.',
        conditionGrade: 'Good (Sanitized)',
        suggestedPriceGHS: { min: 25, max: 45 },
        suggestedPriceUSD: { min: 2.0, max: 3.8 },
        priceDisclaimer: 'Indicative resale value — verify current local market prices. Actual prices vary by physical condition, location, and buyer.',
        keywords: ['Kufuor gallon', '20L jerry can', 'yellow oil gallon', 'water container', 'Ghana plastic storage'],
        recommendedPlatforms: ['Jiji Ghana', 'Tonaton', 'Local roadside stall / Market women aggregators', 'Facebook Marketplace Accra'],
        listingTips: ['Highlight that it has been thoroughly degreased and sanitized inside.']
      },
      donate: {
        isDonatable: true,
        targetOrganizations: [
          {
            type: 'Urban Community School Gardens',
            suitability: 'Basic schools often need durable containers for tree nurseries and school compound agriculture projects.',
            ghanaExamples: 'Local public basic schools, environmental school clubs (e.g. Green Ghana clubs)',
            contactAdvice: 'Ask the agricultural science teacher or headteacher.'
          },
          {
            type: 'Local Vocational & Apprenticeship Workshops',
            suitability: 'Artisans use them to store paraffin, cooling water, and spare engine parts.',
            ghanaExamples: 'Mechanic workshops in Kokompe or artisan training centres',
            contactAdvice: 'Drop off at your neighborhood mechanic or welder.'
          }
        ],
        preparationTips: ['Rinse out all oil and wipe exterior dry before donating.']
      },
      recycle: {
        materialType: 'High-Density Polyethylene (HDPE #2)',
        recyclingCategory: 'Rigid Clean Plastic Scrap',
        recyclabilityRating: 'High',
        preparationSteps: [
          'Drain remaining droplets completely.',
          'Wash with soap to remove grease.',
          'Remove and separate any metal foil seals from the rim.',
          'Cut into halves if transporting to save volume.'
        ],
        disposalAndRecyclingOptions: [
          'Check with your local assembly or municipal waste management department for scheduled collection points.',
          'Visit registered scrap dealers or community recycling collection points.',
          'Confirm acceptance criteria and cleanliness standards before dropping off.'
        ],
        ghanaEcosystemNotes: 'Scrap aggregators pay approximately GH₵ 2.50 - GH₵ 4.00 per kg for clean rigid HDPE plastic.'
      },
      environmentalImpact: {
        hasVerifiedData: false,
        qualitativeImpact: 'Environmental impact: Potential waste reduction through reuse',
        dataSourceOrMethodology: 'Impact estimate unavailable without verified lifecycle data.',
        wasteDivertedKg: null,
        co2SavedKg: null,
        waterSavedLiters: null,
        impactExplanation: 'Extending this item\'s useful life prevents virgin raw material extraction and keeps municipal drainage channels clear from debris.',
        circularEconomyPrinciple: 'Closed-Loop Material Extension & Local Cascading Reuse'
      },
      goalRecommendations: {
        money: {
          goal: 'money',
          headline: 'Turn this Gallon into GH₵ 35 - GH₵ 60 Revenue',
          summary: 'Clean it thoroughly and either sell directly on Jiji/market aggregators for GH₵ 30, or convert it into a self-watering tomato planter to sell for GH₵ 55.',
          actionSteps: [
            'Clean with hot detergent water and dry in the sun.',
            'Option 1 (Fast cash): Sell to local palm oil or kerosene retailers at Makola / Kejetia for GH₵ 25-35.',
            'Option 2 (Value-add): Cut into a self-watering compound planter, add rich compost, and sell at plant nurseries.'
          ],
          highlightedBenefit: 'Immediate cash turnover with minimal tool investment.',
          resourceLinksOrTips: ['List on Jiji Ghana under Home & Garden -> Storage', 'Check nearby chop bars who always purchase clean gallons']
        },
        create: {
          goal: 'create',
          headline: 'Craft a Sculptural Compound Lantern or Planter',
          summary: 'Use the distinctive yellow hue to make a vibrant hanging planter or cut out geometric lattice patterns for an outdoor solar garden lamp.',
          actionSteps: [
            'Cut the top handle portion with clean geometric contours.',
            'Spray with UV-resistant acrylic or wrap with sisal/jute rope for a rustic bohemian finish.',
            'Plant cascading succulents or local bougainvillea.'
          ],
          highlightedBenefit: 'Transforms industrial waste into high-end African outdoor decor.',
          resourceLinksOrTips: ['Use a fine soldering iron tip to burn decorative breathing holes', 'Pair with dark coconut fiber liner']
        },
        home: {
          goal: 'home',
          headline: 'Immediate Zero-Cost Household Water & Garden Solution',
          summary: 'Cut into an easy-pour watering can with sprinkle holes in the cap, or an outdoor tap station for your compound.',
          actionSteps: [
            'Poke 12 small needle holes in the screw cap to create a gentle rose sprinkler for seedlings.',
            'Keep by your compound garden for efficient greywater reuse from dishwashing.'
          ],
          highlightedBenefit: 'Saves money on commercial watering cans and manages compound water.',
          resourceLinksOrTips: ['Keep away from direct intense sunlight to prevent UV brittleness over years']
        },
        donate: {
          goal: 'donate',
          headline: 'Supply a School Garden or Community Handwashing Point',
          summary: 'Give this gallon to a local primary school or community clinic for hand hygiene or tree seedling nurseries.',
          actionSteps: [
            'Sanitize thoroughly inside and out.',
            'Drop off at your local primary school green club or community clinic.'
          ],
          highlightedBenefit: 'Directly supports child health and local school agriculture.',
          resourceLinksOrTips: ['Contact the School Management Committee (SMC) in your district']
        },
        recycle: {
          goal: 'recycle',
          headline: 'Sell to Local Plastic Recyclers for High-Grade Pellets',
          summary: 'HDPE #2 is in high demand in Ghana for producing durable pavement tiles, buckets, and water pipes.',
          actionSteps: [
            'Rinse out oil and crush or cut flat.',
            'Drop at any plastic waste buying center (Kaya buyer or Coliba kiosk).'
          ],
          highlightedBenefit: 'Prevents microplastics and keeps Ghana’s drainage systems unclogged.',
          resourceLinksOrTips: ['Find drop-off hubs around Circle, Kaneshie, or Tema Industrial Area']
        }
      }
    }
  },
  {
    id: 'plastic-chair',
    name: 'Used plastic chair',
    localNickname: 'Broken Monobloc Plastic Chair',
    tagline: 'Fix cracks, build reinforced planters, or sell to plastic smelters',
    category: 'Furniture & Living',
    thumbnail: '🪑',
    sampleAnalysis: {
      id: 'sample-plastic-chair',
      timestamp: Date.now(),
      itemName: 'Cracked White Monobloc Resin Chair',
      objectCategory: 'Household & Event Furniture',
      primaryMaterial: 'Polypropylene (PP #5)',
      allMaterials: ['Molded Polypropylene Resin', 'UV stabilizer additives'],
      lifecycleStatus: 'repairable',
      conditionAssessment: 'Crack along one back support strut and fatigue stress on right rear leg. Seat remains mostly intact.',
      confidence: 'High',
      confidenceNote: 'Curated preset item for demonstration and prototype exploration.',
      safetyAssessment: {
        overallRisk: 'Caution Required',
        hazardsDetected: [
                'Structural collapse hazard under body weight',
                'Sharp cracked plastic fracture edges',
                'Material fatigue and stress whitening around joints'
        ],
        foodContactWarning: 'Not applicable (furniture item). Keep away from open flame or high heat.',
        safeHandlingAdvice: [
                'Do not use for adult seating until joint reinforcement is load-tested with sandbags',
                'Sand smooth all cracked edges to prevent skin cuts',
                'Wear eye protection when drilling or wire-stitching plastic'
        ],
        isHazardousDisposalRecommended: false
},
      ghanaContextNotes: 'Everywhere in Ghana: church auditoriums, wedding receptions, funerals, drinking spots, and compound verandas. Millions are discarded yearly when legs crack.',
      repair: {
        possibleDamage: 'Structural hairline split on leg strut, stress whitening in plastic.',
        repairFeasibility: 'Moderate',
        toolsAndMaterials: ['Soldering iron or heated flat metal nail', 'Plastic zip ties (cable ties)', 'Drill or heated awl', 'Epoxy putty'],
        estimatedTime: '25-40 mins',
        estimatedCostGHS: 'GH₵ 10 - 15',
        repairSteps: [
          'Clean dirt and grease from the fracture area.',
          'Plastic stitch method: Drill pairs of small 3mm holes across both sides of the crack like shoe eyelets.',
          'Thread heavy-duty zip ties through the holes and cinch tightly to lock the joint.',
          'Plastic weld method: Run a hot soldering iron along the seam, melting discarded plastic strips into the groove as filler rod.',
          'Sand smooth and test with weight before normal seating.'
        ],
        safetyPrecautions: ['Work in an open ventilated outdoor compound to avoid fumes from heated polypropylene.']
      },
      upcycleIdeas: [
        {
          id: 'chair-planter-stand',
          title: 'Raised Flower Pot & Shrub Cradle',
          description: 'Cut away weakened back slats and invert or nest the base into a heavy-duty elevated planter for terrace gardens.',
          difficulty: 'Beginner',
          timeRequired: '20 mins',
          materialsNeeded: ['Handsaw or hacksaw blade', 'Spray paint (optional)', 'Potted plant'],
          steps: [
            'Cut the damaged back rest away flush with the seat level.',
            'Cut a circular hole in the center of the seat if needed to cradle a flower pot.',
            'Sand edges and spray in vibrant turquoise or terracotta.',
            'Place your potted plant inside to keep it elevated from creeping pests.'
          ],
          category: 'Home & Garden',
          ghanaRelevance: 'Keeps potted herbs elevated from ground heat and compound chickens.',
          potentialEarningsGHS: 'GH₵ 30 - 45'
        },
        {
          id: 'chair-kids-swing',
          title: 'Suspended Toddler Bucket Swing',
          description: 'Trim damaged legs and suspend the intact bucket seat with heavy nylon ropes from a veranda beam or mango tree.',
          difficulty: 'Intermediate',
          timeRequired: '45 mins',
          materialsNeeded: ['10 meters of 12mm nylon rope', 'Hacksaw', 'Safety carabiners'],
          steps: [
            'Saw off all four legs cleanly beneath the seat pan.',
            'Drill reinforced anchor holes through the four corners of the seat and armrests.',
            'Thread and double-knot load-tested climbing or marine nylon rope.',
            'Hang securely from a sturdy branch or porch beam.'
          ],
          category: 'Kids & Play',
          ghanaRelevance: 'Fun compound amusement for children during school holidays.',
          potentialEarningsGHS: 'GH₵ 50 - 75'
        }
      ],
      resell: {
        hasResaleValue: true,
        productTitle: 'Reinforced White Plastic Monobloc Chair - Heavy Duty Compound Seat',
        marketplaceDescription: 'Sturdy white plastic chair, cleaned and structurally reinforced at joints. Perfect for extra compound seating, laundry basket holder, or outdoor veranda use. Durable and weather resistant.',
        conditionGrade: 'Fair (Repaired & Functional)',
        suggestedPriceGHS: { min: 25, max: 40 },
        suggestedPriceUSD: { min: 2.0, max: 3.3 },
        priceDisclaimer: 'Indicative resale value — verify current local market prices. Actual prices vary by physical condition, location, and buyer.',
        keywords: ['plastic chair', 'monobloc chair Ghana', 'cheap chair Accra', 'compound chair', 'second hand furniture'],
        recommendedPlatforms: ['Jiji Ghana', 'Tonaton', 'Local furniture rental shops'],
        listingTips: ['Be transparent about reinforcement and show clear photos of leg stability.']
      },
      donate: {
        isDonatable: true,
        targetOrganizations: [
          {
            type: 'Community Youth Clubs & Drama Groups',
            suitability: 'Used for outdoor rehearsals, backstage seating, and community gatherings.',
            ghanaExamples: 'Local church youth fellowships, community libraries in rural districts',
            contactAdvice: 'Contact the youth leader or library coordinator.'
          }
        ],
        preparationTips: ['Reinforce any wobbly leg and wash thoroughly with bleach water.']
      },
      recycle: {
        materialType: 'Polypropylene (PP #5)',
        recyclingCategory: 'Rigid Bulk Plastic',
        recyclabilityRating: 'High',
        preparationSteps: [
          'Wipe off surface dirt and mud.',
          'Chop or break into stackable pieces with a machete to ease transport.',
          'Bundle with twine.'
        ],
        disposalAndRecyclingOptions: [
          'Check with your local assembly or municipal waste management department for scheduled collection points.',
          'Visit registered scrap dealers or community recycling collection points.',
          'Confirm acceptance criteria and cleanliness standards before dropping off.'
        ],
        ghanaEcosystemNotes: 'A standard plastic chair weighs ~2.2 kg, fetching approximately GH₵ 6 - 9 from scrap aggregators.'
      },
      environmentalImpact: {
        hasVerifiedData: false,
        qualitativeImpact: 'Environmental impact: Potential waste reduction through reuse',
        dataSourceOrMethodology: 'Impact estimate unavailable without verified lifecycle data.',
        wasteDivertedKg: null,
        co2SavedKg: null,
        waterSavedLiters: null,
        impactExplanation: 'Extending this item\'s useful life prevents virgin raw material extraction and keeps municipal drainage channels clear from debris.',
        circularEconomyPrinciple: 'Extended Product Lifecycle & Component Repair'
      },
      goalRecommendations: {
        money: {
          goal: 'money',
          headline: 'Repair for GH₵ 35 Resale or Sell as 2.2kg Scrap',
          summary: 'A simple plastic-stitch repair restores it for compound resale, or sell directly to a mobile plastic buyer on your street.',
          actionSteps: [
            'Use zip-tie stitching to lock the cracked leg.',
            'List on Jiji or offer to a neighbor organizing an outdoor event.',
            'Alternative: sell as bulk scrap if irreparable.'
          ],
          highlightedBenefit: 'Quick turnaround with minimal cost.',
          resourceLinksOrTips: ['Event rental operators often buy repaired chairs for backstage spares']
        },
        create: {
          goal: 'create',
          headline: 'Sculpt a Funky Compound Planter Throne',
          summary: 'Saw off the legs, spray in vibrant Ghanaian kente-inspired patterns, and transform it into a garden showpiece.',
          actionSteps: [
            'Trim damaged leg bottoms to sit flat on patio stones.',
            'Paint with high-contrast acrylic designs.',
            'Line the seat with blooming begonias or ferns.'
          ],
          highlightedBenefit: 'Zero-cost artistic garden feature.',
          resourceLinksOrTips: ['Use sandpaper to score the glossy plastic so paint sticks durably']
        },
        home: {
          goal: 'home',
          headline: 'Reliable Raised Platform for Laundry Basins',
          summary: 'Use the chair in your washing area to keep heavy water basins off wet ground, saving your back from bending.',
          actionSteps: [
            'Reinforce the leg with two zip ties.',
            'Place in the washing bay as an ergonomic tub stand.'
          ],
          highlightedBenefit: 'Solves posture strain during daily washing chores.',
          resourceLinksOrTips: ['Keep on flat ground to distribute weight evenly']
        },
        donate: {
          goal: 'donate',
          headline: 'Support an Under-Resourced Nursery Class',
          summary: 'Many nursery and kindergarten classes need chairs for storytime circles.',
          actionSteps: ['Repair crack securely and deliver to a nearby community school.'],
          highlightedBenefit: 'Direct social impact in early childhood education.',
          resourceLinksOrTips: ['Ensure no sharp burrs remain on the repair area']
        },
        recycle: {
          goal: 'recycle',
          headline: 'Feed Ghana’s Local Basin & Hanger Manufacturers',
          summary: 'Ghana has active PP plastic pelletizers in Tema and North Industrial Area turning chairs into brand-new wash basins.',
          actionSteps: [
            'Smash down flat to save cart space.',
            'Deliver to a local scrap scale.'
          ],
          highlightedBenefit: 'Supports the domestic circular manufacturing economy.',
          resourceLinksOrTips: ['Combine with other broken buckets for higher total payout']
        }
      }
    }
  },
  {
    id: 'sachet-bottles',
    name: 'Plastic bottle',
    localNickname: 'Discarded PET Plastic Bottle & Sachets',
    tagline: 'Ghana’s highest-volume plastic waste transformed into bags, vertical gardens & pavers',
    category: 'Single-Use Plastics',
    thumbnail: '💧',
    sampleAnalysis: {
      id: 'sample-sachet-bottles',
      timestamp: Date.now(),
      itemName: 'Clean Water Sachets (LDPE) & PET Bottles',
      objectCategory: 'Single-Use Beverage Packaging',
      primaryMaterial: 'Low-Density Polyethylene (LDPE #4) & Polyethylene Terephthalate (PET #1)',
      allMaterials: ['LDPE Film (Sachets)', 'PET Plastic (Bottles)', 'HDPE Cap'],
      lifecycleStatus: 'upcyclable',
      conditionAssessment: 'Empty, drained, clean plastic films and transparent bottles.',
      confidence: 'High',
      confidenceNote: 'Curated preset item for demonstration and prototype exploration.',
      safetyAssessment: {
        overallRisk: 'Low Risk',
        hazardsDetected: [
                'Microplastic particle shed if exposed to prolonged UV weathering',
                'Stagnant rainwater mosquito breeding if left outdoors unwashed'
        ],
        foodContactWarning: 'Single-use polyethylene water sachets are not designed for reheating, boiling, or hot liquids.',
        safeHandlingAdvice: [
                'Wash thoroughly in soapy water and sun-dry before weaving or crafting',
                'Keep away from open kitchen stoves and open fires'
        ],
        isHazardousDisposalRecommended: false
},
      ghanaContextNotes: 'Water sachets ("pure water") are consumed by millions daily across Ghana. When improperly discarded, they clog storm gutters in Accra and Kumasi, causing seasonal floods.',
      repair: {
        possibleDamage: 'Single-use puncture (opened sachet corner).',
        repairFeasibility: 'Professional Only',
        toolsAndMaterials: ['Heat-sealer or iron with parchment paper for fusing LDPE'],
        estimatedTime: 'N/A',
        estimatedCostGHS: 'GH₵ 0',
        repairSteps: [
          'Wash sachets thoroughly with warm soapy water to remove dust and bacteria.',
          'Cut open along seams to create flat rectangular sheets.',
          'Hang on clotheslines to air dry completely.',
          'Layer 4-6 sheets between baking paper and iron gently to fuse into durable waterproof fabric.'
        ],
        safetyPrecautions: ['Never touch bare iron directly to plastic film.']
      },
      upcycleIdeas: [
        {
          id: 'sachet-tote-bag',
          title: 'Fused-Plastic Waterproof Shopping Bag / Rain Pouch',
          description: 'Heat-press clean water sachets into resilient waterproof fabric, cut patterns, and sew into stylish eco-friendly tote bags.',
          difficulty: 'Intermediate',
          timeRequired: '1.5 hours',
          materialsNeeded: ['30-40 clean water sachets', 'Household iron & parchment paper', 'Sewing needle & thread or machine', 'Nylon strap'],
          steps: [
            'Clean and dry 35 water sachets.',
            'Overlap edges by 1cm, sandwich between parchment paper, and iron on medium heat until fused.',
            'Cut two 40x35cm panels and one 10cm base gusset.',
            'Sew seams together and attach reinforced handles.',
            'Enjoy a 100% waterproof market bag that outlasts ordinary plastic bags!'
          ],
          category: 'Fashion & Accessories',
          ghanaRelevance: 'Pioneered by eco-enterprises like Trashy Bags Africa in Osu, Accra.',
          potentialEarningsGHS: 'GH₵ 35 - 70 per bag'
        },
        {
          id: 'bottle-vertical-garden',
          title: 'Hanging Vertical Herb & Salad Garden',
          description: 'Cut rectangular windows on PET bottle sides, connect them vertically with twine, and grow mint, basil, and scallions on walls.',
          difficulty: 'Beginner',
          timeRequired: '30 mins',
          materialsNeeded: ['4-6 PET bottles (1.5L)', 'Twine or wire', 'Potting mix', 'Seeds'],
          steps: [
            'Cut a 12x6cm opening on the side of each bottle.',
            'Poke 4 drainage holes on the opposite side.',
            'Thread twine through holes to hang one bottle underneath another.',
            'Fill with rich loam soil and sow leafy vegetables on your sunny compound wall.'
          ],
          category: 'Home & Garden',
          ghanaRelevance: 'Provides fresh herbs in compact urban houses without yard soil.',
          potentialEarningsGHS: 'GH₵ 40 - 60 per 4-tier set'
        }
      ],
      resell: {
        hasResaleValue: true,
        productTitle: 'Bulk Clean Compressed Water Sachets / PET Scrap (Per Bale / Bag)',
        marketplaceDescription: 'Sorted, washed, and dried pure water sachets (LDPE) or crushed clear PET bottles ready for plastic pelletizing or paving stone manufacturing. Zero contamination.',
        conditionGrade: 'Clean Scrap Material',
        suggestedPriceGHS: { min: 20, max: 50 },
        suggestedPriceUSD: { min: 1.6, max: 4.0 },
        priceDisclaimer: 'Indicative resale value — verify current local market prices. Actual prices vary by physical condition, location, and buyer.',
        keywords: ['pure water sachets', 'LDPE recycling Ghana', 'bale plastic scrap', 'PET bottles Accra'],
        recommendedPlatforms: ['Coliba Ghana', 'Nelplast Eco-Factory', 'Local Buyback Kiosks', 'Saduwa aggregators'],
        listingTips: ['Sell in 50kg flour sacks or compressed bundles for higher bulk pricing.']
      },
      donate: {
        isDonatable: true,
        targetOrganizations: [
          {
            type: 'Local Plastic Upcycling Collectives',
            suitability: 'Social enterprises collect clean sachets to train youth in sewing waterproof school bags for rural pupils.',
            ghanaExamples: 'Trashy Bags Africa, local STEM & environmental school clubs',
            contactAdvice: 'Drop clean dry sachets in collection bins or at community hubs.'
          }
        ],
        preparationTips: ['Sachets must be rinsed clean of sand and dried. Wet dirty sachets develop mildew.']
      },
      recycle: {
        materialType: 'LDPE #4 & PET #1',
        recyclingCategory: 'Post-Consumer Packaging',
        recyclabilityRating: 'High',
        preparationSteps: [
          'Drain all residual water completely.',
          'For PET bottles, stomp flat to reduce shipping volume.',
          'Store sachets in a dry sack away from rain.'
        ],
        disposalAndRecyclingOptions: [
          'Check with your local assembly or municipal waste management department for scheduled collection points.',
          'Visit registered scrap dealers or community recycling collection points.',
          'Confirm acceptance criteria and cleanliness standards before dropping off.'
        ],
        ghanaEcosystemNotes: 'Baled LDPE sachets fetch around GH₵ 1.50 - GH₵ 2.80 per kg depending on cleanliness.'
      },
      environmentalImpact: {
        hasVerifiedData: false,
        qualitativeImpact: 'Environmental impact: Potential waste reduction through reuse',
        dataSourceOrMethodology: 'Impact estimate unavailable without verified lifecycle data.',
        wasteDivertedKg: null,
        co2SavedKg: null,
        waterSavedLiters: null,
        impactExplanation: 'Extending this item\'s useful life prevents virgin raw material extraction and keeps municipal drainage channels clear from debris.',
        circularEconomyPrinciple: 'Flood Mitigation & Upcycled Functional Textiles'
      },
      goalRecommendations: {
        money: {
          goal: 'money',
          headline: 'Accumulate Sacks for Buyback Cash or Craft Bags',
          summary: 'Collect and pack clean sachets into 25kg sacks for cash at recycling stations, or fuse into waterproof carry bags for retail.',
          actionSteps: [
            'Create a dedicated sack at home for dry sachets.',
            'Take to local plastic buyback kiosk when full.',
            'Or learn basic iron-fusing to craft and sell rain tote bags.'
          ],
          highlightedBenefit: 'Immediate cash flow from daily domestic waste.',
          resourceLinksOrTips: ['Contact Coliba Ghana mobile app for doorstep pickup in selected zones']
        },
        create: {
          goal: 'create',
          headline: 'Design an Avant-Garde Recycled Waterproof Apron or Bag',
          summary: 'Iron the graphics of different sachet brands into a pop-art collage waterproof apron for cooking or barber work.',
          actionSteps: [
            'Trim sachet logos into square tiles.',
            'Fuse on low heat with baking paper.',
            'Add neck strap for a stylish conversation starter apron.'
          ],
          highlightedBenefit: 'Zero-cost craft that wins eco-design competitions and sales.',
          resourceLinksOrTips: ['Keep iron on polyester/silk heat setting to avoid burning']
        },
        home: {
          goal: 'home',
          headline: 'Build a Drip-Irrigation System for Backyard Crops',
          summary: 'Invert PET bottles with tiny cap holes into plant soil for steady, moisture-conserving root watering.',
          actionSteps: [
            'Poke 1 needle hole in bottle cap.',
            'Cut open bottle base, fill with water, invert near tomato root.',
            'Water slowly drips into deep root zones.'
          ],
          highlightedBenefit: 'Keeps plants thriving while saving 70% of watering time.',
          resourceLinksOrTips: ['Cover open top with a leaf to avoid mosquito breeding']
        },
        donate: {
          goal: 'donate',
          headline: 'Fuel School Bag Programs for Children',
          summary: 'Schools and NGOs collect sachets to sew durable backpacks for children in flood-prone districts.',
          actionSteps: ['Bundle 50 washed sachets and donate to environmental clubs.'],
          highlightedBenefit: 'Direct educational equipment support for disadvantaged youth.',
          resourceLinksOrTips: ['Trashy Bags Africa takes clean dry contributions']
        },
        recycle: {
          goal: 'recycle',
          headline: 'Convert into Durable Eco Pavement Blocks',
          summary: 'Ghanaian innovators mix shredded sachets with river sand to cast pavers stronger than concrete.',
          actionSteps: ['Deliver to Nelplast drop-off hubs or designated municipal sorting bins.'],
          highlightedBenefit: 'Paves roads and schoolyards without cement carbon footprint.',
          resourceLinksOrTips: ['Check Nelplast drop points in Katamanso and Tema']
        }
      }
    }
  },
  {
    id: 'used-tyre',
    name: 'Used tyre',
    localNickname: 'Worn Vehicle Radial Tyre',
    tagline: 'Transform roadside rubber eyesores into compound ottomans, swings, and compound planters',
    category: 'Rubber & Automotive',
    thumbnail: '🚗',
    sampleAnalysis: {
      id: 'sample-used-tyre',
      timestamp: Date.now(),
      itemName: 'Used R15 Steel-Belted Radial Car Tyre',
      objectCategory: 'Automotive Rubber',
      primaryMaterial: 'Vulcanized Synthetic Rubber & Steel Wire',
      allMaterials: ['Natural & Synthetic Rubber', 'Carbon Black', 'Steel Wire Cords', 'Polyester Fabric Plies'],
      lifecycleStatus: 'upcyclable',
      conditionAssessment: 'Worn tread, sidewall intact, no major structural tearing or wire fraying.',
      confidence: 'High',
      confidenceNote: 'Curated preset item for demonstration and prototype exploration.',
      safetyAssessment: {
        overallRisk: 'Caution Required',
        hazardsDetected: [
                'Exposed steel wire belt puncture risk',
                'Heavy metal and vulcanized rubber leachate into soil',
                'Mosquito breeding hazard if rainwater pools inside cavity'
        ],
        foodContactWarning: 'Do NOT plant edible root crops directly against unlined tyre rubber; line with geo-textile or heavy plastic barrier.',
        safeHandlingAdvice: [
                'Drill 12mm drainage weep holes in the base to prevent standing water and malaria vector breeding',
                'Wear heavy leather work gloves when handling exposed wire beads',
                'Wash exterior road grime and oil with soapy water'
        ],
        isHazardousDisposalRecommended: false
},
      ghanaContextNotes: 'Piles of tyres outside vulcanizer shops along Ghanaian highways are prime breeding grounds for malaria mosquitoes when rainwater collects inside.',
      repair: {
        possibleDamage: 'Worn tread pattern unsuitable for road safety.',
        repairFeasibility: 'Professional Only',
        toolsAndMaterials: ['High-pressure water spray', 'Degreaser soap', 'Drill with masonry/wood bit for drainage'],
        estimatedTime: '20 mins preparation',
        estimatedCostGHS: 'GH₵ 5 (cleaning)',
        repairSteps: [
          'Wash tyre with strong detergent to eliminate road grime, oil, and brake dust.',
          'Drill 4-6 drainage holes through the lower sidewall so water can never collect and stagnate inside.',
          'Air dry in the hot sun.',
          'Scuff sidewalls lightly with sandpaper if planning to paint.'
        ],
        safetyPrecautions: ['Always drill drainage holes immediately to prevent mosquito breeding.']
      },
      upcycleIdeas: [
        {
          id: 'tyre-ottoman',
          title: 'Sisal-Rope Coiled Veranda Ottoman / Coffee Stool',
          description: 'Wrap the entire tyre in natural Ghanaian sisal or jute rope with a plywood circular lid to create a bohemian living room footstool.',
          difficulty: 'Intermediate',
          timeRequired: '1.5 hours',
          materialsNeeded: ['Used tyre', '50m of 10mm sisal/jute rope', 'Hot glue gun or industrial contact adhesive', 'Two circular plywood discs'],
          steps: [
            'Cut two circular wood discs matching tyre diameter and screw into top and bottom.',
            'Starting from the center of the top disc, coil rope tightly in a spiral, securing with adhesive.',
            'Continue wrapping around the outer sidewall until the entire tyre is concealed.',
            'Optional: Add 4 wooden furniture peg legs for an elevated mid-century look.'
          ],
          category: 'Furniture',
          ghanaRelevance: 'Highly popular in trendy Accra cafes, Airbnb apartments, and compound verandas.',
          potentialEarningsGHS: 'GH₵ 120 - 220 per ottoman'
        },
        {
          id: 'tyre-planter',
          title: 'Vibrant Stacked Compound Flower Planter',
          description: 'Paint tyres in bright tropical colors, stack in tiered pyramids, and plant flowers or peppers.',
          difficulty: 'Beginner',
          timeRequired: '40 mins',
          materialsNeeded: ['Oil-based gloss paint or emulsion', 'Weed barrier cloth / cardboard base', 'Compost soil'],
          steps: [
            'Drill 6 drainage holes along bottom rim.',
            'Paint with bright yellow, emerald green, and red gloss paint.',
            'Place on soil or patio, line bottom with breathable cloth.',
            'Fill with soil and plant bougainvillea, petunias, or culinary herbs.'
          ],
          category: 'Home & Garden',
          ghanaRelevance: 'Beautifies compound verandas and prevents erosion on sloping sandy land.',
          potentialEarningsGHS: 'GH₵ 45 - 80 per painted planter'
        },
        {
          id: 'tyre-chale-wote',
          title: 'Traditional Heavy-Duty Sandal Soles ("Chale Wote")',
          description: 'Skilled cobblers cut tyre tread strips to manufacture indestructible water-resistant sandal soles.',
          difficulty: 'Advanced',
          timeRequired: '1 hour',
          materialsNeeded: ['Curved cobbler knife', 'Leather / fabric straps', 'Rivets & glue'],
          steps: [
            'Trace foot pattern along tyre tread profile.',
            'Slice tread layer carefully away from steel cord layer.',
            'Shape edges and attach durable fabric or leather thongs.',
            'Fasten with cobbler nails and industrial cement.'
          ],
          category: 'Fashion & Accessories',
          ghanaRelevance: 'Traditional Ghanaian artisan footwear known for lasting 5+ years.',
          potentialEarningsGHS: 'GH₵ 30 - 60 per pair'
        }
      ],
      resell: {
        hasResaleValue: true,
        productTitle: 'Sound Clean Used R15 Tyre - Ideal for Farm Trailers, Planters & Gym Fitness',
        marketplaceDescription: 'Clean used tyre with intact sidewalls. Great for compound landscaping, CrossFit flip workouts, boat docking buffers, farm carts, or bespoke rope ottoman furniture projects. No leaks or steel wire bursts.',
        conditionGrade: 'Used (Repurposing Grade)',
        suggestedPriceGHS: { min: 40, max: 80 },
        suggestedPriceUSD: { min: 3.2, max: 6.5 },
        priceDisclaimer: 'Indicative resale value — verify current local market prices. Actual prices vary by physical condition, location, and buyer.',
        keywords: ['used tyres Ghana', 'gym workout tyre', 'tyre planters Accra', 'vulcanizer tyres', 'second hand car parts'],
        recommendedPlatforms: ['Jiji Ghana', 'Local gym fitness clubs', 'Tonaton', 'Direct to roadside vulcanizers'],
        listingTips: ['Specify rim size (e.g. 15-inch, 16-inch) and that it has been thoroughly pressure-washed.']
      },
      donate: {
        isDonatable: true,
        targetOrganizations: [
          {
            type: 'Community Playgrounds & Kindergarten Schools',
            suitability: 'Used for playground obstacle courses, half-buried crawl tunnels, and swing sets.',
            ghanaExamples: 'Public primary school play areas, community daycare centres',
            contactAdvice: 'Confirm with the school headmaster that tyres will be cleaned and painted.'
          },
          {
            type: 'Local Crossfit & Boxing Gyms',
            suitability: 'Tyres are sought after for sledgehammer training and tyre flipping strength conditioning.',
            ghanaExamples: 'Bukom boxing gyms, neighborhood fitness centres in Accra/Kumasi',
            contactAdvice: 'Drop off at neighborhood outdoor gym.'
          }
        ],
        preparationTips: ['Drill drainage holes to prevent rainwater accumulation. Wash thoroughly with soap.']
      },
      recycle: {
        materialType: 'Vulcanized Rubber & Steel',
        recyclingCategory: 'Industrial Rubber Scrap',
        recyclabilityRating: 'Specialized Facility Required',
        preparationSteps: [
          'De-rim tyre if mounted on metal rim.',
          'Clean interior cavity of leaves and dirt.',
          'Stack vertically in dry shelter.'
        ],
        disposalAndRecyclingOptions: [
          'Check with your local assembly or municipal waste management department for scheduled collection points.',
          'Visit registered scrap dealers or community recycling collection points.',
          'Confirm acceptance criteria and cleanliness standards before dropping off.'
        ],
        ghanaEcosystemNotes: 'Never burn tyres! Tyre bonfires emit carcinogenic black soot and hazardous heavy metals into residential neighborhoods.'
      },
      environmentalImpact: {
        hasVerifiedData: false,
        qualitativeImpact: 'Environmental impact: Potential waste reduction through reuse',
        dataSourceOrMethodology: 'Impact estimate unavailable without verified lifecycle data.',
        wasteDivertedKg: null,
        co2SavedKg: null,
        waterSavedLiters: null,
        impactExplanation: 'Extending this item\'s useful life prevents virgin raw material extraction and keeps municipal drainage channels clear from debris.',
        circularEconomyPrinciple: 'Malaria Vector Prevention & High-Durability Rubber Upcycling'
      },
      goalRecommendations: {
        money: {
          goal: 'money',
          headline: 'Build a Sisal Ottoman to Sell for GH₵ 150 - GH₵ 200',
          summary: 'With GH₵ 35 in rope and glue, transform a free discarded tyre into high-demand designer furniture for urban apartments.',
          actionSteps: [
            'Pick up tyre from local vulcanizer (often free or GH₵ 10).',
            'Wash, dry, and glue sisal rope in a spiral.',
            'Photograph in sunlight and post on Jiji Ghana or Instagram shop.'
          ],
          highlightedBenefit: '400%+ profit margin on artisanal transformation.',
          resourceLinksOrTips: ['Add 4 wooden peg legs to double the retail value']
        },
        create: {
          goal: 'create',
          headline: 'Paint a Three-Tier Compound Botanical Tower',
          summary: 'Paint three tyres in bright yellow, green, and red, stack them offset, and plant fragrant herbs and flowers.',
          actionSteps: [
            'Drill 6 drain holes in each tyre.',
            'Coat with outdoor gloss enamel.',
            'Stack and fill with rich black soil and flowering plants.'
          ],
          highlightedBenefit: 'Instantly elevates compound curb appeal.',
          resourceLinksOrTips: ['Put coarse stones at the bottom for excellent drainage']
        },
        home: {
          goal: 'home',
          headline: 'Car Compound Bumper & Garden Retaining Border',
          summary: 'Mount against your wall to prevent vehicle scraping, or line driveway edges to stop soil runoff during downpours.',
          actionSteps: [
            'Bolt tyre to compound wall at bumper height.',
            'Protects car doors and wall plaster from accidental dents.'
          ],
          highlightedBenefit: 'Saves hundreds in car bodywork and masonry repairs.',
          resourceLinksOrTips: ['Use heavy masonry expansion anchors']
        },
        donate: {
          goal: 'donate',
          headline: 'Equip a School Playground or Bukom Boxing Gym',
          summary: 'Give tyres to children for active playground obstacle courses or young boxers for fitness drills.',
          actionSteps: ['Clean tyre, drill drain holes, and drop at nearest local school.'],
          highlightedBenefit: 'Fosters youth fitness and play without equipment budgets.',
          resourceLinksOrTips: ['Local boxing clubs in Bukom and James Town love heavy truck tyres']
        },
        recycle: {
          goal: 'recycle',
          headline: 'Transfer to Licensed Cobblers or Asphalt Recyclers',
          summary: 'Ensure tyre is shredded for crumb rubber or cut by cobblers rather than burned.',
          actionSteps: ['Give to local cobbler or deliver to industrial rubber aggregator.'],
          highlightedBenefit: 'Stops toxic black smoke and protects neighborhood lungs.',
          resourceLinksOrTips: ['Report tyre dump fires to EPA Ghana']
        }
      }
    }
  },
  {
    id: 'wooden-furniture',
    name: 'Old wooden furniture',
    localNickname: 'Broken Wooden Stool / Furniture',
    tagline: 'Revarnish, reinforce traditional joinery, or craft rustic tiered plant stands',
    category: 'Wood & Forestry',
    thumbnail: '🪵',
    sampleAnalysis: {
      id: 'sample-wooden-furniture',
      timestamp: Date.now(),
      itemName: 'Worn Traditional Hardwood Kitchen Stool',
      objectCategory: 'Handcrafted Timber Furniture',
      primaryMaterial: 'Solid Hardwood (Sese / Teak / Mahogany)',
      allMaterials: ['Carved Tropical Hardwood', 'Traditional Mortise & Tenon Joinery', 'Worn Clear Lacquer'],
      lifecycleStatus: 'repairable',
      conditionAssessment: 'Wobbly loose tenon joint on one cross-rail, surface water rings and scuffs, timber is solid with no active wood borer insects.',
      confidence: 'High',
      confidenceNote: 'Curated preset item for demonstration and prototype exploration.',
      safetyAssessment: {
        overallRisk: 'Caution Required',
        hazardsDetected: [
                'Sharp splinters and protruding rusty nails / staples',
                'Wood-boring insect or termite damage weakening load capacity',
                'Loose mortise-and-tenon structural joints'
        ],
        foodContactWarning: 'Not suitable as a food preparation surface without non-toxic food-safe sealant.',
        safeHandlingAdvice: [
                'Extract or bend flat all protruding rusty nails with a claw hammer immediately',
                'Wear heavy work gloves and safety glasses when sawing, chiseling, or sanding',
                'Inspect load-bearing legs for dry rot before seating use'
        ],
        isHazardousDisposalRecommended: false
},
      ghanaContextNotes: 'Handmade wooden stools and tables are generational assets in Ghanaian households. When joints loosen during dry Harmattan winds, many consider throwing them out.',
      repair: {
        possibleDamage: 'Loose dried glue joint, surface scratches, minor termite or borer check.',
        repairFeasibility: 'Easy',
        toolsAndMaterials: ['PVA Wood glue or epoxy', 'Sandpaper (80 & 180 grit)', 'Teak oil or wood stain / varnish', 'Clamping strap or heavy weights'],
        estimatedTime: '45 mins active + drying',
        estimatedCostGHS: 'GH₵ 15 - 25',
        repairSteps: [
          'Gently tap the loose joint apart to clean dried old glue with a chisel or knife.',
          'Inject fresh wood glue into the mortise socket.',
          'Reassemble the joint and clamp tightly with a ratchet strap or heavy gallon of water for 4 hours.',
          'Sand the whole surface along the grain, removing scratches and water rings.',
          'Apply 2 coats of teak oil or clear varnish to bring out the golden grain.'
        ],
        safetyPrecautions: ['Wipe away excess glue with a damp cloth before it hardens.']
      },
      upcycleIdeas: [
        {
          id: 'wooden-plant-stand',
          title: 'Rustic Bohemian Indoor Plant Stand',
          description: 'Sand the stool, paint the leg tips in gold or black dip-dye style, and use to showcase an indoor snake plant or monstera.',
          difficulty: 'Beginner',
          timeRequired: '30 mins',
          materialsNeeded: ['Sandpaper', 'White primer & gold spray paint', 'Painter tape'],
          steps: [
            'Sand top to bare timber and seal with matte wax.',
            'Tape off the bottom 10cm of each leg with painter tape.',
            'Spray leg tips in metallic gold for a mid-century dipped effect.',
            'Place your centerpiece indoor foliage on top.'
          ],
          category: 'Home & Garden',
          ghanaRelevance: 'Modernizes traditional carved furniture into high-end contemporary apartment decor.',
          potentialEarningsGHS: 'GH₵ 70 - 120'
        },
        {
          id: 'wood-floating-shelf',
          title: 'Wall-Mounted Entryway Key & Mail Shelf',
          description: 'If legs are damaged, detach the solid wooden top seat, mount with metal brackets, and add brass hooks for keys and bags.',
          difficulty: 'Intermediate',
          timeRequired: '40 mins',
          materialsNeeded: ['2 steel L-brackets', 'Screws & wall plugs', '3 brass key hooks'],
          steps: [
            'Detach the solid carved timber top cleanly from damaged legs.',
            'Sand flat and stain rich dark walnut.',
            'Screw decorative hooks along the front underside edge.',
            'Mount securely into concrete wall by entryway.'
          ],
          category: 'Utility & Storage',
          ghanaRelevance: 'Perfect for hallway organization in modern homes and apartments.',
          potentialEarningsGHS: 'GH₵ 50 - 85'
        }
      ],
      resell: {
        hasResaleValue: true,
        productTitle: 'Refurbished Solid Hardwood Stool - Hand-Finished Teak / Sese Wood',
        marketplaceDescription: 'Restored Ghanaian solid hardwood stool. Joints freshly glued and tightened, surface sanded smooth and finished in water-repellent rich wood oil. Excellent as living room accent stool, side table, or bedside nightstand.',
        conditionGrade: 'Refurbished (Excellent)',
        suggestedPriceGHS: { min: 75, max: 140 },
        suggestedPriceUSD: { min: 6.0, max: 11.5 },
        priceDisclaimer: 'Indicative resale value — verify current local market prices. Actual prices vary by physical condition, location, and buyer.',
        keywords: ['wooden stool Ghana', 'hand carved furniture', 'refurbished wood Accra', 'solid teak stool', 'vintage Ghanaian stool'],
        recommendedPlatforms: ['Jiji Ghana', 'Tonaton', 'Instagram Craft Markets', 'Expat Facebook Groups Accra'],
        listingTips: ['Highlight that it is genuine solid tropical hardwood, not cheap MDF or chipboard!']
      },
      donate: {
        isDonatable: true,
        targetOrganizations: [
          {
            type: 'Local Basic School Classrooms',
            suitability: 'Basic schools in peri-urban and rural areas frequently face furniture shortages.',
            ghanaExamples: 'Public primary schools in Ga West, Kasoa, or rural Ashanti',
            contactAdvice: 'Speak directly to the headteacher or PTA chairman.'
          }
        ],
        preparationTips: ['Tighten joints and verify no nails are protruding before donating to children.']
      },
      recycle: {
        materialType: 'Natural Solid Hardwood',
        recyclingCategory: 'Biomass & Reclaimed Timber',
        recyclabilityRating: 'High',
        preparationSteps: [
          'Dismantle nails and metal brackets.',
          'Store in dry shelter to protect from rot.'
        ],
        disposalAndRecyclingOptions: [
          'Check with your local assembly or municipal waste management department for scheduled collection points.',
          'Visit registered scrap dealers or community recycling collection points.',
          'Confirm acceptance criteria and cleanliness standards before dropping off.'
        ],
        ghanaEcosystemNotes: 'Ghanaian timber has high natural density; carpenters prefer seasoned old wood over newly felled damp timber.'
      },
      environmentalImpact: {
        hasVerifiedData: false,
        qualitativeImpact: 'Environmental impact: Potential waste reduction through reuse',
        dataSourceOrMethodology: 'Impact estimate unavailable without verified lifecycle data.',
        wasteDivertedKg: null,
        co2SavedKg: null,
        waterSavedLiters: null,
        impactExplanation: 'Extending this item\'s useful life prevents virgin raw material extraction and keeps municipal drainage channels clear from debris.',
        circularEconomyPrinciple: 'Forest Biomass Conservation & Lifetime Timber Extension'
      },
      goalRecommendations: {
        money: {
          goal: 'money',
          headline: 'Refurbish in 45 Mins and Sell for GH₵ 100+',
          summary: 'Old wooden furniture has huge resale appeal in Accra when cleaned and treated with warm varnish.',
          actionSteps: [
            'Tighten joints with PVA wood glue.',
            'Sand off scuff marks and apply one coat of varnish.',
            'Photograph in nice living room lighting and post on Jiji.'
          ],
          highlightedBenefit: 'High profit margin on authentic tropical hardwood.',
          resourceLinksOrTips: ['Mention the species of wood if known (e.g. Sese, Teak, Odum)']
        },
        create: {
          goal: 'create',
          headline: 'Create a Contemporary Dipped-Leg Accent Table',
          summary: 'Contrast the natural rich wood grain on top with matte white and gold dip-painted legs.',
          actionSteps: [
            'Tape off legs and apply clean geometric paint.',
            'Seal the seat with natural coconut oil or beeswax.'
          ],
          highlightedBenefit: 'Trendy artisanal statement piece.',
          resourceLinksOrTips: ['Use fine 220-grit sandpaper for a silky smooth finish']
        },
        home: {
          goal: 'home',
          headline: 'Multi-Purpose Compound & Kitchen Helper',
          summary: 'Keep in the kitchen for food preparation, or beside the bed as an organic nightstand.',
          actionSteps: [
            'Re-glue any squeaky joints.',
            'Add felt pads under the feet to protect tile floors.'
          ],
          highlightedBenefit: 'Lasts another 20+ years of daily functional utility.',
          resourceLinksOrTips: ['Re-oil once a year after the Harmattan season']
        },
        donate: {
          goal: 'donate',
          headline: 'Provide a Stool for a School Reading Corner',
          summary: 'Local schools and community libraries are grateful for sturdy wooden seating.',
          actionSteps: ['Check for loose splinters, sand smooth, and deliver to a local school.'],
          highlightedBenefit: 'Immediate educational support for learning environments.',
          resourceLinksOrTips: ['Check with district education directorate']
        },
        recycle: {
          goal: 'recycle',
          headline: 'Sell to Local Carpenters at Timber Market',
          summary: 'Carpenters value seasoned vintage hardwood for structural dowels, tool handles, and repairs.',
          actionSteps: ['Remove screws and deliver to neighborhood wood workshop.'],
          highlightedBenefit: 'Keeps valuable timber circulating without waste.',
          resourceLinksOrTips: ['Visit Timber Market in Accra or Anloga in Kumasi']
        }
      }
    }
  },
  {
    id: 'cartons-cardboard',
    name: 'Corrugated Shipping Cartons & Boxes',
    localNickname: 'Brown Shipping Boxes / Indomie & Biscuit Cartons',
    tagline: 'Seedling nurseries, compound weed suppressors, storage boxes & paper pulp buyback',
    category: 'Paper & Cardboard',
    thumbnail: '📦',
    sampleAnalysis: {
      id: 'sample-cartons-cardboard',
      timestamp: Date.now(),
      itemName: 'Corrugated Flute Shipping Carton (Double Wall)',
      objectCategory: 'Paper & Packaging',
      primaryMaterial: 'Kraft Paper / Unbleached Wood Pulp',
      allMaterials: ['Corrugated Kraft Paper Fluting', 'Cornstarch Adhesive', 'Packaging Tape Residue'],
      lifecycleStatus: 'recyclable',
      conditionAssessment: 'Dry, structurally intact walls, folded flat with minor tape residue.',
      confidence: 'High',
      confidenceNote: 'Curated preset item for demonstration and prototype exploration.',
      safetyAssessment: {
        overallRisk: 'Low Risk',
        hazardsDetected: [
                'Moisture damage, bacterial mold, or mildew if damp',
                'Paper cut risk along corrugated edges',
                'High flammability if near cooking fires or stoves'
        ],
        foodContactWarning: 'Do not use dirty or previously discarded shipping boxes for direct food contact.',
        safeHandlingAdvice: [
                'Store elevated away from damp ground to prevent mold and rodent nesting',
                'Use utility knife with care on a cutting mat away from body'
        ],
        isHazardousDisposalRecommended: false
},
      ghanaContextNotes: 'Millions of shipping cartons arrive through Tema port and domestic food distribution (Indomie, biscuit, oil cartons). Often burned in compound rubbish heaps, creating smoke.',
      repair: {
        possibleDamage: 'Flattened creases, peeled tape, torn flap.',
        repairFeasibility: 'Easy',
        toolsAndMaterials: ['Brown gummed paper tape / packing tape', 'Utility knife', 'Ruler'],
        estimatedTime: '5 mins',
        estimatedCostGHS: 'GH₵ 2',
        repairSteps: [
          'Square up corners and fold flaps inward.',
          'Reinforce base seams with cross-ply packing tape.',
          'Inspect to ensure interior is clean and free from pests.'
        ],
        safetyPrecautions: ['Keep strictly away from damp ground to prevent mould.']
      },
      upcycleIdeas: [
        {
          id: 'cardboard-sheet-mulch',
          title: 'Permaculture Sheet Mulch & Weed Suppressor',
          description: 'Lay flattened cardboard over garden beds or compound borders and cover with soil to suppress weeds naturally without toxic herbicides.',
          difficulty: 'Beginner',
          timeRequired: '15 mins',
          materialsNeeded: ['3-5 flattened boxes', 'Garden hose / bucket of water', 'Soil or grass clippings'],
          steps: [
            'Strip off any plastic tape.',
            'Lay cardboard directly over weed-choked ground with 15cm overlap.',
            'Soak thoroughly with water until cardboard is pliable.',
            'Cover with 5cm of compost or soil. Worms feast on the paper as it breaks down!'
          ],
          category: 'Home & Garden',
          ghanaRelevance: 'Prevents compound weeds during rainy seasons without chemical weed killers.',
          potentialEarningsGHS: 'Saves GH₵ 40 in herbicide spray'
        },
        {
          id: 'cardboard-cloth-wardrobe',
          title: 'Fabric-Wrapped Bedroom Wardrobe Organizer',
          description: 'Cover cartons with scrap African wax print (Ankara) fabric to make boutique storage baskets for clothes and books.',
          difficulty: 'Beginner',
          timeRequired: '35 mins',
          materialsNeeded: ['Medium carton', '1 yard leftover fabric', 'White craft glue', 'Scissors'],
          steps: [
            'Cut top flaps off the carton.',
            'Coat exterior walls in diluted PVA glue.',
            'Wrap fabric smoothly around box, folding 3cm over the top rim into the inside.',
            'Use to organize folded clothes, shoes, or school books.'
          ],
          category: 'Art & Decor',
          ghanaRelevance: 'Affordable bedroom storage for students and families.',
          potentialEarningsGHS: 'GH₵ 30 - 50 each'
        }
      ],
      resell: {
        hasResaleValue: true,
        productTitle: 'Sturdy Corrugated Moving Boxes - Clean & Heavy Duty (Bundle of 10)',
        marketplaceDescription: 'Strong double-wall corrugated cardboard boxes. Ideal for home relocation, parcel shipping via VIP bus or parcel services, and warehouse storage. Clean, dry, and flattened for transport.',
        conditionGrade: 'Good (Clean & Dry)',
        suggestedPriceGHS: { min: 30, max: 60 },
        suggestedPriceUSD: { min: 2.5, max: 4.8 },
        priceDisclaimer: 'Indicative resale value — verify current local market prices. Actual prices vary by physical condition, location, and buyer.',
        keywords: ['moving boxes Ghana', 'shipping cartons Accra', 'cheap packing boxes', 'cardboard storage', 'parcel box'],
        recommendedPlatforms: ['Jiji Ghana', 'Tonaton', 'Small business retail vendor groups'],
        listingTips: ['People moving apartments in Accra are constantly searching for clean moving boxes.']
      },
      donate: {
        isDonatable: true,
        targetOrganizations: [
          {
            type: 'Local Basic School Art Classes',
            suitability: 'Used for student art projects, 3D science models, and architectural craft displays.',
            ghanaExamples: 'Public basic schools, community afterschool clubs',
            contactAdvice: 'Deliver to the Creative Arts teacher.'
          }
        ],
        preparationTips: ['Flatten clean dry boxes into neat bundles tied with twine.']
      },
      recycle: {
        materialType: 'Corrugated Paper Cardboard',
        recyclingCategory: 'Fiber & Pulp Scrap',
        recyclabilityRating: 'High',
        preparationSteps: [
          'Peel off plastic tape and shipping labels.',
          'Flatten completely.',
          'Keep dry—wet cardboard loses fiber strength and value.'
        ],
        disposalAndRecyclingOptions: [
          'Check with your local assembly or municipal waste management department for scheduled collection points.',
          'Visit registered scrap dealers or community recycling collection points.',
          'Confirm acceptance criteria and cleanliness standards before dropping off.'
        ],
        ghanaEcosystemNotes: 'Aggregators pay GH₵ 0.80 - GH₵ 1.50 per kg for dry flattened cardboard.'
      },
      environmentalImpact: {
        hasVerifiedData: false,
        qualitativeImpact: 'Environmental impact: Potential waste reduction through reuse',
        dataSourceOrMethodology: 'Impact estimate unavailable without verified lifecycle data.',
        wasteDivertedKg: null,
        co2SavedKg: null,
        waterSavedLiters: null,
        impactExplanation: 'Extending this item\'s useful life prevents virgin raw material extraction and keeps municipal drainage channels clear from debris.',
        circularEconomyPrinciple: 'Organic Pulp Reclamation & Biodegradable Sheet Mulching'
      },
      goalRecommendations: {
        money: {
          goal: 'money',
          headline: 'Sell as Moving Packs for GH₵ 5 - GH₵ 8 per Box',
          summary: 'Bundle 5 to 10 clean boxes and sell to university students or people relocating in town.',
          actionSteps: ['Inspect for cleanliness.', 'Bundle with string.', 'Post on WhatsApp status or Jiji.'],
          highlightedBenefit: 'Immediate sale without processing.',
          resourceLinksOrTips: ['University campuses at semester close have huge moving box demand']
        },
        create: {
          goal: 'create',
          headline: 'Craft African-Print Storage Bins',
          summary: 'Wrap in colorful Ankara wax print to create boutique storage containers.',
          actionSteps: ['Coat box in PVA glue.', 'Press fabric smooth.', 'Let dry overnight.'],
          highlightedBenefit: 'Turns free trash into designer home accessories.',
          resourceLinksOrTips: ['Tailors often give away scrap fabric offcuts for free']
        },
        home: {
          goal: 'home',
          headline: 'Zero-Cost Weed Barrier for Compound Gardening',
          summary: 'Smother stubborn grass and weeds under damp cardboard topped with mulch.',
          actionSteps: ['Lay flat on ground.', 'Wet with water.', 'Cover with topsoil.'],
          highlightedBenefit: 'Stops weeds for 6 months while building rich organic soil.',
          resourceLinksOrTips: ['100% biodegradable and earthworm friendly']
        },
        donate: {
          goal: 'donate',
          headline: 'Supply Materials to Creative Arts Classrooms',
          summary: 'Primary schools use cardboard for dioramas, learning aids, and map models.',
          actionSteps: ['Flatten and bundle.', 'Drop off at nearest basic school.'],
          highlightedBenefit: 'Supports experiential learning in resource-constrained schools.',
          resourceLinksOrTips: ['Contact your local assembly basic school']
        },
        recycle: {
          goal: 'recycle',
          headline: 'Deliver to Tema Paper Recycling Mills',
          summary: 'Recycled fiber is re-pulped into toilet rolls, egg trays, and fresh boxes.',
          actionSteps: ['Keep dry and sell to mobile scrap buyer.'],
          highlightedBenefit: 'Protects tropical trees and water resources.',
          resourceLinksOrTips: ['Cardboard loses value if soaked by rain—keep sheltered']
        }
      }
    }
  },
  {
    id: 'glass-bottle',
    name: 'Empty Glass Beverage & Malt Bottles',
    localNickname: 'Club Beer, Malt & Spirit Bottles',
    tagline: 'Deposit buyback at local spots, pendant lighting, terrazzo aggregate & cups',
    category: 'Glass & Minerals',
    thumbnail: '🍾',
    sampleAnalysis: {
      id: 'sample-glass-bottle',
      timestamp: Date.now(),
      itemName: '625ml Amber Glass Beer Bottle',
      objectCategory: 'Glass Beverage Container',
      primaryMaterial: 'Soda-Lime Silica Glass',
      allMaterials: ['Soda-Lime Glass', 'Paper Label', 'Residual Metal Crown Cork'],
      lifecycleStatus: 'reusable',
      conditionAssessment: 'Intact glass body, no chips or hairline cracks around crown lip.',
      confidence: 'High',
      confidenceNote: 'Curated preset item for demonstration and prototype exploration.',
      safetyAssessment: {
        overallRisk: 'High Risk / Hazardous',
        hazardsDetected: [
                'Severe laceration and puncture hazard from chipped glass rim or broken shards',
                'Thermal shock shattering if heated unevenly',
                'Microscopic glass dust when sanding cut edges'
        ],
        foodContactWarning: 'Inspect bottle lip for microscopic glass chips before drinking or refilling.',
        safeHandlingAdvice: [
                'Always wear safety goggles and thick cut-resistant gloves when scoring or cutting glass',
                'Score smoothly with a glass cutter or clean thermal break line',
                'Sand cut edges thoroughly with silicon carbide wet/dry sandpaper submerged in water to suppress dust'
        ],
        isHazardousDisposalRecommended: false
},
      ghanaContextNotes: 'Standard Ghanaian beer and malt bottles (Club, Star, Guinness, Malta Guinness) have a built-in deposit return system at local drinking spots and wholesale depots.',
      repair: {
        possibleDamage: 'Paper label peeling, dusty interior.',
        repairFeasibility: 'Easy',
        toolsAndMaterials: ['Warm water soak', 'Dish soap', 'Bottle brush'],
        estimatedTime: '5 mins',
        estimatedCostGHS: 'GH₵ 0',
        repairSteps: [
          'Submerge in warm water for 10 minutes to loosen paper label.',
          'Scrape off label and scrub interior with bottle brush.',
          'Rinse clean and invert to dry.'
        ],
        safetyPrecautions: ['Inspect rim carefully for any sharp micro-chips before drinking use.']
      },
      upcycleIdeas: [
        {
          id: 'glass-bottle-tumbler',
          title: 'Upcycled Drinking Glass Tumbler',
          description: 'Score the bottle below the neck with a glass cutter or string soaked in alcohol, apply hot/cold thermal shock to crack cleanly, and sand the edge smooth.',
          difficulty: 'Intermediate',
          timeRequired: '25 mins',
          materialsNeeded: ['Glass bottle cutter / cotton string with lighter fluid', 'Boiling water & ice water bath', 'Silicon carbide sandpaper (120 to 600 grit)'],
          steps: [
            'Score an even line around bottle circumference.',
            'Alternate pouring boiling water and ice-cold water over score line until top pops off cleanly.',
            'Sand rim with wet sandpaper until completely round and safe for lips.',
            'Enjoy a heavy-duty custom drinking tumbler!'
          ],
          category: 'Art & Decor',
          ghanaRelevance: 'Featured in high-end eco-restaurants and cocktail bars in Osu and Cantonments.',
          potentialEarningsGHS: 'GH₵ 25 - 45 each'
        },
        {
          id: 'bottle-pendant-lamp',
          title: 'Hanging Edison-Bulb Ambient Pendant Light',
          description: 'Cut bottle base, thread vintage fabric-braided wire through the neck, and hang as an atmospheric restaurant light.',
          difficulty: 'Advanced',
          timeRequired: '45 mins',
          materialsNeeded: ['Cut amber bottle', 'E27 lamp socket & cord', 'Warm LED filament bulb'],
          steps: [
            'Cut the bottom base of the amber bottle cleanly.',
            'Thread insulated lighting cord through the bottle mouth.',
            'Assemble the lamp holder inside the bottle cavity.',
            'Mount as a cluster of three above kitchen island or bar counter.'
          ],
          category: 'Art & Decor',
          ghanaRelevance: 'Popular rustic lighting in contemporary Ghanaian hospitality lounges.',
          potentialEarningsGHS: 'GH₵ 80 - 150 each'
        }
      ],
      resell: {
        hasResaleValue: true,
        productTitle: 'Empty Returnable Beer / Malt Glass Bottles (Crate of 12 or 24)',
        marketplaceDescription: 'Clean returnable glass bottles in standard crates. Accepted for cash deposit return at any beverage wholesale depot or drinking spot across Ghana.',
        conditionGrade: 'Reusable (Depot Grade)',
        suggestedPriceGHS: { min: 20, max: 40 },
        suggestedPriceUSD: { min: 1.6, max: 3.3 },
        priceDisclaimer: 'Indicative resale value — verify current local market prices. Actual prices vary by physical condition, location, and buyer.',
        keywords: ['empty beer bottles', 'crate deposit Ghana', 'Club beer bottles', 'Malta Guinness return'],
        recommendedPlatforms: ['Local drinking spots ("spots")', 'Beverage wholesale depots', 'Makola market distributors'],
        listingTips: ['Returning full crates with empty bottles gives instant cash on the spot at any distributor.']
      },
      donate: {
        isDonatable: true,
        targetOrganizations: [
          {
            type: 'Local Herbal Medicine & Palm Oil Producers',
            suitability: 'Traditional herbal medicine practitioners and honey bottlers need sanitized glass bottles for packaging.',
            ghanaExamples: 'Registered traditional herbal practitioners, honey harvesters',
            contactAdvice: 'Wash and sanitize thoroughly before handing over.'
          }
        ],
        preparationTips: ['Sterilize with boiling water and cap cleanly.']
      },
      recycle: {
        materialType: 'Soda-Lime Glass',
        recyclingCategory: 'Inert Mineral Glass',
        recyclabilityRating: 'High',
        preparationSteps: [
          'Rinse liquid residue.',
          'Remove metal crown cork.',
          'Do not break if returnable for deposit!'
        ],
        disposalAndRecyclingOptions: [
          'Check with your local assembly or municipal waste management department for scheduled collection points.',
          'Visit registered scrap dealers or community recycling collection points.',
          'Confirm acceptance criteria and cleanliness standards before dropping off.'
        ],
        ghanaEcosystemNotes: 'Glass is 100% infinitely recyclable without quality loss.'
      },
      environmentalImpact: {
        hasVerifiedData: false,
        qualitativeImpact: 'Environmental impact: Potential waste reduction through reuse',
        dataSourceOrMethodology: 'Impact estimate unavailable without verified lifecycle data.',
        wasteDivertedKg: null,
        co2SavedKg: null,
        waterSavedLiters: null,
        impactExplanation: 'Extending this item\'s useful life prevents virgin raw material extraction and keeps municipal drainage channels clear from debris.',
        circularEconomyPrinciple: 'Closed-Loop Industrial Deposit & Return System'
      },
      goalRecommendations: {
        money: {
          goal: 'money',
          headline: 'Instant Cash Deposit at Nearest Drinking Spot',
          summary: 'Return to any local bar or wholesale shop for immediate deposit refund.',
          actionSteps: [
            'Collect bottles into crate.',
            'Walk to neighborhood drinking spot or depot for cash back.'
          ],
          highlightedBenefit: 'Guaranteed liquidity on standard returnable bottles.',
          resourceLinksOrTips: ['Breweries pay deposits on standard branded glass']
        },
        create: {
          goal: 'create',
          headline: 'Cut and Sand into Custom Cocktail Tumblers',
          summary: 'Transform amber glass into bespoke tumblers for your home bar or eco-art sales.',
          actionSteps: [
            'Score line around bottle.',
            'Thermal crack with hot/cold water.',
            'Wet-sand rim until silky smooth.'
          ],
          highlightedBenefit: 'Boutique glassware worth GH₵ 35 each.',
          resourceLinksOrTips: ['Always wear safety goggles when thermal cracking glass']
        },
        home: {
          goal: 'home',
          headline: 'Aesthetic Spice & Palm Oil Pourer',
          summary: 'Fit a stainless steel pouring spout into the neck for a vintage kitchen oil bottle.',
          actionSteps: [
            'Sanitize in boiling water.',
            'Insert pour spout with rubber cork into mouth.'
          ],
          highlightedBenefit: 'Protects oil from sunlight oxidation in amber glass.',
          resourceLinksOrTips: ['Amber glass blocks UV light from spoiling oils']
        },
        donate: {
          goal: 'donate',
          headline: 'Gift to Local Beekeepers or Herbalist Formulators',
          summary: 'Small-scale honey farmers and herbal clinics constantly search for clean glass containers.',
          actionSteps: ['Wash with soap and boiling water.', 'Give to neighborhood honey seller.'],
          highlightedBenefit: 'Empowers local smallholder agriculturalists.',
          resourceLinksOrTips: ['Honey stays freshest in glass rather than plastic']
        },
        recycle: {
          goal: 'recycle',
          headline: 'Return to Brewery Supply Chains',
          summary: 'Breweries sanitize and refill bottles up to 30 times in an established circular loop.',
          actionSteps: ['Deliver unchipped bottles back to distribution center.'],
          highlightedBenefit: 'The most energy-efficient recycling loop in Ghana.',
          resourceLinksOrTips: ['Keep bottles uncracked for reuse rather than crushing']
        }
      }
    }
  },
  {
    id: 'old-clothes',
    name: 'Old T-shirt',
    localNickname: 'Worn Cotton T-Shirt & Kantamanto Textiles',
    tagline: 'Patchwork tote bags, cleaning cloths, cushion padding & braided rugs',
    category: 'Textiles & Apparel',
    thumbnail: '👕',
    sampleAnalysis: {
      id: 'sample-old-clothes',
      timestamp: Date.now(),
      itemName: 'Worn Denim Jeans & Cotton T-Shirt',
      objectCategory: 'Textiles & Apparel',
      primaryMaterial: '100% Cotton & Denim Twill',
      allMaterials: ['Woven Cotton Denim', 'Brass Zipper & Rivets', 'Knitted Cotton Jersey'],
      lifecycleStatus: 'upcyclable',
      conditionAssessment: 'Frayed knees on denim, faded color on shirt, but fabric panels are structurally strong.',
      confidence: 'High',
      confidenceNote: 'Curated preset item for demonstration and prototype exploration.',
      safetyAssessment: {
        overallRisk: 'Low Risk',
        hazardsDetected: [
                'Fabric dust / particulate inhalation when shredding or cutting',
                'Damp storage mildew odor or moth repellents'
        ],
        foodContactWarning: 'Do not use dyed synthetic fabrics for food wrapping.',
        safeHandlingAdvice: [
                'Launder and sun-dry fabric thoroughly before cutting or sewing',
                'Use sharp fabric shears on a flat table to prevent accidental cuts'
        ],
        isHazardousDisposalRecommended: false
},
      ghanaContextNotes: 'Accra’s Kantamanto Market is one of the world’s largest secondhand clothing markets, receiving 15 million garments weekly. Millions of unsellable garments overflow into gutters and the Korle Lagoon.',
      repair: {
        possibleDamage: 'Torn seam, worn knees, missing button.',
        repairFeasibility: 'Easy',
        toolsAndMaterials: ['Hand sewing needle & denim thread', 'Fabric patches or sashiko embroidery', 'Replacement button'],
        estimatedTime: '20 mins',
        estimatedCostGHS: 'GH₵ 5',
        repairSteps: [
          'Iron flat around the tear.',
          'Cut a backing patch from scrap cotton and pin behind hole.',
          'Sew decorative visible mending stitches (Sashiko style) back and forth across the fray.',
          'Replace missing button with sturdy double-thread knots.'
        ],
        safetyPrecautions: ['Use a thimble when pushing needles through heavy denim seams.']
      },
      upcycleIdeas: [
        {
          id: 'denim-tote-bag',
          title: 'Heavy-Duty Upcycled Denim Market Bag',
          description: 'Cut denim jeans at the crotch line, sew the bottom seam shut, and use the leg tubes as reinforced carry straps.',
          difficulty: 'Beginner',
          timeRequired: '40 mins',
          materialsNeeded: ['Old pair of jeans', 'Thread and needle or sewing machine', 'Scissors'],
          steps: [
            'Cut both pant legs off straight across below the back pockets.',
            'Turn the waist section inside out and stitch the bottom opening closed with double reinforced seams.',
            'Cut 8cm wide strips from the discarded legs, fold in half, and sew into durable handles.',
            'Stitch handles to the waistband. The existing pockets now serve as convenient exterior phone and coin pouches!'
          ],
          category: 'Fashion & Accessories',
          ghanaRelevance: 'Fashion-forward upcycling pioneered by Kantamanto market artisans and The OR Foundation.',
          potentialEarningsGHS: 'GH₵ 40 - 75 per bag'
        },
        {
          id: 'cotton-braided-rug',
          title: 'Braided Compound Door Mat',
          description: 'Tear old t-shirts into long continuous ribbons, braid three strands together, and coil into a soft, machine-washable doormat.',
          difficulty: 'Intermediate',
          timeRequired: '1 hour',
          materialsNeeded: ['3-4 old cotton shirts', 'Fabric scissors', 'Sturdy thread'],
          steps: [
            'Cut shirts into 3cm continuous strips.',
            'Braid three long strips together.',
            'Coil the braid flat in an oval, stitching adjacent edges together from the underside.',
            'Place at bedroom or compound doorway.'
          ],
          category: 'Home & Garden',
          ghanaRelevance: 'Keeps compound red dust from entering living quarters.',
          potentialEarningsGHS: 'GH₵ 35 - 60'
        }
      ],
      resell: {
        hasResaleValue: true,
        productTitle: 'Vintage Reworked Denim Tote / Upcycled Thrift Clothing',
        marketplaceDescription: 'Upcycled fashion item crafted from authentic vintage cotton denim. Double-stitched seams, deep functional pockets, eco-friendly zero-waste design. Perfect daily shopping or college tote.',
        conditionGrade: 'Reworked / Upcycled',
        suggestedPriceGHS: { min: 45, max: 90 },
        suggestedPriceUSD: { min: 3.6, max: 7.2 },
        priceDisclaimer: 'Indicative resale value — verify current local market prices. Actual prices vary by physical condition, location, and buyer.',
        keywords: ['upcycled denim', 'thrift tote bag Ghana', 'Kantamanto rework', 'vintage fashion Accra', 'eco tote bag'],
        recommendedPlatforms: ['Instagram thrift shops', 'Jiji Ghana', 'Pop-up artisan fairs in Osu/Labone', 'Tonaton'],
        listingTips: ['Showcase the unique texture, pocket placement, and sustainable back-story.']
      },
      donate: {
        isDonatable: true,
        targetOrganizations: [
          {
            type: 'Local Vocational Tailoring Training Centres',
            suitability: 'Apprentice seamstresses and tailors need fabric scraps to practice stitching, zip installations, and pattern cutting.',
            ghanaExamples: 'Vocational institutes, neighborhood dressmakers',
            contactAdvice: 'Drop clean clothes off with local tailoring apprentices.'
          }
        ],
        preparationTips: ['Wash and fold clothes cleanly before donating.']
      },
      recycle: {
        materialType: 'Natural & Blended Cotton Fiber',
        recyclingCategory: 'Post-Consumer Textile Waste',
        recyclabilityRating: 'Moderate',
        preparationSteps: [
          'Cut away metal zippers, buttons, and thick synthetic linings.',
          'Cut into rectangular cleaning rags for grease and mechanics.'
        ],
        disposalAndRecyclingOptions: [
          'Check with your local assembly or municipal waste management department for scheduled collection points.',
          'Visit registered scrap dealers or community recycling collection points.',
          'Confirm acceptance criteria and cleanliness standards before dropping off.'
        ],
        ghanaEcosystemNotes: 'Cotton rags sell in bulk bundles to mechanics and car washes.'
      },
      environmentalImpact: {
        hasVerifiedData: false,
        qualitativeImpact: 'Environmental impact: Potential waste reduction through reuse',
        dataSourceOrMethodology: 'Impact estimate unavailable without verified lifecycle data.',
        wasteDivertedKg: null,
        co2SavedKg: null,
        waterSavedLiters: null,
        impactExplanation: 'Extending this item\'s useful life prevents virgin raw material extraction and keeps municipal drainage channels clear from debris.',
        circularEconomyPrinciple: 'Textile Waste Diversion & High-Utility Re-Manufacturing'
      },
      goalRecommendations: {
        money: {
          goal: 'money',
          headline: 'Sew Denim Totes for GH₵ 50+ on Instagram',
          summary: 'Reworked vintage denim is one of the highest-selling eco-fashion products in urban Ghana.',
          actionSteps: [
            'Cut jeans below pockets and sew base closed.',
            'Attach handles made from the legs.',
            'Sell to university students or online thrift shoppers.'
          ],
          highlightedBenefit: 'Zero fabric costs with high consumer demand.',
          resourceLinksOrTips: ['Highlight "Reworked Kantamanto Vintage" in your listing']
        },
        create: {
          goal: 'create',
          headline: 'Sashiko Visible Mending Embroidery',
          summary: 'Use bright contrasting thread to turn tears and stains into bespoke embroidered designer patterns.',
          actionSteps: [
            'Use white or bright yellow embroidery floss.',
            'Stitch geometric crosses or waves over worn patches.'
          ],
          highlightedBenefit: 'Transforms damaged clothes into wearable art.',
          resourceLinksOrTips: ['Search Sashiko denim repair patterns']
        },
        home: {
          goal: 'home',
          headline: 'Super-Absorbent Kitchen & Compound Dust Mops',
          summary: '100% cotton t-shirts make the best lint-free compound mops and car-drying towels.',
          actionSteps: [
            'Cut into 30x30cm squares.',
            'Hem edges or leave raw for dusting and vehicle drying.'
          ],
          highlightedBenefit: 'Never buy disposable paper towels again.',
          resourceLinksOrTips: ['Absorbs water 3x faster than microfiber synthetics']
        },
        donate: {
          goal: 'donate',
          headline: 'Supply Apprentice Seamstresses with Practice Cloth',
          summary: 'Apprentice seamstresses in your neighborhood need cloth to learn collar and zip installation.',
          actionSteps: ['Wash, fold, and give to local dressmaker workshop.'],
          highlightedBenefit: 'Directly supports vocational skills training for young women.',
          resourceLinksOrTips: ['Ask any neighborhood dressmaker shop']
        },
        recycle: {
          goal: 'recycle',
          headline: 'Sell as Bulk Cotton Rags to Local Mechanics',
          summary: 'Auto mechanics at Kokompe buy bundles of cotton cloth daily for wiping tools and engine blocks.',
          actionSteps: ['Cut into palm-sized rags and bundle into 5kg bags.'],
          highlightedBenefit: 'Earns money from shredded textiles while replacing synthetic wipes.',
          resourceLinksOrTips: ['Drop off at mechanic clusters or car wash stations']
        }
      }
    }
  },
  {
    id: 'broken-electronics',
    name: 'Broken Radios & Small Electronics',
    localNickname: 'Dead FM Radio / Small Appliances',
    tagline: 'Harvest speakers, fix blown capacitors, extract scrap copper, or safe e-waste recycling',
    category: 'Electronics & E-Waste',
    thumbnail: '🔌',
    sampleAnalysis: {
      id: 'sample-broken-electronics',
      timestamp: Date.now(),
      itemName: 'Defective Portable FM Radio / Music Player',
      objectCategory: 'Consumer Electronics & Audio',
      primaryMaterial: 'ABS Plastic, Circuit Board & Copper Transformer',
      allMaterials: ['ABS Plastic Housing', 'FR4 Copper-Clad Circuit Board', 'Permanent Ferrite Magnet & Speaker Cone', 'Copper Wiring', 'Lead-Free Solder'],
      lifecycleStatus: 'repairable',
      conditionAssessment: 'Device does not turn on. Battery terminal contacts corroded by leaked alkaline battery; internal speaker and transformer intact.',
      confidence: 'High',
      confidenceNote: 'Curated preset item for demonstration and prototype exploration.',
      safetyAssessment: {
        overallRisk: 'High Risk / Hazardous',
        hazardsDetected: [
                'High voltage capacitor electrical shock even when unplugged',
                'Lead solder, toxic flame retardants, and heavy metal exposure',
                'Sharp circuit board solder pins and cracked glass components'
        ],
        foodContactWarning: 'Toxic electronic waste: Keep strictly away from food preparation areas and children.',
        safeHandlingAdvice: [
                'Unplug device and allow internal capacitors to fully discharge before opening',
                'Wear rubberized safety gloves and eye protection',
                'Wash hands after handling internal circuit boards',
                'Never burn plastic electronics casings'
        ],
        isHazardousDisposalRecommended: false
},
      ghanaContextNotes: 'Small radios and chargers are ubiquitous. Traditional crude burning of e-waste at Agbogbloshie caused severe lead and dioxin contamination. Safe formal recovery is critical.',
      repair: {
        possibleDamage: 'Corroded battery springs, loose DC barrel jack, or blown electrolytic capacitor.',
        repairFeasibility: 'Moderate',
        toolsAndMaterials: ['White vinegar / lemon juice & cotton swab', 'Baking soda paste', 'Soldering iron & solder', 'Screwdriver set'],
        estimatedTime: '30 mins',
        estimatedCostGHS: 'GH₵ 5 - 10',
        repairSteps: [
          'Unplug power and remove batteries.',
          'Dip a cotton swab in white vinegar and rub corroded blue/green deposits off the metal battery springs.',
          'Neutralize with baking soda paste and wipe completely dry.',
          'Open housing and inspect for cold solder joints on the power switch or DC jack.',
          'Reflow cracked solder with soldering iron.'
        ],
        safetyPrecautions: ['Unplug all mains AC power cords before opening housing! Never burn electronic boards.']
      },
      upcycleIdeas: [
        {
          id: 'diy-bluetooth-speaker',
          title: 'Salvaged Speaker Transformed into Modern Bluetooth Boombox',
          description: 'Extract the high-quality 3-inch 4-ohm magnetic speaker and wire it to an inexpensive GH₵ 15 Bluetooth receiver module in a custom wooden enclosure.',
          difficulty: 'Intermediate',
          timeRequired: '1 hour',
          materialsNeeded: ['Salvaged 3-inch speaker', 'PAM8403 Bluetooth amplifier board (GH₵ 15-20 at electronics shop)', 'Rechargeable 18650 lithium battery or USB cable', 'Wooden or cardboard casing'],
          steps: [
            'Carefully unscrew and desolder the speaker cone from the broken radio.',
            'Solder speaker terminals to the L/R output of the micro Bluetooth amplifier.',
            'Connect 5V USB power bank supply.',
            'Mount inside an upcycled wooden box for a punchy portable sound system!'
          ],
          category: 'Art & Decor',
          ghanaRelevance: 'Popular project among vocational technical school students and electronics hobbyists.',
          potentialEarningsGHS: 'GH₵ 60 - 110'
        },
        {
          id: 'retro-radio-clock',
          title: 'Retro Vintage Desk Clock / Secret Stash Box',
          description: 'Remove internal broken electronics, keep the vintage dial face and knobs, and install a silent quartz clock movement inside.',
          difficulty: 'Beginner',
          timeRequired: '35 mins',
          materialsNeeded: ['Quartz clock mechanism (GH₵ 12)', 'Hot glue', 'Screwdrivers'],
          steps: [
            'Gut out internal chassis, preserving outer dials and tuning needles.',
            'Install quartz clock spindle through the center volume hole.',
            'Attach clock hands.',
            'Display on your bookshelf as a vintage steampunk decorative timepiece.'
          ],
          category: 'Art & Decor',
          ghanaRelevance: 'Preserves nostalgic retro Ghanaian radio design.',
          potentialEarningsGHS: 'GH₵ 50 - 90'
        }
      ],
      resell: {
        hasResaleValue: true,
        productTitle: 'Retro Radio Housing / Spare Parts (Speaker, Antenna, Transformer)',
        marketplaceDescription: 'Vintage radio shell with sound chassis. Includes functional 4-ohm speaker, intact telescoping telescopic antenna, tuning knobs, and copper step-down transformer. Great for electronics repairers, film props, or DIY audio makers.',
        conditionGrade: 'For Parts / Spares',
        suggestedPriceGHS: { min: 25, max: 50 },
        suggestedPriceUSD: { min: 2.0, max: 4.0 },
        priceDisclaimer: 'Indicative resale value — verify current local market prices. Actual prices vary by physical condition, location, and buyer.',
        keywords: ['radio parts Ghana', 'spare speaker 4 ohm', 'telescopic antenna', 'electronic components Accra', 'e-waste repair'],
        recommendedPlatforms: ['Local radio repair shops', 'Jiji Ghana', 'Tip Toe Lane (Circle) technician groups'],
        listingTips: ['Technicians at Tip Toe Lane (Kwame Nkrumah Circle) constantly buy old radios for replacement parts.']
      },
      donate: {
        isDonatable: true,
        targetOrganizations: [
          {
            type: 'Technical & Vocational Training Institutes (TVET)',
            suitability: 'Students in electrical and electronic engineering need defective hardware for diagnostic and soldering labs.',
            ghanaExamples: 'Accra Technical Training Centre (ATTC), Kumasi Technical Institute (KTI)',
            contactAdvice: 'Deliver to the electronics department workshop.'
          }
        ],
        preparationTips: ['Keep all original screws and components together in a bag.']
      },
      recycle: {
        materialType: 'WEEE (Waste Electrical & Electronic Equipment)',
        recyclingCategory: 'Small Household E-Waste',
        recyclabilityRating: 'Specialized Facility Required',
        preparationSteps: [
          'Do NOT break open circuit boards.',
          'Store away from rain.',
          'Never burn cables or circuit boards to extract copper!'
        ],
        disposalAndRecyclingOptions: [
          'Check with your local assembly or municipal waste management department for scheduled collection points.',
          'Visit registered scrap dealers or community recycling collection points.',
          'Confirm acceptance criteria and cleanliness standards before dropping off.'
        ],
        ghanaEcosystemNotes: 'Ghana’s Hazardous Waste Control Act (Act 917) mandates safe, non-burning e-waste management.'
      },
      environmentalImpact: {
        hasVerifiedData: false,
        qualitativeImpact: 'Environmental impact: Potential waste reduction through reuse',
        dataSourceOrMethodology: 'Impact estimate unavailable without verified lifecycle data.',
        wasteDivertedKg: null,
        co2SavedKg: null,
        waterSavedLiters: null,
        impactExplanation: 'Extending this item\'s useful life prevents virgin raw material extraction and keeps municipal drainage channels clear from debris.',
        circularEconomyPrinciple: 'Clean Precious Metal Recovery & Non-Thermal E-Waste Processing'
      },
      goalRecommendations: {
        money: {
          goal: 'money',
          headline: 'Sell to Tip Toe Lane Technicians for Spare Parts',
          summary: 'Electronics repairmen at Circle buy old radios for sound speakers, potentiometers, and antennas.',
          actionSteps: [
            'Keep casing intact.',
            'Visit Tip Toe Lane or neighborhood TV repairer.',
            'Get instant cash for the functional components.'
          ],
          highlightedBenefit: 'Immediate cash from non-working hardware.',
          resourceLinksOrTips: ['Telescopic antennas and speakers are most sought after']
        },
        create: {
          goal: 'create',
          headline: 'Build a DIY Bluetooth Speaker System',
          summary: 'Salvage the internal speaker, pair with a GH₵ 15 Bluetooth amp board, and enjoy wireless music.',
          actionSteps: [
            'Unscrew speaker from housing.',
            'Connect to mini Bluetooth audio board.',
            'Encase in upcycled wood or decorative tin.'
          ],
          highlightedBenefit: 'High-quality wireless speaker for less than a quarter of store price.',
          resourceLinksOrTips: ['Buy cheap PAM8403 bluetooth modules at any electronics spare parts shop']
        },
        home: {
          goal: 'home',
          headline: 'Clean Battery Corrosion to Restore Radio',
          summary: 'In 80% of cases, cleaning corroded battery springs with vinegar restores full operation!',
          actionSteps: [
            'Scrub contacts with cotton swab dipped in vinegar.',
            'Dry completely and pop in fresh batteries.'
          ],
          highlightedBenefit: 'Restores your favorite news and gospel stations at zero cost.',
          resourceLinksOrTips: ['Apply a dab of petroleum jelly on springs to prevent future corrosion']
        },
        donate: {
          goal: 'donate',
          headline: 'Supply ATTC Engineering Students for Soldering Practice',
          summary: 'Vocational trainees require real boards to master oscilloscope diagnostics and micro-soldering.',
          actionSteps: ['Deliver to local technical high school electronics lab.'],
          highlightedBenefit: 'Trains the next generation of Ghanaian electrical engineers.',
          resourceLinksOrTips: ['Accra Technical Training Centre or nearest TVET center']
        },
        recycle: {
          goal: 'recycle',
          headline: 'Drop at Formal EPA/GIZ E-Waste Collection Hub',
          summary: 'Ensure safe manual disassembly without the toxic burning that polluted Agbogbloshie.',
          actionSteps: ['Drop at certified e-waste bin in Accra or Kumasi.'],
          highlightedBenefit: 'Protects children and air quality in surrounding communities.',
          resourceLinksOrTips: ['Look for official green WEEE collection bins']
        }
      }
    }
  },
  {
    id: 'food-containers',
    name: 'Plastic Takeaway & Aluminium Food Containers',
    localNickname: 'Takeaway Packs & Aluminium Cans',
    tagline: 'Seedling propagation, hardware bolt organizers, and scrap aluminium smelting',
    category: 'Food Packaging',
    thumbnail: '🥡',
    sampleAnalysis: {
      id: 'sample-food-containers',
      timestamp: Date.now(),
      itemName: 'Clean Takeaway Food Containers (Polypropylene) & Soda Can',
      objectCategory: 'Food Packaging',
      primaryMaterial: 'Polypropylene (PP #5) & Beverage Aluminium (Al)',
      allMaterials: ['Food-Grade PP Plastic', 'Beverage-Grade Aluminium Alloy'],
      lifecycleStatus: 'upcyclable',
      conditionAssessment: 'Empty, washed clean of food grease, structurally sound.',
      confidence: 'High',
      confidenceNote: 'Curated preset item for demonstration and prototype exploration.',
      safetyAssessment: {
        overallRisk: 'Caution Required',
        hazardsDetected: [
                'Razor-sharp metal lid burrs and jagged edges',
                'Residual spoiled food odor / bacterial hazard',
                'Rust particulate contaminating contents'
        ],
        foodContactWarning: 'Reusing opened tin cans for cooking over open flame can release toxic inner coating chemicals (BPA / epoxy).',
        safeHandlingAdvice: [
                'Use pliers to crimp down sharp tin lid burrs or file smooth with a metal file',
                'Wash with hot soapy water immediately',
                'Wear gloves when piercing drainage holes'
        ],
        isHazardousDisposalRecommended: false
},
      ghanaContextNotes: 'Street food culture (Fried rice, Waakye, Jollof) uses thousands of takeaway packs daily. When discarded, they choke drainage channels across urban areas.',
      repair: {
        possibleDamage: 'Residual oil film or food odor.',
        repairFeasibility: 'Easy',
        toolsAndMaterials: ['Warm soapy water', 'Vinegar rinse'],
        estimatedTime: '5 mins',
        estimatedCostGHS: 'GH₵ 0',
        repairSteps: [
          'Wash thoroughly with dishwashing soap and warm water.',
          'Rinse with dilute vinegar to neutralize spice smells.',
          'Air dry in sunlight.'
        ],
        safetyPrecautions: ['Do not microwave containers that are not labeled microwave-safe.']
      },
      upcycleIdeas: [
        {
          id: 'seed-starter-mini-greenhouse',
          title: 'Mini Compound Greenhouse for Seedling Nursery',
          description: 'Clear plastic takeaway containers with snap-on lids make the ultimate humidity domes for germinating pepper, tomato, and garden egg seeds.',
          difficulty: 'Beginner',
          timeRequired: '10 mins',
          materialsNeeded: ['Clear plastic container with lid', 'Potting soil & compost', 'Seeds', 'Heated needle for drainage holes'],
          steps: [
            'Melt 4 small drainage holes in the bottom.',
            'Fill with 3cm of rich seed-starter loam.',
            'Plant seeds and moisten with fine water spray.',
            'Snap the transparent lid on top to trap humidity until sprouts appear!'
          ],
          category: 'Home & Garden',
          ghanaRelevance: 'Gives young vegetable seedlings an 85%+ germination rate.',
          potentialEarningsGHS: 'GH₵ 25 per tray of ready seedlings'
        },
        {
          id: 'can-camping-stove',
          title: 'Emergency Alcohol Backpacking Stove',
          description: 'Cut and interlock two beverage can bottoms, perforate tiny jet holes around the rim, and burn methylated spirit for outdoor cooking.',
          difficulty: 'Intermediate',
          timeRequired: '25 mins',
          materialsNeeded: ['2 empty aluminium cans', 'Utility knife & pushpin', 'Methylated spirit fuel'],
          steps: [
            'Cut the bottoms of both cans 3cm high.',
            'Poke 16 tiny needle holes around the upper perimeter of one can.',
            'Slide the two halves together to form a sealed reservoir.',
            'Pour in 20ml methylated spirits, light, and boil water in 5 minutes!'
          ],
          category: 'Utility & Storage',
          ghanaRelevance: 'Handy for emergency compound cooking during power or gas outages.',
          potentialEarningsGHS: 'GH₵ 15 - 25'
        }
      ],
      resell: {
        hasResaleValue: true,
        productTitle: 'Bulk Crushed Aluminium Cans / Clean Stacking Containers (Per Kilo)',
        marketplaceDescription: 'Clean, sorted beverage aluminium cans (crushed) or nesting PP storage containers. Aluminium is ready for local smelting into traditional cast cooking pots (Asona Dadze) and coalpot stoves.',
        conditionGrade: 'Clean Scrap Material',
        suggestedPriceGHS: { min: 15, max: 35 },
        suggestedPriceUSD: { min: 1.2, max: 2.8 },
        priceDisclaimer: 'Indicative resale value — verify current local market prices. Actual prices vary by physical condition, location, and buyer.',
        keywords: ['aluminium cans Ghana', 'scrap metal Accra', 'Asona dadze smelting', 'takeaway containers bulk'],
        recommendedPlatforms: ['Local aluminium foundry artisans (Kokompe)', 'Scrap metal aggregators'],
        listingTips: ['Aluminium scrap is universally bought by weight with immediate cash payout.']
      },
      donate: {
        isDonatable: true,
        targetOrganizations: [
          {
            type: 'Local Nursery & Kindergarten School Craft Sessions',
            suitability: 'Teachers use clean plastic tubs for paint mixing, sorting beads, and storing crayons.',
            ghanaExamples: 'Public kindergarten classrooms',
            contactAdvice: 'Sanitize before delivering.'
          }
        ],
        preparationTips: ['Ensure completely odor-free and washed with detergent.']
      },
      recycle: {
        materialType: 'Polypropylene #5 & Aluminium',
        recyclingCategory: 'Metal & Rigid Plastic',
        recyclabilityRating: 'High',
        preparationSteps: [
          'Crush aluminium cans flat to save space.',
          'Nest plastic containers inside one another.'
        ],
        disposalAndRecyclingOptions: [
          'Check with your local assembly or municipal waste management department for scheduled collection points.',
          'Visit registered scrap dealers or community recycling collection points.',
          'Confirm acceptance criteria and cleanliness standards before dropping off.'
        ],
        ghanaEcosystemNotes: 'Aluminium scrap currently pays GH₵ 10 - GH₵ 14 per kg across Ghana.'
      },
      environmentalImpact: {
        hasVerifiedData: false,
        qualitativeImpact: 'Environmental impact: Potential waste reduction through reuse',
        dataSourceOrMethodology: 'Impact estimate unavailable without verified lifecycle data.',
        wasteDivertedKg: null,
        co2SavedKg: null,
        waterSavedLiters: null,
        impactExplanation: 'Extending this item\'s useful life prevents virgin raw material extraction and keeps municipal drainage channels clear from debris.',
        circularEconomyPrinciple: 'Indigenous Metallurgical Smelting & Closed-Loop Circularity'
      },
      goalRecommendations: {
        money: {
          goal: 'money',
          headline: 'Sell Aluminium by Weight to Kokompe Pot Casters',
          summary: 'Aluminium cans are the most valuable scrap metal by weight in Ghana, fetching GH₵ 10+ per kg.',
          actionSteps: [
            'Stomp cans flat in a sack.',
            'Weigh and sell to nearest metal scrap scale.',
            'Direct cash in hand.'
          ],
          highlightedBenefit: 'Highest price-to-weight ratio in consumer scrap.',
          resourceLinksOrTips: ['Artisans melt cans to make durable Ghanaian cooking pots']
        },
        create: {
          goal: 'create',
          headline: 'Build a Mini Greenhouse for Pepper Seedlings',
          summary: 'Use the clear takeaway lid to create an ideal micro-climate for growing fiery Ghanaian Scotch Bonnet peppers.',
          actionSteps: [
            'Poke drain holes in base.',
            'Fill with soil and sow pepper seeds.',
            'Cover with clear lid.'
          ],
          highlightedBenefit: 'Sprouts high-value pepper and tomato seedlings quickly.',
          resourceLinksOrTips: ['Remove lid once seedlings reach 3cm height']
        },
        home: {
          goal: 'home',
          headline: 'Tidy Screws, Nails & Sewing Supplies',
          summary: 'Stackable takeaway tubs with matching lids keep workshop nails and sewing needles categorized and dry.',
          actionSteps: [
            'Label lids with permanent marker.',
            'Stack in tool caddy or sewing drawer.'
          ],
          highlightedBenefit: 'Prevents losing small hardware in compound workshops.',
          resourceLinksOrTips: ['Translucent tubs allow you to see contents without opening']
        },
        donate: {
          goal: 'donate',
          headline: 'Support Kindergarten Paint & Craft Classes',
          summary: 'Early childhood teachers use clean takeaway containers for water colors and counting games.',
          actionSteps: ['Wash, dry, and bundle 10 clean containers for school.'],
          highlightedBenefit: 'Provides low-cost art materials for community children.',
          resourceLinksOrTips: ['Drop at neighborhood basic school']
        },
        recycle: {
          goal: 'recycle',
          headline: 'Direct Input for Traditional Cast Aluminium Cookware',
          summary: 'Indigenous foundries turn cans into the legendary heavy cooking pots found in every Ghanaian kitchen.',
          actionSteps: ['Flatten cans and drop at metal scrap kiosk.'],
          highlightedBenefit: 'Keeps metal out of city gutters while powering local industry.',
          resourceLinksOrTips: ['Every 100 cans produces enough metal for a medium cooking pot']
        }
      }
    }
  }
];
