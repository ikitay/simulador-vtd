#!/usr/bin/env node
// Descarga la mediana REM de inflación esperada a 12 meses (BCRA, idVariable 29)
// y la escribe en data/rem.json. Solo reescribe el archivo si el valor cambió,
// para que fecha_actualizacion refleje cuándo se publicó un dato nuevo (el REM
// se actualiza una vez por mes) y no cada corrida del cron.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ID_VARIABLE = 29;
const API_URL = `https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/${ID_VARIABLE}`;
const OUT_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data', 'rem.json');

async function obtenerUltimoValor() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`La API de BCRA respondió ${res.status}`);
  }
  const data = await res.json();
  const serie = data.results?.[0]?.detalle;
  if (!Array.isArray(serie) || serie.length === 0) {
    throw new Error('Respuesta inesperada de la API: no hay results[0].detalle');
  }
  return serie[0]; // viene ordenado por fecha descendente
}

async function leerActual() {
  try {
    return JSON.parse(await readFile(OUT_PATH, 'utf-8'));
  } catch {
    return null;
  }
}

async function main() {
  const ultimo = await obtenerUltimoValor();
  const actual = await leerActual();

  if (actual && actual.valor === ultimo.valor && actual.fecha === ultimo.fecha) {
    console.log('Sin cambios en el dato REM (valor y fecha iguales). No se reescribe el archivo.');
    return;
  }

  const nuevo = {
    valor: ultimo.valor,
    fecha: ultimo.fecha,
    fecha_actualizacion: new Date().toISOString(),
  };

  await writeFile(OUT_PATH, JSON.stringify(nuevo, null, 2) + '\n', 'utf-8');
  console.log('data/rem.json actualizado:', nuevo);
}

main().catch((err) => {
  console.error('Error actualizando rem.json:', err);
  process.exitCode = 1;
});
