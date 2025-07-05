import { motion } from 'motion/react';
import { cn } from '../utils/cn';

import { HiMinusSm, HiCheck } from 'react-icons/hi';

type CheckboxProps = {
    id?: string;
    checked: boolean;
    isIndeterminate?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox(props: CheckboxProps) {
    const IconComponent = props.isIndeterminate ? HiMinusSm : props.checked ? HiCheck : null;

    return (
        <div
            className={cn(
                'relative flex size-[1.125rem] items-center justify-center rounded-sm border border-gray-600',
                {
                    'bg-gray-900': props.checked || props.isIndeterminate,
                },
            )}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: props.isIndeterminate || props.checked ? 1 : 0 }}
                className="pointer-events-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            >
                {IconComponent && <IconComponent className="text-white" />}
            </motion.div>

            <input
                id={props.id}
                type="checkbox"
                checked={props.checked}
                onChange={props.onChange}
                readOnly={!props.onChange}
                className="h-full w-full cursor-pointer appearance-none rounded-sm border-none bg-none outline-none"
            />
        </div>
    );
}
