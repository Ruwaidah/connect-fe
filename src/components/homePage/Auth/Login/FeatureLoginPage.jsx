const Feature = ({ title, desc, icon }) => {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur mb-4">
            <div className="flex items-center gap-3">
                <div className="h-6 w-6 flex items-center justify-center text-blue-200">
                    {icon}
                </div>
                <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-xs text-white/60 mt-1">{desc}</p>
                </div>
            </div>
        </div>
    );
}

export default Feature