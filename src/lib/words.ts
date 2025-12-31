export const SPANISH_WORDS = [
  // Animals (Animales)
  "Perro",
  "Gato",
  "Elefante",
  "León",
  "Tigre",
  "Conejo",
  "Pájaro",
  "Pez",
  "Caballo",
  "Vaca",
  
  // Objects (Objetos)
  "Mesa",
  "Silla",
  "Teléfono",
  "Libro",
  "Reloj",
  "Lápiz",
  "Puerta",
  "Ventana",
  "Cama",
  "Espejo",
  
  // Food (Comida)
  "Pizza",
  "Manzana",
  "Helado",
  "Café",
  "Pan",
  "Queso",
  "Chocolate",
  "Agua",
  "Naranja",
  "Pasta",
  
  // Places (Lugares)
  "Playa",
  "Montaña",
  "Hospital",
  "Escuela",
  "Parque",
  "Cine",
  "Museo",
  "Restaurante",
  "Casa",
  "Jardín",
  
  // Professions (Profesiones)
    "Doctor",
    "Ingeniero",
    "Profesor",
    "Artista",
    "Músico",
    "Cocinero",
    "Abogado",
    "Obstetra",
    "Programador",
    "Diseñador",
    "Psicólogo",

    // Argentinian Spanish specific words
    "Bondi",
    "Pibe",
    "Quilombo",
    "Birra",
    "Moria Casan",
    "Miranda",
    "Chano"

] as const;

export function getRandomWord(): string {
  const randomIndex = Math.floor(Math.random() * SPANISH_WORDS.length);
  return SPANISH_WORDS[randomIndex];
}
