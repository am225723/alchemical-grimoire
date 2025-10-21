import { Chapter } from '../types';

export const chapters: Chapter[] = [
  {
    id: 1,
    title: 'Chapter I',
    subtitle: 'The Shadow Self',
    description: 'Discover the hidden aspects of your psyche and begin the journey of integration.',
    completed: false,
    sections: [
      {
        id: 'shadow-intro',
        title: 'Understanding the Shadow',
        content: `The shadow is not evil—it is simply the parts of ourselves we have rejected, denied, or hidden away. Like a neglected garden, these aspects of our psyche grow wild in the darkness, sometimes manifesting in ways we don't understand or recognize.

Carl Jung wrote: "Everyone carries a shadow, and the less it is embodied in the individual's conscious life, the blacker and denser it is." This profound truth reminds us that ignoring our shadow doesn't make it disappear—it only makes it more powerful.

The shadow contains not only our perceived negative traits but also our hidden strengths, unexpressed creativity, and suppressed vitality. When we shine light on these hidden aspects, we reclaim lost parts of ourselves and become more whole, authentic, and integrated.

Shadow work is the courageous practice of turning toward what we've turned away from. It's about meeting ourselves with compassion and curiosity, understanding that every rejected part of us holds valuable wisdom and energy that, when integrated, makes us more complete.`,
        activities: [
          {
            id: 'shadow-reflection-1',
            title: 'Shadow Reflection Exercise',
            type: 'reflection',
            description: 'What traits in others trigger strong negative reactions in you? These often point to shadow aspects.',
            completed: false,
          },
        ],
      },
      {
        id: 'projection',
        title: 'The Mirror of Projection',
        content: `Projection is one of the shadow's most powerful mechanisms. When we project, we see in others what we cannot see in ourselves. The qualities that most irritate, fascinate, or repel us in others are often reflections of our own disowned traits.

Jung observed: "Projections change the world into the replica of one's own unknown face." This means that much of what we perceive in the external world is actually a reflection of our internal landscape.

Understanding projection is liberating. When someone triggers us, instead of immediately blaming them, we can ask: "What is this showing me about myself?" This doesn't mean others aren't responsible for their actions—it means we're taking responsibility for our reactions.

Common projections include:
- Judging others as "too emotional" when we've suppressed our own feelings
- Seeing others as "selfish" when we struggle to honor our own needs
- Criticizing others as "weak" when we fear our own vulnerability
- Envying others' success when we haven't claimed our own power

The practice of recognizing projection transforms our relationships and deepens our self-awareness. Each trigger becomes a teacher, each judgment a mirror, each strong reaction an invitation to look within.`,
        activities: [
          {
            id: 'projection-journal',
            title: 'Projection Journal',
            type: 'journal',
            description: 'Write about a recent time someone triggered you. What quality did you judge in them? How might you possess this quality yourself?',
            completed: false,
          },
        ],
      },
      {
        id: 'ego-persona',
        title: 'Ego and Persona',
        content: `The ego is our conscious sense of self—the "I" that navigates daily life. The persona is the mask we wear in social situations, the carefully curated version of ourselves we present to the world.

Jung described the persona as "a complicated system of relations between individual consciousness and society, fittingly enough a kind of mask, designed on the one hand to make a definite impression upon others, and on the other to conceal the true nature of the individual."

There's nothing inherently wrong with having a persona—we all need social masks to function in different contexts. The problem arises when we become identified with the persona, believing it to be our true self. When this happens, we lose touch with our authentic nature and live a life of performance rather than presence.

The ego, meanwhile, serves an important function as the organizing center of consciousness. However, when the ego becomes rigid and defensive, it creates suffering. A healthy ego is flexible, able to adapt without losing its core integrity.

Shadow work involves recognizing the difference between our authentic self and our persona, between healthy ego function and ego defensiveness. It's about finding the courage to be real rather than perfect, vulnerable rather than invulnerable.

Signs of persona identification:
- Exhaustion from maintaining an image
- Fear of being "found out" or exposed
- Difficulty being alone with yourself
- Constant comparison with others
- Inability to relax and be spontaneous

The journey toward authenticity requires gradually removing the masks we no longer need, revealing the genuine self beneath.`,
        activities: [
          {
            id: 'persona-exploration',
            title: 'Persona Exploration',
            type: 'exercise',
            description: 'List the different personas you wear (professional, family member, friend). How do they differ? Which feels most authentic?',
            completed: false,
          },
        ],
      },
      {
        id: 'before-after',
        title: 'Before & After Shadow Work',
        content: `Shadow work is transformative. To help you recognize your progress and understand what this journey offers, here's a comparison of life before and after engaging with shadow work.

This is not about perfection—shadow work is a lifelong practice. But these markers can help you recognize growth and understand what's possible when we courageously face our hidden aspects.`,
        activities: [
          {
            id: 'before-after-checklist',
            title: 'Before & After Checklist',
            type: 'reflection',
            description: 'Review the before and after behaviors. Check off which ones you recognize in yourself now, and which ones you aspire to embody.',
            completed: false,
          },
        ],
      },
    ],
    quiz: {
      id: 'shadow-quiz',
      chapterId: 1,
      questions: [
        {
          id: 'q1',
          question: 'The shadow contains only negative traits and should be eliminated.',
          type: 'true-false',
          correctAnswer: false,
          explanation: 'False. The shadow contains both positive and negative traits. It includes hidden strengths, unexpressed creativity, and suppressed vitality, not just negative aspects.',
        },
        {
          id: 'q2',
          question: 'What is projection in the context of shadow work?',
          type: 'multiple-choice',
          options: [
            'Planning for the future',
            'Seeing in others what we cannot see in ourselves',
            'Setting goals and intentions',
            'Visualizing success',
          ],
          correctAnswer: 'Seeing in others what we cannot see in ourselves',
          explanation: 'Projection is when we see in others the qualities we have disowned in ourselves. Our strong reactions to others often reveal our own shadow aspects.',
        },
        {
          id: 'q3',
          question: 'The persona is always harmful and should be completely removed.',
          type: 'true-false',
          correctAnswer: false,
          explanation: 'False. The persona serves an important social function. The problem arises when we become identified with it and lose touch with our authentic self.',
        },
        {
          id: 'q4',
          question: 'Which of the following is a sign of shadow integration?',
          type: 'multiple-choice',
          options: [
            'Never feeling triggered by others',
            'Being perfect in all situations',
            'Responding to triggers with curiosity rather than reactivity',
            'Avoiding all conflict',
          ],
          correctAnswer: 'Responding to triggers with curiosity rather than reactivity',
          explanation: 'Shadow integration doesn\'t mean we never get triggered, but rather that we respond with awareness and curiosity, using triggers as opportunities for growth.',
        },
      ],
    },
  },
  {
    id: 2,
    title: 'Chapter II',
    subtitle: 'The Inner Child',
    description: 'Heal childhood wounds and reconnect with your authentic, playful nature.',
    completed: false,
    sections: [
      {
        id: 'inner-child-intro',
        title: 'Meeting Your Inner Child',
        content: `The inner child is the part of us that holds our earliest experiences, emotions, and memories. This aspect of our psyche carries both our wounds and our wonder—the pain we experienced as children and the joy, creativity, and spontaneity that are our birthright.

Many of us carry wounded inner children who never received the love, validation, or safety they needed. These wounds don't simply disappear as we grow older; they continue to influence our adult lives, shaping our relationships, self-worth, and emotional responses.

Carl Jung recognized that "the child is potential future" and that reconnecting with this aspect of ourselves is essential for wholeness. When we heal our inner child, we reclaim not only our pain but also our capacity for joy, play, and authentic connection.

Inner child work involves:
- Acknowledging the pain and unmet needs of your younger self
- Providing the love and validation you didn't receive
- Reclaiming your natural spontaneity and creativity
- Setting boundaries to protect your vulnerable parts
- Allowing yourself to play, dream, and wonder again

This work is not about blaming parents or dwelling in victimhood. It's about taking responsibility for our own healing and becoming the loving parent to ourselves that we needed.`,
        activities: [
          {
            id: 'inner-child-letter',
            title: 'Letter to Your Inner Child',
            type: 'journal',
            description: 'Write a compassionate letter to your younger self. What does that child need to hear from you?',
            completed: false,
          },
        ],
      },
      {
        id: 'childhood-wounds',
        title: 'Understanding Childhood Wounds',
        content: `Our childhood experiences shape the lens through which we view the world. When our needs for love, safety, and validation weren't met, we developed coping mechanisms that served us then but may limit us now.

Common childhood wounds include:

**Abandonment Wound**: Feeling left alone, unsupported, or rejected. This creates fear of being left and can lead to clinging behavior or preemptive withdrawal in relationships.

**Rejection Wound**: Feeling unwanted or not good enough. This creates deep shame and a constant need to prove worthiness.

**Betrayal Wound**: Having trust broken by those who should have protected you. This creates difficulty trusting others and vulnerability.

**Humiliation Wound**: Being shamed, criticized, or made to feel small. This creates fear of being seen and perfectionism.

**Injustice Wound**: Experiencing unfairness, favoritism, or having your feelings invalidated. This creates rigidity and difficulty with flexibility.

These wounds are not life sentences. Through awareness and compassionate self-work, we can heal these early injuries and develop new, healthier patterns. The key is recognizing when our adult reactions are actually our inner child responding from old wounds.

Healing begins when we can say: "This is my wound speaking, not my truth. I am safe now. I can respond differently."`,
        activities: [
          {
            id: 'wound-identification',
            title: 'Wound Identification',
            type: 'reflection',
            description: 'Which childhood wounds resonate most with you? How do they show up in your adult life?',
            completed: false,
          },
        ],
      },
      {
        id: 'reparenting',
        title: 'The Practice of Reparenting',
        content: `Reparenting is the practice of giving yourself what you didn't receive as a child. It's about becoming the loving, attuned, protective parent to your inner child that you needed.

This doesn't mean blaming your actual parents—they did the best they could with their own wounds and limitations. Reparenting is about taking responsibility for your own healing and meeting your own needs.

Key aspects of reparenting:

**Attunement**: Learning to recognize and validate your own emotions. When you feel sad, angry, or scared, acknowledge these feelings instead of dismissing them.

**Comfort**: Providing yourself with soothing and care when you're distressed. This might include self-touch, kind words, or creating a safe space.

**Protection**: Setting boundaries that keep you safe. Learning to say no, removing yourself from harmful situations, and standing up for yourself.

**Encouragement**: Offering yourself the support and belief you needed. Celebrating your efforts, not just outcomes.

**Play**: Allowing yourself joy, spontaneity, and fun without guilt or judgment.

Practical reparenting practices:
- Talk to yourself with the kindness you'd show a beloved child
- Create rituals of self-care and comfort
- Allow yourself to play and be silly
- Set firm boundaries with people who harm you
- Celebrate your small victories
- Give yourself permission to rest and receive

Remember: You cannot change the past, but you can change your relationship with your inner child in the present.`,
        activities: [
          {
            id: 'reparenting-practice',
            title: 'Daily Reparenting Practice',
            type: 'exercise',
            description: 'Choose one reparenting practice to do daily for a week. Notice how it feels to care for yourself this way.',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Chapter III',
    subtitle: 'Archetypes & The Collective Unconscious',
    description: 'Explore the universal patterns that shape human experience and consciousness.',
    completed: false,
    sections: [
      {
        id: 'archetypes-intro',
        title: 'Understanding Archetypes',
        content: `Archetypes are universal patterns of behavior, emotion, and imagery that exist in the collective unconscious—the shared psychological inheritance of humanity. Jung discovered that certain themes, symbols, and character types appear across all cultures and throughout history, suggesting a common psychological foundation.

These archetypes are not learned but inherited, part of our psychological DNA. They manifest in myths, fairy tales, dreams, and our own life stories. Understanding archetypes helps us recognize the larger patterns playing out in our individual lives.

Jung wrote: "The archetype is a tendency to form representations of a motif—representations that can vary a great deal in detail without losing their basic pattern."

Common archetypes include:
- The Hero: The part that faces challenges and grows through adversity
- The Shadow: The rejected and hidden aspects of self
- The Anima/Animus: The contrasexual aspects of the psyche
- The Wise Old Man/Woman: The inner wisdom and guidance
- The Trickster: The disruptor who brings change through chaos
- The Mother: The nurturing, life-giving force
- The Father: The protective, ordering principle

When we recognize these patterns in our lives, we gain perspective. We see that our struggles are not just personal but part of the human journey. This recognition brings both humility and empowerment.`,
        activities: [
          {
            id: 'archetype-identification',
            title: 'Personal Archetype Identification',
            type: 'reflection',
            description: 'Which archetypes are most active in your life right now? How do they manifest in your behavior and choices?',
            completed: false,
          },
        ],
      },
      {
        id: 'shadow-archetypes',
        title: 'Shadow Archetypes',
        content: `While archetypes can manifest in both light and shadow forms, certain archetypal patterns specifically represent shadow aspects—the parts of ourselves we've rejected or denied.

Understanding these shadow archetypes helps us recognize when we're operating from wounded or unconscious patterns. Each shadow archetype also contains the seed of its own transformation.

**The Tyrant**: Emerges when we feel powerless and compensate through domination and control. Fears vulnerability and being dominated. When integrated, becomes healthy leadership and assertiveness.

**The Victim**: Manifests when we feel helpless and believe external forces control our destiny. Fears taking responsibility and personal power. When integrated, becomes empathy and the ability to ask for help.

**The Martyr**: Sacrifices self for others to gain recognition or avoid own needs. Fears being selfish and not being needed. When integrated, becomes genuine service and balanced self-care.

**The Saboteur**: Undermines our success and happiness from beliefs of unworthiness. Fears success, happiness, and being seen. When integrated, becomes healthy caution and self-protection.

**The Judge**: Constantly criticizes self and others, creating separation and shame. Fears being judged and imperfection. When integrated, becomes discernment and wisdom.

**The Rebel**: Rejects authority and convention, sometimes destructively. Fears conformity and loss of identity. When integrated, becomes authenticity and healthy independence.

The key to working with shadow archetypes is recognition without identification. We can acknowledge when these patterns are active without believing they define us. Through awareness and integration, we transform their energy from destructive to constructive.`,
        activities: [
          {
            id: 'shadow-archetype-exploration',
            title: 'Shadow Archetype Deep Dive',
            type: 'journal',
            description: 'Choose one shadow archetype that resonates with you. Write about how it shows up in your life and what its integrated potential might look like.',
            completed: false,
          },
        ],
      },
    ],
  },
];