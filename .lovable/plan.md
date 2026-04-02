

## Plano: Remover datas específicas e rebalancear foco para adultos

### Problema
1. **Datas "Spring 2024 – Spring 2025"**: Erika não gosta. Precisam ser substituídas por linguagem baseada em experiência.
2. **Foco em adultos**: O programa atende ambos, mas adultos devem ter mais destaque. K-12 pode ser mencionado como contexto de aplicação, não como público exclusivo.

### Arquivos impactados e mudanças

**1. `src/components/sections/InstitutionalProofStrip.tsx`**
- `"Longitudinal feedback collected Spring 2024 – Spring 2025"` → `"Longitudinal feedback collected across multiple cohorts"`
- `"Focused on K–12 multilingual literacy instruction"` → `"Focused on multilingual literacy instruction for educators"`

**2. `src/components/v2/V2SocialProofStrip.tsx`**
- Fallback `"Feedback Collected Spring 2024 – Spring 2025"` → `"Feedback Collected Across Multiple Cohorts"`
- Fallback `"Focused on K–12 multilingual literacy instruction"` → `"Focused on multilingual literacy instruction for educators"`

**3. `src/components/v2/V2HeroSection.tsx`**
- Fallback `"Feedback collected across multiple cohorts, Spring 2024 – Spring 2025 →"` → `"Feedback collected across multiple educator cohorts →"`
- Fallback `"FOR K-12 EDUCATORS WHOSE STUDENTS..."` → `"FOR EDUCATORS WHOSE STUDENTS ARE DROWNING IN BUSYWORK"`
- Fallback subheadline: remover "K-12", manter "educators working with multilingual and language-diverse students"

**4. `src/components/sections/HeroSection.tsx`**
- `"For K–12 educators working with multilingual learners"` → `"For educators working with multilingual learners"`

**5. `src/components/sections/InstitutionalEvidenceSection.tsx`**
- Remover `"Spring 2024 through Spring 2025"` → `"multiple semesters"`
- Rodapé: `"Collected from four semesters..."` → `"Collected across multiple semesters of professional development feedback."`

**6. `src/pages/Speaking.tsx`**
- Remover stat `"4" / "Semesters of Documented PD"` com a descrição Spring 2024–2025. Substituir por `"Multiple" / "Cohorts Trained"` com descrição genérica.
- `"K-12 Educators & Curriculum Leaders"` → `"Educators & Curriculum Leaders"`
- Manter "K–12" stat card mas mudar label para `"Multilingual Literacy Focus"` sem menção K-12

**7. `src/components/v2/V2FaqSection.tsx`**
- Fallback FAQ 2: remover `"(Spring 2024 – Spring 2025)"` → `"across multiple cohorts"`

**8. `src/components/sections/ProblemSection.tsx`**
- `"For K–12 educators"` → `"For educators"`

**9. `src/components/sections/AuthorSection.tsx`**
- `"Professional development facilitator for K–12 districts"` → `"Professional development facilitator for school districts and adult learning programs"`

**10. `src/components/v2/V2AboutSection.tsx`**
- Fallback: `"across K–12 districts"` → `"across school districts and adult learning programs"`

### Resumo
- ~10 arquivos com edições cirúrgicas de texto
- Nenhuma mudança de layout ou estrutura
- Todas as datas específicas removidas, substituídas por linguagem de experiência
- K-12 deixa de ser o protagonista; "educators" passa a ser o termo principal, com K-12 aparecendo apenas como contexto secundário quando necessário

