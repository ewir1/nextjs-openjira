interface SeedEntry {
    description: string;
    status: string;
    createAt: number;
}

interface SeedData {
    entries: SeedEntry[]
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui et quod adipisci! Veniam, at ipsam culpa mollitia esse pariatur. Non.',
            status: 'pending',
            createAt: Date.now(),
        },
        {
            description: 'En Progreso: Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis nisi consectetur excepturi reiciendis dolorum perferendis ipsum. Animi, fugiat voluptatibus? Aspernatur!',
            status: 'in-progress',
            createAt: Date.now() - 1000000,
        },
        {
            description: 'Terminadas: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi voluptate iusto laboriosam totam ex quidem dolorum, molestias deserunt porro voluptatem.',
            status: 'finished',
            createAt: Date.now() - 100000,
        }
    ]
}