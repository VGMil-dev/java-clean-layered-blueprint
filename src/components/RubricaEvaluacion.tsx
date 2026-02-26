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
    DA: '#b45309', // Darker Amber
    AA: '#1d4ed8', // Darker Blue
    PA: '#c2410c', // Darker Orange
    NA: '#b91c1c', // Darker Red
};


export default function RubricaEvaluacion({ data }: RubricProps) {
    return (
        <div className="my-8 overflow-hidden rounded-xl border border-[var(--swing-card-border)] bg-[var(--sl-color-bg)] shadow-2xl">
            <div className="bg-[var(--sl-color-gray-6)] p-4 border-b border-[var(--swing-card-border)]">
                <h3 className="text-xl font-bold text-[var(--sl-color-gray-1)] m-0">{data.title}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-[var(--sl-color-gray-6)]">
                            <th className="p-4 text-left font-semibold text-[var(--sl-color-gray-1)] border-b border-[var(--swing-card-border)] w-1/4">Criterio / Objetivo</th>
                            <th className="p-4 text-center font-semibold text-[var(--sl-color-gray-1)] border-b border-[var(--swing-card-border)]">DA (Destacado)</th>
                            <th className="p-4 text-center font-semibold text-[var(--sl-color-gray-1)] border-b border-[var(--swing-card-border)]">AA (Alcanzado)</th>
                            <th className="p-4 text-center font-semibold text-[var(--sl-color-gray-1)] border-b border-[var(--swing-card-border)]">PA (Proceso)</th>
                            <th className="p-4 text-center font-semibold text-[var(--sl-color-gray-1)] border-b border-[var(--swing-card-border)]">NA (No Alcanzado)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.criteria.map((item, index) => (
                            <tr key={index} className="hover:bg-[var(--sl-color-gray-6)] transition-colors border-b border-[var(--swing-card-border)] last:border-0">
                                <td className="p-4 font-medium text-[var(--sl-color-gray-2)] bg-[var(--swing-bg-white-low)]">{item.objective}</td>

                                {['DA', 'AA', 'PA', 'NA'].map((lvl) => (
                                    <td key={lvl} className="p-4">
                                        <div
                                            className="h-full min-h-[80px] p-3 rounded-lg border flex items-center justify-center text-center leading-relaxed font-medium"
                                            style={{
                                                backgroundColor: LEVEL_COLORS[lvl as keyof typeof LEVEL_COLORS],
                                                borderColor: BORDER_COLORS[lvl as keyof typeof BORDER_COLORS] + '66',
                                                color: TEXT_COLORS[lvl as keyof typeof TEXT_COLORS],
                                                filter: 'saturate(1.2) contrast(1.1)'
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
