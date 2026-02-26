import React from 'react';

interface RubricCriterion {
    objective: string;
    DA: string; // Destacado
    AA: string; // Alcanzado
    PA: string; // Proceso
    NA: string; // No Alcanzado
}

interface RubricProps {
    data: {
        title: string;
        criteria: RubricCriterion[];
    };
}

const LEVEL_COLORS = {
    DA: 'rgba(245, 158, 11, 0.2)', // Amber/Gold background
    AA: 'rgba(59, 130, 246, 0.2)',  // Blue background
    PA: 'rgba(249, 115, 22, 0.2)',  // Orange background
    NA: 'rgba(239, 68, 68, 0.2)',   // Red background
};

const BORDER_COLORS = {
    DA: '#f59e0b',
    AA: '#3b82f6',
    PA: '#f97316',
    NA: '#ef4444',
};

const TEXT_COLORS = {
    DA: '#fbbf24',
    AA: '#60a5fa',
    PA: '#fb923c',
    NA: '#f87171',
};

export default function RubricaEvaluacion({ data }: RubricProps) {
    return (
        <div className="my-8 overflow-hidden rounded-xl border border-white/10 bg-[#120f0d] shadow-2xl">
            <div className="bg-white/5 p-4 border-b border-white/10">
                <h3 className="text-xl font-bold text-white m-0">{data.title}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-white/5">
                            <th className="p-4 text-left font-semibold text-white border-b border-white/10 w-1/4">Criterio / Objetivo</th>
                            <th className="p-4 text-center font-semibold text-white border-b border-white/10">DA (Destacado)</th>
                            <th className="p-4 text-center font-semibold text-white border-b border-white/10">AA (Alcanzado)</th>
                            <th className="p-4 text-center font-semibold text-white border-b border-white/10">PA (Proceso)</th>
                            <th className="p-4 text-center font-semibold text-white border-b border-white/10">NA (No Alcanzado)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.criteria.map((item, index) => (
                            <tr key={index} className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                <td className="p-4 font-medium text-gray-300 bg-white/2">{item.objective}</td>

                                {['DA', 'AA', 'PA', 'NA'].map((lvl) => (
                                    <td key={lvl} className="p-4">
                                        <div
                                            className="h-full min-h-[80px] p-3 rounded-lg border flex items-center justify-center text-center leading-relaxed"
                                            style={{
                                                backgroundColor: LEVEL_COLORS[lvl as keyof typeof LEVEL_COLORS],
                                                borderColor: BORDER_COLORS[lvl as keyof typeof BORDER_COLORS] + '44',
                                                color: TEXT_COLORS[lvl as keyof typeof TEXT_COLORS]
                                            }}
                                        >
                                            {item[lvl as keyof RubricCriterion]}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
