const dateAfterDays = (days) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + days);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
};

export const startingPolls = [
    {
        id: "tree-planting",
        question: "Where should the new shade trees go first?",
        topic: "Public spaces",
        closeDate: dateAfterDays(8),
        selectedVote: "",
        options: [
            { label: "Cedar Avenue", votes: 24 },
            { label: "The school walk", votes: 17 },
            { label: "Maple Square", votes: 11 },
        ],
    },
    {
        id: "market-hours",
        question: "What would make the Saturday market more useful?",
        topic: "Community events",
        closeDate: dateAfterDays(11),
        selectedVote: "",
        options: [
            { label: "More local produce", votes: 20 },
            { label: "Earlier opening time", votes: 15 },
            { label: "Kids activity table", votes: 9 },
        ],
    },
    {
        id: "evening-bus",
        question: "Which evening bus needs a later final run?",
        topic: "Local services",
        closeDate: dateAfterDays(14),
        selectedVote: "",
        options: [
            { label: "Route 4", votes: 12 },
            { label: "Route 7", votes: 19 },
            { label: "Route 12", votes: 8 },
        ],
    },
    {
        id: "garden-opening",
        question: "Which weekend worked best for the garden opening?",
        topic: "Neighborhood",
        closeDate: dateAfterDays(-5),
        selectedVote: "",
        options: [
            { label: "September 26", votes: 31 },
            { label: "October 3", votes: 27 },
        ],
    },
];

export const getPollResponseCount = (polls) =>
    polls.reduce(
        (pollTotal, poll) =>
            pollTotal +
            poll.options.reduce(
                (optionTotal, option) => optionTotal + option.votes,
                0,
            ),
        0,
    );

export const isPollClosed = (poll) =>
    new Date(poll.closeDate + "T23:59:59").getTime() < Date.now();
