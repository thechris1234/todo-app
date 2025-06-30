import type { TaskType } from '../types/task-type';

export const demoTasks: TaskType[] = [
    {
        id: 1,
        title: 'Bug javítás',
        desc: 'Sürgős hiba kijavítása a fizetési modulban',
        status: 'inProgress',
        priority: 'high',
        dueDate: Date.now() - 2 * 86400000, // 2 nappal ezelőtt (lejárt)
    },
    {
        id: 2,
        title: 'Kód refaktorálás',
        desc: 'Backend struktúra újraszervezése',
        status: 'new',
        priority: 'normal',
        dueDate: new Date().setHours(23, 59, 59, 999), // ma éjfél előtt (ma esedékes)
    },
    {
        id: 3,
        title: 'Design mockupok jóváhagyása',
        status: 'done',
        priority: 'low',
        dueDate: Date.now() - 86400000, // tegnap (lejárt)
    },
    {
        id: 4,
        title: 'Sprint tervezés',
        desc: 'Következő heti feladatok tervezése',
        status: 'new',
        priority: 'normal',
        dueDate: Date.now(), // pontosan most (ma esedékes)
    },
    {
        id: 5,
        title: 'Ügyfél visszajelzés feldolgozása',
        desc: 'Kapott javaslatok kiértékelése',
        status: 'inProgress',
        priority: 'important',
        dueDate: Date.now() + 86400000, // holnap
    },
    {
        id: 6,
        title: 'Automata tesztek írása',
        desc: 'Hiányzó unit tesztek pótlása',
        status: 'blocked',
        priority: 'high',
        dueDate: Date.now() + 3 * 86400000, // 3 nap múlva
    },
    {
        id: 7,
        title: 'Retrospektív meeting',
        status: 'overdue',
        priority: 'low',
        dueDate: new Date('2025-06-15').getTime(), // konkrét múltbéli dátum (lejárt)
    },
];
