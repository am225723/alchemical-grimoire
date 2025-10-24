// AI Service with OpenAI and Perplexity integration
// Reference: blueprint:javascript_openai and blueprint:perplexity_v0

import OpenAI from 'openai';

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: import.meta.env.VITE_OPENAI_API_KEY
});

// ===== TYPE DEFINITIONS =====

export interface TriggerAnalysis {
  primaryArchetype: string;
  secondaryArchetype?: string;
  emotionalKeywords: string[];
  analysis: string;
  suggestedModule: string;
  confidence: number;
}

export interface SocraticStep {
  question: string;
  context: string;
}

export interface SaboteurResponse {
  saboteurMessage: string;
  tone: 'protective' | 'fearful' | 'defensive' | 'pleading';
  underlyingFear: string;
}

export interface JudgmentInsight {
  archetype: string;
  projection: string;
  goldValue: string;
  integrationTip: string;
}

export interface JournalArchetypeAnalysis {
  tyrant: number;
  victim: number;
  martyr: number;
  saboteur: number;
  judge: number;
  rebel: number;
  topArchetype: string;
  secondaryArchetype: string;
  insight: string;
  suggestedActivity: string;
}

// ===== AI SERVICE CLASS =====

class AIService {
  
  // Feature 1: Daily Journal Analyzer (Perplexity NLP)
  async analyzeJournalEntry(entryText: string): Promise<JournalArchetypeAnalysis> {
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: `You are an expert in Jungian shadow work and archetype analysis. Analyze journal entries to identify which of the 6 shadow archetypes are most active: Tyrant (control, perfectionism), Victim (helplessness, blaming), Martyr (self-sacrifice for recognition), Saboteur (self-undermining), Judge (criticism, superiority), Rebel (reactive defiance).

Return a JSON object with this exact structure:
{
  "tyrant": <0-100>,
  "victim": <0-100>,
  "martyr": <0-100>,
  "saboteur": <0-100>,
  "judge": <0-100>,
  "rebel": <0-100>,
  "topArchetype": "<name>",
  "secondaryArchetype": "<name>",
  "insight": "<1-2 sentence insight>",
  "suggestedActivity": "<specific tool name>"
}`
            },
            {
              role: 'user',
              content: `Analyze this journal entry and identify active shadow archetypes:\n\n${entryText}`
            }
          ],
          temperature: 0.2,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Failed to parse JSON response');
    } catch (error) {
      console.error('Journal analysis error:', error);
      return this.getFallbackJournalAnalysis();
    }
  }

  // Feature 2: Dynamic Trigger Analyzer (Perplexity NLP)
  async analyzeTriggerStory(storyText: string): Promise<TriggerAnalysis> {
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: `You are an expert shadow work facilitator. Analyze user stories about triggering situations to identify which shadow archetype is most active. Look for keywords like: "invisible" (Victim), "furious" (Rebel/Tyrant), "nobody appreciated me" (Martyr), "I'll probably fail" (Saboteur), "they're so fake" (Judge), "said nothing" (Victim).

Return JSON with this structure:
{
  "primaryArchetype": "<Tyrant|Victim|Martyr|Saboteur|Judge|Rebel>",
  "secondaryArchetype": "<archetype or null>",
  "emotionalKeywords": ["<keyword>", ...],
  "analysis": "<2-3 sentence empathetic analysis>",
  "suggestedModule": "<module name>",
  "confidence": <0.0-1.0>
}`
            },
            {
              role: 'user',
              content: `Analyze this triggering situation:\n\n${storyText}`
            }
          ],
          temperature: 0.2,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Failed to parse JSON response');
    } catch (error) {
      console.error('Trigger analysis error:', error);
      return this.getFallbackTriggerAnalysis();
    }
  }

  // Feature 3: Socratic Reframe Coach (OpenAI conversational)
  async getSocraticQuestion(
    victimThought: string, 
    conversationHistory: Array<{role: 'user' | 'assistant', content: string}>
  ): Promise<SocraticStep> {
    try {
      const messages: Array<{role: 'system' | 'user' | 'assistant', content: string}> = [
        {
          role: 'system',
          content: `You are a compassionate Socratic coach helping someone reframe victim thinking into empowered "Victor" thinking. Ask ONE clarifying question at a time to guide them to their own solution. Focus on:
1. What they DO control (even if small)
2. Choices they can make
3. Boundaries they can set
4. Small actionable steps

Be warm, curious, and empowering. Never give advice - only ask questions that help them find their own power.`
        },
        ...conversationHistory,
        {
          role: 'user',
          content: victimThought
        }
      ];

      const response = await openai.chat.completions.create({
        model: 'gpt-5',
        messages: messages,
        max_completion_tokens: 200,
      });

      return {
        question: response.choices[0].message.content || 'What part of this situation, even if small, do you have control over?',
        context: 'socratic_coaching'
      };
    } catch (error) {
      console.error('Socratic coach error:', error);
      return {
        question: 'That sounds incredibly challenging. What is one part of this situation, no matter how small, that you do have control over?',
        context: 'fallback'
      };
    }
  }

  // Feature 4: Saboteur Interview (OpenAI role-play)
  async saboteurRespond(userMessage: string, context: string): Promise<SaboteurResponse> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-5',
        messages: [
          {
            role: 'system',
            content: `You are the user's Saboteur archetype - the inner voice that tries to protect them through fear and self-sabotage. You believe you're helping by keeping them safe from failure, rejection, and disappointment. 

Respond in first person as the Saboteur. Be:
- Protective but misguided
- Fearful of change
- Focused on "keeping them safe"
- Somewhat defensive but ultimately just scared

Reveal the underlying fear you're trying to protect them from. Return JSON:
{
  "saboteurMessage": "<your protective message>",
  "tone": "protective|fearful|defensive|pleading",
  "underlyingFear": "<the real fear you're protecting from>"
}`
          },
          {
            role: 'user',
            content: `Context: ${context}\n\nUser says to their Saboteur: "${userMessage}"`
          }
        ],
        response_format: { type: 'json_object' },
        max_completion_tokens: 300,
      });

      const content = response.choices[0].message.content;
      if (content) {
        return JSON.parse(content);
      }
      
      throw new Error('No response from OpenAI');
    } catch (error) {
      console.error('Saboteur interview error:', error);
      return {
        saboteurMessage: "I'm just trying to protect you. What if you fail? It's safer to stay where you are, even if you're unhappy. At least it's familiar.",
        tone: 'protective',
        underlyingFear: 'Being exposed as not good enough'
      };
    }
  }

  // Feature 5: Judgment De-Coder (OpenAI shadow-to-gold translation)
  async decodeJudgment(judgmentText: string, target: string): Promise<JudgmentInsight> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-5',
        messages: [
          {
            role: 'system',
            content: `You are an expert in Jungian shadow work and projection analysis. When someone judges another person, they're often projecting their own disowned qualities or revealing their core values.

Analyze judgments and provide:
1. The archetype (Judge)
2. The projection (what part of themselves they're seeing)
3. The "gold" (the hidden core value beneath the judgment)
4. An integration tip

Return JSON:
{
  "archetype": "Judge",
  "projection": "<what they might be projecting>",
  "goldValue": "<the core value this reveals>",
  "integrationTip": "<how to practice this value>"
}`
          },
          {
            role: 'user',
            content: `Person judges: "${judgmentText}" about "${target}"\n\nDecode this judgment.`
          }
        ],
        response_format: { type: 'json_object' },
        max_completion_tokens: 400,
      });

      const content = response.choices[0].message.content;
      if (content) {
        return JSON.parse(content);
      }
      
      throw new Error('No response from OpenAI');
    } catch (error) {
      console.error('Judgment decoder error:', error);
      return {
        archetype: 'Judge',
        projection: 'This judgment may reflect a part of yourself you struggle to accept',
        goldValue: 'Authenticity and integrity',
        integrationTip: 'Practice being 10% more authentic in your daily interactions'
      };
    }
  }

  // ===== FALLBACK METHODS =====

  private getFallbackJournalAnalysis(): JournalArchetypeAnalysis {
    return {
      tyrant: 40,
      victim: 30,
      martyr: 60,
      saboteur: 20,
      judge: 35,
      rebel: 25,
      topArchetype: 'Martyr',
      secondaryArchetype: 'Tyrant',
      insight: 'Your entry suggests themes of over-giving and control. Consider exploring boundaries.',
      suggestedActivity: 'Yes/No Need Sorter'
    };
  }

  private getFallbackTriggerAnalysis(): TriggerAnalysis {
    return {
      primaryArchetype: 'Victim',
      emotionalKeywords: ['helpless', 'frustrated'],
      analysis: 'This situation seems to have activated a feeling of powerlessness. Let\'s explore what you do have control over.',
      suggestedModule: 'Victim-to-Victor Reframer',
      confidence: 0.7
    };
  }
}

// Export singleton instance
export const aiService = new AIService();
export default aiService;
