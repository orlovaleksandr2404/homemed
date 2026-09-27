import type { Medication, Shelter } from '../types/medication';

export const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Хлоргексидин 0.05%',
    category: 'Антисептики',
    dosage: '100 мл',
    quantity: 2,
    unit: 'фл',
    expiryDate: '2027-01-15',
    storageConditions: 'Комнатная температура',
    donateToShelter: true,
  },
  {
    id: '2',
    name: 'Бинт марлевый стерильный',
    category: 'Перевязочные материалы',
    dosage: '7м х 14см',
    quantity: 6,
    unit: 'шт',
    expiryDate: '2028-06-01',
    storageConditions: 'Сухое место',
    donateToShelter: true,
  },
  {
    id: '3',
    name: 'Амоксиклав',
    category: 'Антибиотики',
    dosage: '500 мг + 125 мг',
    quantity: 1,
    unit: 'уп',
    expiryDate: '2026-10-10', // Скоро истекает
    storageConditions: 'Холодильник (2-8°C)',
    donateToShelter: false,
    notes: 'Осталось 6 таблеток',
  },
  {
    id: '4',
    name: 'Дротаверин (Но-шпа)',
    category: 'Спазмолитики',
    dosage: '40 мг',
    quantity: 1,
    unit: 'уп',
    expiryDate: '2024-02-01', // Просрочено
    storageConditions: 'Комнатная температура',
    donateToShelter: false,
  },
  {
    id: '5',
    name: 'Физраствор (Натрия хлорид)',
    category: 'Растворы',
    dosage: '200 мл',
    quantity: 3,
    unit: 'фл',
    expiryDate: '2026-12-20',
    storageConditions: 'Комнатная температура',
    donateToShelter: true,
  },
];

export const mockShelters: Shelter[] = [
  {
    id: 's1',
    name: 'Приют для животных',
    address: 'ул. Московская',
    phone: '+7 (911) 234-56-78',
    neededCategories: ['Антисептики', 'Перевязочные материалы', 'Растворы'],
  },
  {
    id: 's2',
    name: 'Центр реабилитации животных',
    address: 'ул. Аптечная',
    phone: '+7 (912) 345-67-89',
    neededCategories: ['Шприцы и расходники', 'Капли ушные/глазные', 'Антибиотики'],
  },
];
