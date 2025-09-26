export type Plan = 'basico' | 'intermedio' | 'full';
export type Input = { edad: number; comuna: string; plan: Plan };

const BASE = { basico: 11990, intermedio: 18990, full: 25990 };

export function cotizar(input: Input) {
  let factor = 1;
  if (input.edad < 25) factor += 0.12;
  if (input.edad > 60) factor += 0.18;
  if (['Las Condes','Vitacura','Lo Barnechea'].includes(input.comuna)) factor += 0.07;

  const precio = Math.round(BASE[input.plan] * factor);
  return [
    { id:'a1', aseguradora:'Segurísima', precio, descripcion:'Cobertura esencial + asistencia 24/7' },
    { id:'a2', aseguradora:'ProtecPlus', precio: Math.round(precio*1.06), descripcion:'Incluye deducible reducido y robo' },
    { id:'a3', aseguradora:'MaxCare', precio: Math.round(precio*0.97), descripcion:'Plan promo (stock limitado)' },
  ];
}