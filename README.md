# Simulador de Valor Tiempo del Dinero

Herramienta educativa interactiva para la enseñanza de finanzas / economía a nivel universitario básico. Permite explorar de forma práctica los conceptos centrales del valor tiempo del dinero.

**[Ver demo en vivo](https://TU-USUARIO.github.io/TU-REPO/)** ← reemplazar por tu usuario y el nombre del repo una vez publicado en GitHub Pages

![Demo del simulador](demo.gif)
<!--
  Para grabar el GIF (ScreenToGif, Kap, LICEcap, o el grabador de pantalla del SO):
  1. Abrir el sitio ya desplegado (no localhost, para que el link del README funcione igual si alguien lo clona).
  2. Grabar una recorrida corta (15-20 seg) que muestre: cambiar de pestaña, cargar un ejemplo,
     mover el slider de períodos/cuotas viendo el gráfico actualizarse en tiempo real, y pasar
     el cursor sobre un tooltip (ⓘ).
  3. Exportar como demo.gif (ancho recomendado ~800px para que no pese demasiado) y colocarlo
     en la raíz del repo, junto a este README.
-->

## Guía de uso para estudiantes

En `docs/guia-simulador-vtd.docx` hay una guía de lectura (sin ejercicios) pensada para compartir en el campus virtual junto con el link a la herramienta. Explica el concepto de valor tiempo del dinero y recorre cada pestaña del simulador, sus fórmulas y errores frecuentes a evitar.

## Contenido

La herramienta está organizada en 4 pestañas:

1. **Capital único** — Valor futuro (VF) y valor presente (VP) de un capital, comparando interés simple vs compuesto. Incluye gráfico comparativo y explicación conceptual.
2. **Anualidades** — VF y VP de una serie de cuotas periódicas iguales.
3. **Tasas** — Conversión de tasa nominal anual (TNA) a tasa efectiva anual (TEA) y mensual (TEM), con gráfico de sensibilidad según la frecuencia de capitalización.
4. **Amortización de préstamos** — Sistemas francés (cuota fija), alemán (amortización fija) y americano (interés periódico + capital al final), con tabla de cuotas y gráfico de composición interés/amortización.

Cada pestaña incluye:
- Tooltips (ⓘ) con explicaciones conceptuales de cada variable
- Ejemplos precargados de casos típicos (plazo fijo, préstamo hipotecario, etc.)
- Botón de reseteo a valores por defecto
- Advertencias cuando la tasa y el período ingresados podrían no ser conceptualmente coherentes
- Desglose paso a paso de la fórmula aplicada
- Gráfico interactivo que se actualiza en tiempo real

## Uso

Es un único archivo HTML autocontenido (`index.html`), sin backend ni dependencias de instalación. La única dependencia externa es [Chart.js](https://www.chartjs.org/), cargada desde CDN.

### Ver localmente

Abrir `index.html` directamente en el navegador, o servirlo con cualquier servidor estático:

```bash
python3 -m http.server 8000
```

y visitar `http://localhost:8000`.

### Desplegar en GitHub Pages

1. Subir este repositorio a GitHub, con `index.html` en la raíz (como está en esta carpeta)
2. En el repo: **Settings** → **Pages**
3. En "Source", elegir **Deploy from a branch**
4. Branch: `main`, carpeta: **/ (root)** → **Save**
5. GitHub genera la URL en un par de minutos, con el formato `https://<usuario>.github.io/<repo>/`

No hace falta ningún archivo de configuración adicional para Pages.

## Personalización

Los valores por defecto de cada pestaña (montos, tasas, plazos) y los ejemplos precargados están definidos directamente en el `<script>` al final de `index.html`, en las funciones `cargarEjemplo*()` y `reset*()`. Se pueden editar sin tocar el resto del código.

## Formato numérico

Los montos se muestran en formato de pesos argentinos (`$1.234,56`, punto de miles y coma decimal) usando `Intl` (`es-AR`).

## Licencia

De uso libre para fines educativos. Se puede adaptar y redistribuir citando la fuente.
