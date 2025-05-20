
import { Category} from '../lib/types';

export const allYears = Array.from({ length: 2025 - 1927 + 1 }, (_, i) => i + 1927);

export const allCategories: Category[] = [
    {
        category_id: 1,
        name: 'Best Picture',
        isActing: false,
        isSong: false
    },
    {
        category_id: 2,
        name: 'Best Director',
        isActing: false,
        isSong: false
    },
    {
        category_id: 3,
        name: 'Best Actor',
        isActing: true,
        isSong: false
    },
    {
        category_id: 4,
        name: 'Best Actress',
        isActing: true,
        isSong: false
    },

    {
        category_id: 5,
        name: 'Best Supporting Actor',
        isActing: true,
        isSong: false
    },
    {
        category_id: 6,
        name: 'Best Supporting Actress',
        isActing: true,
        isSong: false
    },
     {
        category_id: 7,
        name: 'Best Cinematography',
        isActing: false,
        isSong: false
    },
    {
        category_id: 8,
        name: 'Best Original Screenplay',
        isActing: false,
        isSong: true
    },
    {
        category_id: 9,
        name: 'Best Adapted Screenplay',
        isActing: false,
        isSong: false
    },
    {
        category_id: 10,
        name: 'Best Film Editing',
        isActing: false,
        isSong: false
    },
    {
        category_id: 11,
        name: 'Best Original Score',
        isActing: false,
        isSong: false
    },
    {
        category_id: 12,
        name: 'Best Original Song',
        isActing: false,
        isSong: false
    },
    {
        category_id: 13,
        name: 'Best Production Design',
        isActing: false,
        isSong: false
    },
    {
        category_id: 14,
        name: 'Best Costume Design',
        isActing: false,
        isSong: false
    },
    {
        category_id: 15,
        name: 'Best Sound',
        isActing: false,
        isSong: false
    },
    {
        category_id: 16,
        name: 'Best Makeup and Hairstyling',
        isActing: false,
        isSong: false
    },

    {
        category_id: 17,
        name: 'Best Visual Effects',
        isActing: false,
        isSong: false
    },
    {
        category_id: 18,
        name: 'Best Short Film',
        isActing: false,
        isSong: false
    },
]