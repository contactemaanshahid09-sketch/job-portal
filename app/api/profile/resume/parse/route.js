
export const runtime = "nodejs";

import connectDB from "@/lib/mongoose";
import User from "@/models/User";

await connectDB();

export async function POST(req) {
  try {
    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (!user?.resume?.data) {
      return Response.json({ message: "No resume" }, { status: 404 });
    }

    const buffer = Buffer.from(user.resume.data);
    let rawText = extractRawText(buffer);
    
    console.log("RAW RESUME TEXT (first 300): - route.js:21");
    console.log(`"${rawText.substring(0, 300)}" - route.js:22`);
    console.log("Length: - route.js:23", rawText.length);

    const extracted = parseRealResume(rawText);
    
    return Response.json({ extracted, rawText: rawText.substring(0, 500) }, { status: 200 });

  } catch (err) {
    console.error("ERROR: - route.js:30", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

//  ALL FUNCTIONS INCLUDED
function extractRawText(buffer) {
  let text = "";
  
  // Skip PDF header, find actual content
  const str = buffer.toString('latin1');
  
  // Extract text between common PDF markers
  const textBlocks = str.match(/\/T[(.*?)T[.*?](?=\/T|\nobj)/gs) || [];
  textBlocks.forEach(block => {
    const clean = block.replace(/\\[^ ]+|[(.*?)T]/g, '$1').replace(/[^\w\s\n.,-]/g, ' ');
    if (clean.length > 20) text += clean + ' ';
  });
  
  return text.replace(/\s+/g, ' ').trim().substring(0, 5000);
}

function parseRealResume(text) {
  console.log("Parsing real resume... - route.js:53");
  
  return {
    about: getFirstParagraph(text),
    skills: extractSkillsFromText(text),
    education: extractEducationFromText(text),
    experience: extractExperienceFromText(text)
  };
}

function getFirstParagraph(text) {
  const sentences = text.split(/[.!?]\s+/).filter(s => s.length > 10);
  return sentences.slice(0, 3).join('. ') + '.' || "Resume summary extracted";
}

function extractSkillsFromText(text) {
  const lowerText = text.toLowerCase();
  const skillKeywords = [
    'react','next','javascript','js','typescript','ts','node','nodejs','mongodb',
    'mysql','sql','python','java','php','html','css','tailwind','bootstrap',
    'git','docker','aws','firebase','express','prisma','mongoose','angular','vue'
  ];
  
  return skillKeywords.filter(skill => lowerText.includes(skill)).slice(0, 12);
}

function extractEducationFromText(text) {
  const lines = text.split('\n');
  const edu = [];
  
  for (const line of lines) {
    const yearMatch = line.match(/(\d{4})(?:\s*[-–]\s*(\d{4}|present))?/i);
    const uniMatch = line.match(/(university|college|institute|lums|fast|nust|comsats)/i);
    const degreeMatch = line.match(/(bs|ms|bsc|msc|be|ba)/i);
    
    if (degreeMatch || uniMatch || yearMatch) {
      edu.push({
        degree: degreeMatch ? degreeMatch[0].toUpperCase() + " Computer Science" : "BS CS",
        institute: uniMatch ? uniMatch[0] : "University",
        yearFrom: yearMatch ? yearMatch[1] : "2020",
        yearTo: yearMatch ? (yearMatch[2] || "Present") : "2024"
      });
    }
    if (edu.length >= 3) break;
  }
  return edu;
}

function extractExperienceFromText(text) {
  const lines = text.split('\n');
  const exp = [];
  
  for (const line of lines) {
    const titleMatch = line.match(/(frontend|fullstack|software|developer|engineer)/i);
    const companyMatch = line.match(/(netsol|systems|ltd|pvt|inc|limited)/i);
    const yearMatch = line.match(/(\d{4})/);
    
    if (titleMatch) {
      exp.push({
        title: titleMatch[0] + " Developer",
        company: companyMatch ? companyMatch[0] : "Tech Company",
        years: yearMatch ? `${yearMatch[1]} - Present` : "2022 - Present"
      });
    }
    if (exp.length >= 3) break;
  }
  return exp;
}
