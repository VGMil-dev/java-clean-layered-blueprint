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

export default function RubricaEvaluacion({ data }: RubricProps) {
    return (
        <div className="my-10 overflow-hidden rounded-2xl border border-[var(--sl-color-gray-5)] bg-[var(--sl-color-bg)]">
            <div className="bg-[var(--sl-color-gray-6)]/50 px-6 py-4 border-b border-[var(--sl-color-gray-5)]">
                <h3 className="text-lg font-black text-[var(--sl-color-white)] m-0 uppercase tracking-wider">{data.title}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[var(--sl-color-gray-6)]/30 text-[10px] uppercase font-black tracking-widest text-[var(--sl-color-gray-3)]">
                            <th className="p-5 text-left border-b border-[var(--sl-color-gray-5)] w-1/4">Criterio</th>
                            <th className="p-5 text-center border-b border-[var(--sl-color-gray-5)] text-[var(--sl-color-accent)]">DA</th>
                            <th className="p-5 text-center border-b border-[var(--sl-color-gray-5)]">AA</th>
                            <th className="p-5 text-center border-b border-[var(--sl-color-gray-5)]">PA</th>
                            <th className="p-5 text-center border-b border-[var(--sl-color-gray-5)]">NA</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--sl-color-gray-5)] text-sm">
                        {data.criteria.map((item, index) => (
                            <tr key={index} className="group hover:bg-[var(--sl-color-accent)]/[0.02] transition-colors">
                                <td className="p-5 font-bold text-[var(--sl-color-white)] bg-[var(--sl-color-gray-6)]/20 align-top">
                                    {item.objective}
                                </td>
                                {(['DA', 'AA', 'PA', 'NA'] as const).map((lvl) => (
                                    <td key={lvl} className="p-5 align-top">
                                        <div className={`
                                            text-xs leading-relaxed transition-all duration-300
                                            ${lvl === 'DA' ? 'text-[var(--sl-color-accent)] font-medium' : 'text-[var(--sl-color-gray-3)] group-hover:text-[var(--sl-color-gray-2)]'}
                                        `}>
                                            {item[lvl]}
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
