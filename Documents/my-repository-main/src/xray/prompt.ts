export type SubjectNature = 'biological' | 'mechanical' | 'hybrid' | 'abstract' | string;

export const XRAY_PROMPT = `XRAY RADIOGRAPHIC TRANSFORMATION

Convert the attached image into a cinematic medical X-ray radiograph.

SUBJECT ANALYSIS — before rendering, identify the subject nature:
- Biological (human, animal, creature): render coherent skeletal and tissue structures
- Mechanical or electronic: render internal frameworks, joints, circuits, density variations
- Hybrid: blend biological and mechanical systems logically
- Abstract or stylized entity: interpret internal density consistent with visual design language

STRUCTURAL RULES:
Preserve exact external silhouette, proportions and morphology.
Render internal structure consistent only with the subject's visible nature.
Do not humanize non-human subjects.
Do not add biological anatomy to mechanical forms.
Hair, fur, or filaments: render as faint low-density radiographic traces, semi-translucent,
maintaining original volume and silhouette. Never disappear, never become bone.

VISUAL STYLE:
Medical X-ray aesthetic. Blue-white monochrome only.
High contrast. Strong luminance along structural edges.
Soft internal attenuation gradients. Light soft-tissue opacity where appropriate.
Density-based rendering: denser structures appear brighter.

BACKGROUND:
Pure black (#000000). No gradients. No vignette.
Ultra-faint technical gridlines, barely perceptible, never distracting.
No borders, frames, rulers, overlays, labels, or UI elements.
Subject isolated in a controlled medical imaging void.

TECHNICAL SIMULATION:
Subtle analog noise texture. Minimal digital artifact speckling.
Backlit medical lightbox diffusion. Cinematic macro quality.
1:1 aspect ratio. Subject centered. No artistic variation.`;

export const XRAY_CORE_PROMPT = XRAY_PROMPT;
export const XRAY_CORE_ENGINE_PROMPT = XRAY_PROMPT;

export function buildXrayPrompt(
  _subjectNature: SubjectNature,
  _sourceHint?: string,
  _confidence: 'low' | 'medium' | 'high' = 'low',
): string {
  return XRAY_PROMPT.trim();
}
