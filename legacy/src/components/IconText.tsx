import React from 'react';
import LucideIcon from './LucideIcon';

interface IconTextProps {
    icon: string;
    text: string;
    iconSize?: number;
    iconColor?: string;
    className?: string;
    iconClassName?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
}

/**
 * A component to display an icon next to text with proper alignment.
 */
export default function IconText({
    icon,
    text,
    iconSize = 20,
    iconColor = 'currentColor',
    className = '',
    iconClassName = '',
    as: Component = 'span'
}: IconTextProps) {
    return (
        <Component className={`inline-flex items-center gap-3 align-middle ${className}`}>
            <LucideIcon
                name={icon as any}
                size={iconSize}
                color={iconColor}
                className={`flex-shrink-0 ${iconClassName}`}
            />
            <span className="font-medium">{text}</span>
        </Component>
    );
}
