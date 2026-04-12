import DeepInit from "./src/deepInit"
import SelfImproving from "./src/selfImproving"
import Plan from "./src/plan"
import PlanAtomic from "./src/plan-atomic"
import PlanSocratic from "./src/plan-socratic"
import PlanClarify from "./src/plan-clarify"
import ApplySkill from "./src/apply-skill"

export const SynapseCommand = {
    "deep-init": DeepInit,
    "self-improving": SelfImproving,
    "plan": Plan,
    "plan-atomic": PlanAtomic,
    "plan-socratic": PlanSocratic,
    "plan-clarify": PlanClarify,
    "apply-skill": ApplySkill,
}