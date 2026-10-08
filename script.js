document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('speciesAreaChart').getContext('2d');
  const zSlider = document.getElementById('zSlider');
  const cSlider = document.getElementById('cSlider');
  const zVal = document.getElementById('zVal');
  const cVal = document.getElementById('cVal');

  // Alan (A) değerleri: 1'den 1000 km²'ye kadar örneklem
  const areaValues = [];
  for (let a = 1; a <= 1000; a += 20) {
    areaValues.push(a);
  }

  // S = c * A^z hesaplama fonksiyonu
  function calculateData(c, z) {
    return areaValues.map(A => Math.round(c * Math.pow(A, z) * 100) / 100);
  }

  // Grafik ilk kurulumu
  let speciesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: areaValues,
      datasets: [{
        label: 'Tür Sayısı (S)',
        data: calculateData(parseFloat(cSlider.value), parseFloat(zSlider.value)),
        borderColor: '#58a6ff',
        backgroundColor: 'rgba(88, 166, 255, 0.1)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#c9d1d9',
            font: { family: 'Inter' }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return ` Alan: ${context.label} km² | Tür (S): ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Ada Alanı (A - km²)',
            color: '#8b949e',
            font: { family: 'Inter', weight: 'bold' }
          },
          ticks: { color: '#8b949e' },
          grid: { color: '#30363d' }
        },
        y: {
          title: {
            display: true,
            text: 'Tahmini Tür Sayısı (S)',
            color: '#8b949e',
            font: { family: 'Inter', weight: 'bold' }
          },
          ticks: { color: '#8b949e' },
          grid: { color: '#30363d' }
        }
      }
    }
  });

  // Slider güncellendikçe grafiği anlık yeniden çiz
  function updateChart() {
    const c = parseFloat(cSlider.value);
    const z = parseFloat(zSlider.value);
    
    zVal.textContent = z.toFixed(2);
    cVal.textContent = c.toFixed(1);

    speciesChart.data.datasets[0].data = calculateData(c, z);
    speciesChart.update('none'); // Yumuşak, hızlı güncelleme
  }

  zSlider.addEventListener('input', updateChart);
  cSlider.addEventListener('input', updateChart);
});
