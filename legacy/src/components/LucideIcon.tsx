import React from 'react';
import * as LucideIcons from 'lucide-react';

interface LucideIconProps {
    name: keyof typeof LucideIcons;
    size?: number | string;
    color?: string;
    className?: string;
}

const LucideIcon: React.FC<LucideIconProps> = ({
    name,
    size = 24,
    color = 'currentColor',
    className = ''
}) => {
    const IconComponent = LucideIcons[name] as React.ElementType;

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in lucide-react`);
        return null;
    }

    return (
        <span className={`inline-flex items-center justify-center ${className}`} style={{ verticalAlign: 'middle' }}>
            <IconComponent size={size} color={color} />
        </span>
    );
};

export default LucideIcon;
