export const QuestList = ({ skills, quests }) => {
    const canDoQuests = [];
    const cantDoQuests = [];

    const playerSkills = Object.entries(skills).reduce((acc, [skill, details]) => {
        acc[skill.toLowerCase()] = details.level;
        return acc;
    }, {});

    quests.forEach((quest) => {
        const canDoQuest = quest["required-skills"].every((skillRequirement) => {
            const [levelString, ...skillNameParts] = skillRequirement.split(" ");
            const requiredLevel = parseInt(levelString.replace("Level", "").trim(), 10);
            const skillName = skillNameParts.join(" ").toLowerCase();

            return playerSkills[skillName] >= requiredLevel;
        });

        if (canDoQuest) {
            canDoQuests.push(quest);
        } else {
            cantDoQuests.push(quest);
        }
    });

    return (
        <div>
            <h1>Quests you can do:</h1>
            {canDoQuests.map(quest => <div key={quest.id}>{quest.title}</div>)}

            <h1>Quests you can't do:</h1>
            {cantDoQuests.map(quest => <div key={quest.id}>{quest.title}</div>)}
        </div>
    )
}