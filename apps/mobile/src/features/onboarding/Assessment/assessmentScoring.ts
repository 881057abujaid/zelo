import type { AssessmentQuestion, SkillDomain } from "./assessmentQuestions";
import type { AssessmentResults, SkillScore } from "../onboarding.store";

export function calculateAssessmentResults(
    questions: AssessmentQuestion[],
    answers: Record<string, string>,
): AssessmentResults {
    let correctAnswers = 0;

    const skillScores: Partial<Record<SkillDomain, SkillScore>> = {};

    for (const question of questions) {
        const domain = question.skillDomain;

        if (!skillScores[domain]) {
            skillScores[domain] = {
                totalQuestions: 0,
                correctAnswers: 0,
                percentage: 0,
            };
        }

        const currentSkillScore = skillScores[domain]!;

        currentSkillScore.totalQuestions += 1;

        if (answers[question.id] === question.correctAnswer) {
            currentSkillScore.correctAnswers += 1;
            correctAnswers += 1;
        }
    }

    for (const skillScore of Object.values(skillScores)) {
        if (!skillScore) continue;

        skillScore.percentage = Math.round(
            (skillScore.correctAnswers / skillScore.totalQuestions) * 100,
        );
    }

    const totalQuestions = questions.length;

    const percentage =
        totalQuestions === 0
            ? 0
            : Math.round((correctAnswers / totalQuestions) * 100);

    return {
        totalQuestions,
        correctAnswers,
        percentage,
        skillScores,
    };
}