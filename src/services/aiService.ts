import { useEffect, useState } from 'react';

// AI Service Interfaces
export interface DialogueResponse {
  message: string;
  emotionalTone: 'supportive' | 'challenging' | 'neutral' | 'empathetic';
  suggestedQuestions: string[];
  insightLevel: number;
}

export interface PatternAnalysis {
  patterns: RelationshipPattern[];
  insights: string[];
  recommendations: string[];
  confidence: number;
}

export interface RelationshipPattern {
  type: 'repetition' | 'trigger' | 'avoidance' | 'projection' | 'integration';
  description: string;
  frequency: number;
  impact: 'low' | 'medium' | 'high';
  relatedAspects: string[];
}

export interface AuthenticityScore {
  overall: number;
  categories: {
    emotional: number;
    behavioral: number;
    cognitive: number;
    social: number;
  };
  insights: string[];
  growthAreas: string[];
}

export interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: 'breakthrough' | 'challenge' | 'integration' | 'reflection';
  impact: number;
  emotions: string[];
  learnings: string[];
}

export interface TransformationProgress {
  currentPhase: 'nigredo' | 'albedo' | 'citrinitas' | 'rubedo';
  completedLessons: number;
  totalLessons: number;
  insights: string[];
  nextMilestone: string;
}

// AI Service Class
class AIService {
  private baseUrl = process.env.REACT_APP_AI_API_URL || '/api/ai';
  
  // Shadow Dialogue Service
  async generateShadowResponse(
    userMessage: string, 
    context: string, 
    emotionalState: string
  ): Promise<DialogueResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/dialogue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context,
          emotionalState,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate shadow response');
      }
      
      return await response.json();
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getFallbackResponse(userMessage);
    }
  }
  
  // Relationship Pattern Analysis
  async analyzeRelationshipPatterns(
    journalEntries: string[],
    relationshipHistory: any[]
  ): Promise<PatternAnalysis> {
    try {
      const response = await fetch(`${this.baseUrl}/patterns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entries: journalEntries,
          history: relationshipHistory,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze patterns');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Pattern Analysis Error:', error);
      return this.getFallbackPatternAnalysis();
    }
  }
  
  // Authenticity Assessment
  async assessAuthenticity(
    responses: any[],
    behaviors: any[],
    values: string[]
  ): Promise<AuthenticityScore> {
    try {
      const response = await fetch(`${this.baseUrl}/authenticity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responses,
          behaviors,
          values,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to assess authenticity');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Authenticity Assessment Error:', error);
      return this.getFallbackAuthenticityScore();
    }
  }
  
  // Timeline Analysis
  async analyzeTransformationTimeline(
    events: TimelineEvent[]
  ): Promise<{
    progress: TransformationProgress;
    recommendations: string[];
    upcomingChallenges: string[];
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/timeline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze timeline');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Timeline Analysis Error:', error);
      return this.getFallbackTimelineAnalysis();
    }
  }
  
  // Fallback Methods for Offline Mode
  private getFallbackResponse(userMessage: string): DialogueResponse {
    const fallbackResponses = [
      {
        message: "I notice you're sharing something important. What emotions come up as you reflect on this?",
        emotionalTone: 'empathetic' as const,
        suggestedQuestions: [
          "How does this make you feel in your body?",
          "What part of you feels most affected?",
          "What would you need to feel more at peace with this?"
        ],
        insightLevel: 1
      },
      {
        message: "Thank you for your honesty. This sounds like it deserves deeper exploration.",
        emotionalTone: 'supportive' as const,
        suggestedQuestions: [
          "When have you felt this way before?",
          "What might this be trying to teach you?",
          "How can you show compassion to yourself in this moment?"
        ],
        insightLevel: 2
      }
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
  
  private getFallbackPatternAnalysis(): PatternAnalysis {
    return {
      patterns: [
        {
          type: 'repetition',
          description: 'You tend to attract similar relationship dynamics',
          frequency: 3,
          impact: 'medium',
          relatedAspects: ['self-worth', 'boundaries']
        }
      ],
      insights: ['Your patterns show a growing awareness of relationship dynamics'],
      recommendations: ['Continue journaling about relationship interactions'],
      confidence: 0.6
    };
  }
  
  private getFallbackAuthenticityScore(): AuthenticityScore {
    return {
      overall: 75,
      categories: {
        emotional: 70,
        behavioral: 80,
        cognitive: 75,
        social: 72
      },
      insights: ['You show good awareness of your authentic self'],
      growthAreas: ['Emotional expression', 'Setting boundaries']
    };
  }
  
  private getFallbackTimelineAnalysis(): {
    progress: TransformationProgress;
    recommendations: string[];
    upcomingChallenges: string[];
  } {
    return {
      progress: {
        currentPhase: 'albedo',
        completedLessons: 8,
        totalLessons: 12,
        insights: ['You\'re making steady progress through your transformation journey'],
        nextMilestone: 'Deep shadow integration work'
      },
      recommendations: [
        'Continue daily reflection practice',
        'Explore deeper emotional patterns',
        'Practice self-compassion during challenges'
      ],
      upcomingChallenges: [
        'Facing uncomfortable emotions',
        'Integrating shadow aspects',
        'Maintaining consistency in practice'
      ]
    };
  }
}

// React Hook for AI Service
export const useAIService = () => {
  const [aiService] = useState(() => new AIService());
  
  return aiService;
};

// Export singleton instance
export const aiService = new AIService();
export default AIService;