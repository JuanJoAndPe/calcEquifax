document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
  
    calcularBtn.addEventListener('click', async () => {
      const cedula = document.getElementById('cedulaDeudor').value.trim();
  
      if (!validarCedula(cedula)) {
        alert('Por favor ingresa una cédula válida de 10 dígitos');
        return;
      }
  
      try {
        mostrarLoader(true);
  
        const response = await fetch('https://tu-backend-en-render.com/api/consulta-cedula', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cedula })
        });
  
        const data = await response.json();
        mostrarLoader(false);
  
        if (data.error) {
          alert('Error al consultar Equifax: ' + data.error);
          return;
        }
  
        console.log('Datos Equifax:', data);
        mostrarResultados(data);
  
      } catch (error) {
        mostrarLoader(false);
        console.error('Error al consultar el backend:', error);
        alert('Error inesperado al consultar el backend');
      }
    });
  });
  
  /**
   * Validación básica de cédula ecuatoriana
   */
  function validarCedula(cedula) {
    return /^\d{10}$/.test(cedula);
  }
  
  /**
   * Muestra resultados formateados
   */
  function mostrarResultados(data) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `
      <h3>Resultado de la Consulta</h3>
      <pre style="white-space: pre-wrap; background-color: #f3f3f3; padding: 10px; border-radius: 5px;">
  ${JSON.stringify(data, null, 2)}
      </pre>
    `;
  }
  
  /**
   * Muestra u oculta el loader
   */
  function mostrarLoader(mostrar) {
    const loader = document.querySelector('.loader');
    loader.style.display = mostrar ? 'block' : 'none';
  }
  