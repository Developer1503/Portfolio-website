import { useNavigate } from "react-router-dom";

const MyWork = () => {
    const navigate = useNavigate();

    const projects = [
        {
            title: "PDF Research Assistant",
            description: "AI-powered PDF analysis tool using CrewAI. Upload PDFs, ask questions, and get intelligent insights with advanced document understanding.",
            url: "https://pdf-crewai-assistant.streamlit.app/",
            gradient: "from-blue-500 via-indigo-500 to-purple-600",
            icon: "📄",
            tags: ["CrewAI", "PDF Analysis", "AI Research"],
        },
        {
            title: "AI Feedback System",
            description: "Two-dashboard system for collecting and analyzing user feedback with AI-powered insights. Features user and admin dashboards with real-time analytics.",
            url: "https://two-dashboard-ai-feedback-system.streamlit.app/",
            gradient: "from-purple-500 via-pink-500 to-rose-600",
            icon: "💬",
            tags: ["Feedback", "Analytics", "Dual Dashboard"],
        },
    ];

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-auto">
            {/* Background gradient overlay */}
            <div className="fixed inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 pointer-events-none"></div>

            {/* Animated background particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 md:py-20">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                    <svg
                        className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    <span className="font-medium">Back to Home</span>
                </button>

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        My Projects
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Explore my AI-powered applications built with cutting-edge technologies
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20"
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>

                            <div className="relative z-10 space-y-6">
                                {/* Icon */}
                                <div className="text-6xl mb-4">{project.icon}</div>

                                {/* Title */}
                                <h2 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                                    {project.title}
                                </h2>

                                {/* Description */}
                                <p className="text-gray-400 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-3 py-1 bg-gray-800/60 border border-gray-700 rounded-full text-xs font-medium text-gray-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="flex items-center gap-2 text-indigo-400 font-semibold group-hover:gap-4 transition-all duration-300">
                                    <span>Launch App</span>
                                    <svg
                                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Footer note */}
                <div className="text-center mt-16 text-gray-500 text-sm">
                    <p>Click on any project card to launch the application in a new tab</p>
                </div>
            </div>
        </div>
    );
};

export default MyWork;
