/*
 * dbt_dis content.
 * Event and Diggibyte facts come from the Data Innovation Summit MEA 2026 website
 * (home page and partners page). Stage summaries are paraphrased from the site.
 * The industry use cases are illustrative: company names and figures are not real customers.
 */
window.DIS = (function () {
  // Times in UTC (Dubai is UTC+4). The site gives dates only; times are assumptions.
  const EVENT = {
    name: "Data Innovation Summit MEA 2026",
    edition: "5th MEA edition",
    dates: "14–15 October 2026",
    venue: "JW Marriott Hotel Marina, Dubai",
    start: "2026-10-14T05:00:00Z",
    end: "2026-10-15T14:00:00Z",
    organiser: "Hyperight",
    app: "Agorify",
    url: "https://datainnovationsummit.com/region/mea/",
    scheduleUrl: "https://datainnovationsummit.com/region/mea/schedule"
  };

  // From the summit home page.
  const FACTS = [
    { value: "1,000", label: "delegates, the cap for this edition" },
    { value: "50+",   label: "speakers from MEA and abroad" },
    { value: "4",     label: "stages, plus two workshop rooms" },
    { value: "30+",   label: "demo-led TIP sessions" },
    { value: "30+",   label: "exhibitors, Diggibyte among them" },
    { value: "5th",   label: "MEA edition of the summit" }
  ];

  // From Diggibyte's exhibitor listing on the partners page.
  const DIGGIBYTE = {
    summary:
      "Diggibyte is a Databricks Gold Partner focused on data, generative AI and agentic AI. " +
      "We build modern lakehouse platforms, real-time data, GenAI applications and AI agents, " +
      "and take them from idea to production with measurable business value.",
    proof: [
      { value: "Gold", label: "Databricks partner tier" },
      { value: "#1",   label: "for Databricks Champions in the Nordics" },
      { value: "2",    label: "Databricks MVPs on the team" }
    ],
    url: "https://diggibyte.com/"
  };

  const TECH = {
    uc:       "Unity Catalog",
    lakeflow: "Lakeflow",
    sharing:  "Delta Sharing",
    genie:    "AI/BI Genie",
    dash:     "AI/BI Dashboards",
    lakebase: "Lakebase",
    agents:   "Agent Bricks",
    apps:     "Databricks Apps",
    mlflow:   "MLflow",
    gateway:  "AI Gateway"
  };

  // The four DIS MEA 2026 stages. Each industry is tagged with the stage it relates to most.
  const SUMMIT_STAGES = {
    "ai-governance":   "AI Strategy & Governance",
    "data-governance": "Data Strategy & Governance",
    "analytics":       "Analytics & Decision Intelligence",
    "agentic-ai":      "Machine Learning, Gen. & Agentic AI"
  };

  /*
   * The six industries on the dial, clockwise from the top.
   * url: where the "Open the demo" button goes for that industry.
   *      While a url is empty, the button shows "Demo link coming soon" and the dial label has no link icon.
   *      TODO: Infrastructure, Tourism and Healthcare URLs.
   */
  const STAGES = [
    {
      id: "energy",
      short: "Energy & Utility",
      name: "Energy & Utility",
      icon: "assets/icons/energy.svg",
      url: "https://dbgen-npl-rp-7405609077320494.14.azure.databricksapps.com",
      stage: "agentic-ai",
      audience: "utilities, oil and gas, and renewables operators",
      focus: "Grids, plants and solar fleets send sensor data every few seconds. The value is in spotting faults early and planning maintenance before something breaks.",
      offer: {
        title: "From sensor noise to outages prevented",
        text: "We stream meter, SCADA and weather data into governed tables, train failure-risk models on it, and put a maintenance agent on top that proposes the week's work for a planner to approve.",
        tech: ["lakeflow", "agents", "uc"]
      },
      useCase: {
        who: "A regional utility operator (illustrative)",
        problem: "Field crews learn about transformer faults from customer calls, and maintenance plans are built by hand every week.",
        outcome: "An agent ranks assets by failure risk, checks crew availability and drafts work orders for approval.",
        metric: "18% fewer unplanned outages"
      },
      demo: [
        "Watch meter readings stream into a governed table in real time.",
        "Ask the maintenance agent for next week's plan and review its reasoning.",
        "Approve the plan and see work orders created for the field team."
      ]
    },
    {
      id: "retail",
      short: "Retail",
      name: "Retail",
      icon: "assets/icons/retail.svg",
      url: "https://promo-pulse-7488500312027058.18.azure.databricksapps.com",
      stage: "analytics",
      audience: "retail groups, e-commerce and FMCG brands",
      focus: "Demand swings sharply around Ramadan, Eid, summer and big sale events. Stores and planners need answers this week, not in next month's report.",
      offer: {
        title: "Real-time answers in plain language",
        text: "We unify point-of-sale, e-commerce and supplier data into certified tables, and give store managers and planners a conversational layer to ask about sales, stock and forecasts.",
        tech: ["genie", "dash", "lakebase"]
      },
      useCase: {
        who: "A Gulf retail group (illustrative)",
        problem: "Store managers order on instinct because sales reports arrive a week late, and peak weeks end in empty shelves.",
        outcome: "Managers ask what sold last season and what is forecast this week, on a tablet, from certified data.",
        metric: "Out-of-stocks down 15% in peak weeks"
      },
      demo: [
        "Ask Genie which categories ran out early last Ramadan.",
        "Compare the answer with this week's live sales and forecast.",
        "Open the query behind the answer to see exactly where it came from."
      ]
    },
    {
      id: "manufacturing",
      short: "Manufacturing",
      name: "Manufacturing",
      icon: "assets/icons/manufacturing.svg",
      url: "https://supplier-scar-app-7488500312027058.18.azure.databricksapps.com",
      stage: "agentic-ai",
      audience: "plant managers, operations and quality teams",
      focus: "Production lines generate machine, quality and energy data that rarely meets in one place. Scrap, downtime and energy cost hide in the gaps.",
      offer: {
        title: "Fewer defects, less downtime",
        text: "We connect line sensors, MES and quality records in one lakehouse, train models that flag defects and drift early, and ship them as simple apps on the shop floor.",
        tech: ["lakeflow", "mlflow", "apps"]
      },
      useCase: {
        who: "A metals and cables manufacturer (illustrative)",
        problem: "Defects are found at final inspection, hours after the line drifted, and each plant reports scrap differently.",
        outcome: "A quality model watches line data live and alerts the shift lead when a batch starts to drift.",
        metric: "Scrap rate down 12%"
      },
      demo: [
        "See live line data next to the quality model's drift score.",
        "Trigger a drift alert and follow it to the root-cause machine.",
        "Compare OEE across plants on one shared definition."
      ]
    },
    {
      id: "infrastructure",
      short: "Infrastructure",
      name: "Infrastructure",
      icon: "assets/icons/infrastructure.svg",
      url: "", // TODO: Infrastructure demo URL
      stage: "data-governance",
      audience: "giga-project developers, construction and smart-city teams",
      focus: "Large projects run on data from dozens of contractors, each in its own system. Cost and schedule risks show up late because nobody sees the whole picture.",
      offer: {
        title: "One governed view of every project",
        text: "We build a lakehouse where contractors share project data through governed data products, so owners see cost, schedule and safety across the whole programme without chasing spreadsheets.",
        tech: ["lakeflow", "uc", "sharing"]
      },
      useCase: {
        who: "A giga-project developer (illustrative)",
        problem: "Monthly reports from 40 contractors arrive in different formats, and slippage is visible only after it has happened.",
        outcome: "Contractors publish data once; schedule and cost risks are scored across the programme every day.",
        metric: "Schedule risks flagged 6 weeks earlier"
      },
      demo: [
        "Browse contractor data products and request access to one.",
        "See commercial fields masked automatically for your role.",
        "Open the programme view and drill into the riskiest work package."
      ]
    },
    {
      id: "tourism",
      short: "Tourism",
      name: "Tourism & Hospitality",
      icon: "assets/icons/tourism.svg",
      url: "", // TODO: Tourism demo URL
      stage: "analytics",
      audience: "hotel groups, airlines, destinations and attractions",
      focus: "Visitors book across many channels and expect a personal experience. Pricing, staffing and offers have to follow demand that changes by the hour.",
      offer: {
        title: "Know every guest, price every night",
        text: "We bring bookings, stays and loyalty data together, forecast demand by night and segment, and add an AI concierge that answers guests from approved hotel knowledge.",
        tech: ["genie", "agents", "lakebase"]
      },
      useCase: {
        who: "A hotel group in the UAE (illustrative)",
        problem: "Revenue managers price from last year's spreadsheet, and guest preferences sit in separate systems for each property.",
        outcome: "Demand forecasts update daily, and front-desk teams see each returning guest's preferences in one place.",
        metric: "Direct bookings up 9%"
      },
      demo: [
        "Ask Genie which source markets are booking ahead for the winter season.",
        "Look up a returning guest and see their preferences across properties.",
        "Chat with the AI concierge and watch it hand a request to staff."
      ]
    },
    {
      id: "healthcare",
      short: "Healthcare",
      name: "Healthcare",
      icon: "assets/icons/healthcare.svg",
      url: "", // TODO: Healthcare demo URL
      stage: "ai-governance",
      audience: "hospital groups, health authorities and insurers",
      focus: "Waiting times and bed pressure keep rising, and clinicians want help with paperwork. Every use of patient data has to respect consent and privacy rules.",
      offer: {
        title: "Better patient flow, privacy by default",
        text: "We put patient data under one set of access and masking rules, build live patient-flow views, and add AI that drafts documents for clinicians to review and sign.",
        tech: ["uc", "agents", "mlflow"]
      },
      useCase: {
        who: "A private hospital group (illustrative)",
        problem: "Emergency waits are rising, beds are hard to plan, and doctors spend hours on discharge summaries.",
        outcome: "A live view predicts bed pressure for the next 12 hours, and an agent drafts discharge summaries for a clinician to sign.",
        metric: "45 minutes saved per doctor per shift"
      },
      demo: [
        "Query patient data as a researcher and see identifiers masked automatically.",
        "Open the patient-flow view and spot the ward that will fill first.",
        "Ask the agent for a discharge summary, then edit and sign it as the clinician."
      ]
    }
  ];

  // Diggibyte accelerators, from each project's own documentation.
  const ACCELERATORS = [
    {
      name: "Databricks In-a-Box",
      tag: "Databricks Brickbuilder Accelerator",
      text: "Automates the deployment of standardised, scalable and configurable Databricks workspaces across dev, test and prod, so teams start on an enterprise-ready platform from day one.",
      highlights: ["Faster time to value", "Simpler operations", "Cost optimisation at scale"],
      links: [
        { label: "View on Databricks", url: "https://www.databricks.com/company/partners/consulting-and-si/partner-solutions/diggibyte-databricks-in-a-box" },
        { label: "Learn more", url: "https://diggibyte.com/Databricks-in-a-box/" }
      ]
    },
    {
      name: "DataLab",
      tag: "Config-driven medallion lakehouse",
      text: "A reusable bronze-to-gold framework on Lakeflow Spark Declarative Pipelines. Every table is one YAML file, validated and generated into a pipeline, with DQX data-quality checks end to end.",
      highlights: ["Bad rows quarantined, never dropped", "No hardcoded catalogs: dev to prod without config edits", "Authored by people or coding agents"],
      links: [
        { label: "Framework", url: "https://github.com/dediggibyte/datalab-framework" },
        { label: "Reference implementation", url: "https://github.com/dediggibyte/datalab" }
      ]
    },
    {
      name: "DiggiOntos",
      tag: "Business catalog hub for Databricks",
      text: "One Databricks App on Lakebase that registers many workspaces across regions. Teams add descriptions, owners, domains and glossary terms, published back to Unity Catalog, which stays the system of record.",
      highlights: ["Discover assets across every workspace", "Daily harvest flags conflicting edits", "Ask the catalog, powered by Genie"],
      links: [
        { label: "View on GitHub", url: "https://github.com/dediggibyte/ontos_business_catalog" }
      ]
    }
  ];

  return { EVENT, FACTS, DIGGIBYTE, TECH, SUMMIT_STAGES, STAGES, ACCELERATORS };
})();
